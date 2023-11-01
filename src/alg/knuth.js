import dumb from "./simple.js";
import engine from "../engine.js";

import randomUtil from "./random-util.js";


// https://en.wikipedia.org/wiki/Mastermind_(board_game)#Five-guess_algorithm
function simple() {
    const helper = dumb.simpleGuesser(4, 6);
    let allPossibles = helper.getRest().slice();
    const learn = helper.learn;
    const init = helper.init;
    const isFirst = helper.isFirst;
    const getRest = helper.getRest;

    const MiniMax = (knuth_codes, possible_codes) => {
        const scores = new Array(6667).fill(1300);
        const knuth_codes_set = new Set(knuth_codes);
        for (const code of possible_codes) {
            const times_found = new Array(41).fill(0);
            const eng = engine.fromNum(code);
            for (const code_to_crack of knuth_codes) {
                const verdict = eng.testNum(code_to_crack);
                ++times_found[verdict];
            }
            const maximum = Math.max(...times_found);
            scores[code] = maximum;
        }
        const minimum = Math.min(...scores);
        // console.log("finish max phase", minimum);
        const guess_codes = [];
        for (const code of possible_codes) {
            if (scores[code] === minimum) {
                if (knuth_codes_set.has(code)) {
                    // console.log("best code", code);
                    return code;
                }
                guess_codes.push(code);

            }
        }
        // console.log("found code", guess_codes[0]);
        return guess_codes[0]; // maybe random better
    };

    const pruneCode = (code) => {
        allPossibles = allPossibles.filter(x => x !== code);
        return code;
    };

    const getCode = () => {
        const code = MiniMax(helper.getRest(), allPossibles);
        return pruneCode(code);
    };

    const tryGuessNum = getCode;

    return {
        init,
        learn,
        tryGuessNum,
        getRest,
        pruneCode,
        isFirst
    };
}

function fast() {
    const helper = simple();
    const learn = helper.learn;
    const init = helper.init;
    const getRest = helper.getRest;

    const tryGuessNum = () => {
        if (helper.isFirst()) {
            return helper.pruneCode(1122);
        } else {
            return helper.tryGuessNum();
        }
    };

    return {
        init,
        learn,
        tryGuessNum,
        getRest
    };
}

export default {
    simple,
    fast
};
