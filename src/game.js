"use strict"; // jshint ;_;

import {delay, assert, pluralize} from "./helper.js";
import {common, toInt} from "./solver.js";

function stub() {
}

let str = "";

function updateStr(inputArr, size) {
    str = "";
    for (let j = 0; j < size; j++) {
        str += inputArr[j].value;
    }
}

function validateVerdict(verdict, secret, lastGuess) {
    const res = common(secret, lastGuess);
    return verdict === res;
}

function validateInput(settings, str) {
    if (str.length !== settings.size) {
        return false;
    }
    for (const ch of str) {
        const digit = parseInt(ch, 10);
        if (isNaN(digit) || digit < settings.min || digit > settings.max) {
            return false;
        }
    }
    return true;
}

function validateInputCheckRepeat(settings, str) {
    if (str.length !== settings.size) {
        return false;
    }
    const unique = new Set();
    for (const ch of str) {
        const digit = parseInt(ch, 10);
        if (isNaN(digit) || digit < settings.min || digit > settings.max) {
            return false;
        }
        unique.add(digit);
    }
    return settings.repeat || unique.size === settings.size;
}

function focusNextIndex(curIndex, inputArr, settings) {
    for (let i = 0; i < inputArr.length; ++i) {
        const index = (i + curIndex + 1) % inputArr.length;
        const digit = parseInt(inputArr[index].value, 10);
        if (isNaN(digit) || digit < settings.min || digit > settings.max) {
            inputArr[index].value = "";
            inputArr[index].focus();
            return index;
        }
    }
}

function handleInput(window, document, settings, callback, validator) {

    const inputArr = document.getElementsByTagName("input");
    const logger = document.getElementsByClassName('log')[0];
    const size = settings.size;

    function clear() {
        for (const input of inputArr) {
            input.value = "";
        }
        updateStr(inputArr, settings.size);
        // inputArr[0].focus();
    }


    window.onkeyup = (e) => {
      const curIndex = parseInt(e.target.getAttribute("data-index"), 10); //Get the index of the current input
      if (isNaN(curIndex) || curIndex < 0) {
        return false;
      }
      if (e.key == 'Enter') {
        if (validator(settings, str)) {
            callback(str);
            // clear
            str = "";
            clear();
        }

        return false;
      }
      if (e.key == 'Backspace') {
        let prev = curIndex - 1;
        if ((curIndex === size - 1 && str[curIndex]) || prev < 0) {
            prev = curIndex;
        }
        console.log(curIndex, prev, str[curIndex]);

        inputArr[prev].value = "";
        inputArr[prev].focus();
        updateStr(inputArr, size);
        return false;
      }
      //If the input is not a number
      if (!(e.key >= settings.min.toString() && e.key <= settings.max.toString() || e.keyCode == 229)) {
        inputArr[curIndex].value = "";
        return false;
      }

      updateStr(inputArr, size);
      if (!validator(settings, str)) {
        focusNextIndex(curIndex, inputArr, settings);
      } else {
        setTimeout(() => {
            if (validator(settings, str)) {
                callback(str);
                str = "";
                clear();
            }
        }, 200);
      }
    };
}


export default function game(window, document, settings) {
    const overlay = document.getElementsByClassName("overlay")[0];
    const close = document.getElementsByClassName("close")[0];
    const btnInstall = document.getElementsByClassName("install")[0];

    const listItem = document.querySelector('#result-row');
    const resultTable = document.querySelector('.result');
    const inputArr = document.getElementsByTagName("input");
    const inputBox = document.querySelector('.input-div');

    let movesLeft = settings.maxMoves + 1; // plus one for initial setup
    let opponentMovesLeft = settings.maxMoves + 1;
    let opponentAlreadyWin = false;
    let meAlreadyWin = false;

    let lastTry = null;
    let lastGuess = null;
    let isSending = false;
    let secret;
    let myNumber;
    let score = 0;


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

    function onWin(movesCount) {
        score += 1;
        onGameEnd("You win", "In " + pluralize(movesCount, "move"));
    }

    function onLoose() {
        score -= 1;
        onGameEnd("You loose", "Secret was " + secret);
    }

    function onDraw(movesCount) {
        score += 0.5;
        onGameEnd("Draw", "In " + pluralize(movesCount, "move"));
    }

    function disableSend() {
        isSending = true;
        for (const input of inputArr) {
            // input.value = "";
            input.disabled = true;
        }
    }

    function enableSend() {
        isSending = false;
        for (const input of inputArr) {
            // input.value = "";
            input.disabled = false;
        }
        inputArr[0].focus();
    }

    function tryEnableInputs() {
        if (opponentMovesLeft <= movesLeft) {
            enableSend();
        }
    }

    const handlers = {
        'player': stub,
        'sendSecret': stub,
        'sendAnswer': stub,
        'gameover': stub
    }

    function on(name, f) {
        handlers[name] = f;
    }

    async function onMove(num) {
        console.log(num);
        disableSend();
        lastGuess = num;
        const li = listItem.content.cloneNode(true);
        const request = li.querySelector('.request');
        request.textContent = num;
        lastTry = resultTable.appendChild(li.firstElementChild);
        --movesLeft;
        const ans = await handlers['player'](num);
        tryEnableInputs();
    }

    async function setMyNumber(num) {
        disableSend();
        myNumber = num;
        --movesLeft;
        const ans = await handlers['sendSecret'](num);
        handleInput(window, document, settings, onMove, validateInput);
        tryEnableInputs();
        return ans;
    }

    function checkWinner() {
        if (!meAlreadyWin && !opponentAlreadyWin) {
            if (movesLeft <= 0) {
               onLoose();
            }
            return;
        }
        const myMovesCount = settings.maxMoves - movesLeft;
        const opponentMovesCount = settings.maxMoves - opponentMovesLeft;

        if (meAlreadyWin && opponentAlreadyWin && myMovesCount === opponentMovesCount) {
            onDraw(myMovesCount);
            return;
        }

        if (meAlreadyWin && myMovesCount <= opponentMovesCount) {
            onWin(myMovesCount);
            return;
        }

        if (opponentAlreadyWin && opponentMovesCount <= myMovesCount) {
            onLoose();
            return;
        }
    }

    async function takeResp(verdict) {
        if (secret) {
            const isOk = validateVerdict(verdict, secret, lastGuess);
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
            meAlreadyWin = true;
        }
        checkWinner();
    }

    function tellSecret(s) {
        if (!settings.cheating) {
            assert(s, "Not valid secret");
            assert(!secret || secret == s, "Unable to change secret");
        }

        secret = s;
        console.log(secret);
        --opponentMovesLeft;
        tryEnableInputs();
    }

    if (settings.currentMode === 'ai') {
        // handleInput(window, document, settings, onMove);
    } else if (settings.currentMode === 'net') {
        handleInput(window, document, settings, setMyNumber, validateInputCheckRepeat);
    }

    async function testSecret(num) {
        const res = common(myNumber, num);
        opponentAlreadyWin = ((res === settings.size*10) && (settings.currentMode !== 'ai'));
        --opponentMovesLeft;
        await handlers['sendAnswer'](res);
        tryEnableInputs();
        checkWinner();
        return res;
    }

    const getScore = () => score;

    enableSend();

    return {
       on: on,
       takeResp: takeResp,
       tellSecret: tellSecret,
       testSecret: testSecret,
       setMyNumber: setMyNumber,
       getScore: getScore
    }
}
