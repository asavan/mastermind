"use strict"; // jshint ;_;

import {delay, assert} from "./helper.js";

function stub() {
}

let str = "";

function updateStr(inputArr, size) {
    str = "";
    for (let j = 0; j < size; j++) {
        str += inputArr[j].value;
    }
}

function validateVerdict(secret, verdict, lastGuess) {
    return true;
}

function handleInput(window, document, settings, callback) {

    const inputArr = document.getElementsByTagName("input");
    const logger = document.getElementsByClassName('log')[0];
    const size = settings.size;

    function log(message, el) {
        if (settings.logger) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
        } else {
            console.log(message);
        }
    }


    window.addEventListener("keyup", (e) => {
      const curIndex = parseInt(e.target.getAttribute("data-index")); //Get the index of the current input
      //If you click BackSpace to delete, delete all here
//      log(e.key, logger);
//      log(e.code, logger);
//      log(e.keyCode, logger);
      if (e.key == 'Enter') {
        if (str.length === size) {
            // clear
            callback(str);
        }

        return false;
      }
      if (e.key == 'Backspace') {
        let prev = curIndex - 1;
        if (curIndex === size - 1 && str[curIndex]) {
            prev = curIndex;
        }
        console.log(curIndex, prev, str[curIndex]);
        if(prev >= 0) {
          inputArr[prev].value = "";
          inputArr[prev].focus();
        } else {
          inputArr[0].focus();
        }
        updateStr(inputArr, size);
        return false;
      }
      //If the input is not a number
      if (!(e.key >= '1' && e.key <= '6' || e.keyCode == 229)) {
        inputArr[curIndex].value = "";
        return false;
      }

      const nextIndex = curIndex + 1;
      updateStr(inputArr, size);
      //When it is judged that there is not enough four-digit verification code
      if (curIndex < size - 1  && str.length < size) {
        for (let i = 0; i <= curIndex; i++) {
          // Judge whether the previous one is free or there is no input, if it exists, adjust the focus to the front, and give the back of the input to the front one, otherwise skip to the next one
          if (!inputArr[i].value) {
            inputArr[curIndex].blur();
            inputArr[i].value = inputArr[curIndex].value;
            var index = i + 1;
            inputArr[index].focus();
            inputArr[curIndex].value = "";
            return;
          } else {
            // var nextIndex = Number(curIndex) + 1;
            inputArr[nextIndex].focus();
          }
        }
      } else {
        // callback(str);
        //You can send a verification code request when you enter the four-digit verification code, etc.
      }
    });

}



export default function game(window, document, settings) {
    const overlay = document.getElementsByClassName("overlay")[0];
    const close = document.getElementsByClassName("close")[0];
    const btnInstall = document.getElementsByClassName("install")[0];

    const listItem = document.querySelector('#result-row');
    const resultTable = document.querySelector('.result');
    const inputArr = document.getElementsByTagName("input");
    const inputBox = document.querySelector('.input-div');

    let movesLeft = settings.maxMoves;

    let lastTry = null;
    let lastGuess = null;
    let secret;

    function clear() {
        for (const input of inputArr) {
            input.value = "";
        }
        updateStr(inputArr, settings.size);
        inputArr[0].focus();
    }

    function onGameEnd(message1, message2) {
        const h2 = overlay.querySelector('h2');
        h2.textContent = message1;
        const content = overlay.querySelector('.content');
        content.textContent = message2;
        overlay.classList.add('show');
        btnInstall.classList.remove('hidden2');
        inputBox.classList.add('hidden');
        handlers['gameover']();
    }

    close.addEventListener("click", function (e) {
        e.preventDefault();
        overlay.classList.remove("show");
    }, false);


    function onWin() {
        onGameEnd("You win", "In " + (settings.maxMoves - movesLeft) + " moves");
    }
    function onLoose() {
        onGameEnd("You loose", "Secret was " + secret);
    }

    const handlers = {
        'player': stub,
        'guesserMove': stub,
        'meMove': stub,
        'aiMove': stub,
        'aiHint': stub,
        'gameover': stub
    }

    function on(name, f) {
        handlers[name] = f;
    }

    async function onMove(num) {
        console.log(num);
        lastGuess = num;
        const li = listItem.content.cloneNode(true);
        const request = li.querySelector('.request');
        request.textContent = num;
        lastTry = resultTable.appendChild(li.firstElementChild);
        await delay(200);
        clear();
        movesLeft--;
        const ans = await handlers['player'](num);
    }

    function takeResp(verdict) {
        console.log(verdict);
        if (secret) {
            const isOk = validateVerdict(secret, verdict, lastGuess);
            assert(settings.cheating || isOk, "Cheating detected");
        } else {
            assert(settings.cheating, "Cheating detected2");
        }
        if (lastTry) {
           const resp = lastTry.querySelector('.response');
           resp.textContent = String(verdict).padStart(2, '0');
        } else {
            assert(false, verdict);
        }
        if (verdict == settings.size*10) {
            onWin();
            return;
        }
        if (movesLeft <= 0) {
            onLoose();
        }
    }

    function tellSecret(s) {
        if (!settings.cheating) {
            assert(s, "Not valid secret");
            assert(!secret || secret == s, "Unable to change secret");
        }
        secret = s;
        console.log(secret);
    }

    handleInput(window, document, settings, onMove);

    return {
       on: on,
       takeResp: takeResp,
       tellSecret: tellSecret
    }
}
