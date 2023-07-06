"use strict";

import {assert} from "./helper.js";


const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};

function has(arr, cand) {
    for (const a of arr) {
        if (a === cand) return true;
    }
    return false;
}

function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

function common(arr, str) {
    assert(arr.length === str.length, "Different size");
    let count = 0;
    const a = Array.from(arr).map((i) => parseInt(i, 10));
    const b = Array.from(str).map((i) => parseInt(i, 10));

    console.log(a, b);
    for (let i = 0; i < a.length; i++) {
        if(a[i] == b[i]) {
            a.splice(i, 1);
            b.splice(i, 1);
            count++;
            --i;
        }
    }
    a.sort();
    b.sort();
    const c = intersect_safe(a, b);

    const res = count * 10 + c.length;
    console.log(a, b, c, res);
    return res;
}

function simpleBot(settings, game) {
    let result = [];
    console.log("Start");
    for (let i = 0; i < settings.size; i++) {
        let cand = randomInteger(settings.min, settings.max);
        while (!settings.repeat && has(result, cand)) {
            cand = randomInteger(settings.min, settings.max);
        }
        result.push(cand);
    }


    let ans = 0;
    for (let i = settings.size; i > 0 ; i--) {
        ans *= 10;
        ans += result[i-1];
    }

    console.log("end", ans, result);

    const makeMove = function (num) {
        const res = common(result, num);
        game.takeResp(res);
    };

    return {
        makeMove: makeMove
    }
}


export default function ai(window, document, settings, gameFunction) {
    const game = gameFunction(window, document, settings);
    const bot = simpleBot(settings, game);
    game.on("player", (move) => bot.makeMove(move));
}
