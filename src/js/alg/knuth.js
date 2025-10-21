import dumb from "./simple.js";
import engine from "../engine.js";
import {numToDigits} from "../solver.js";

import randomUtil from "./random-util.js";


// https://en.wikipedia.org/wiki/Mastermind_(board_game)#Five-guess_algorithm
function simple(pos, colors) {
    const helper = dumb.simpleGuesser(pos, colors);
    const allPossibles = helper.getInitialSet();
    const learn = (guess, verdict) => {
        allPossibles.delete(guess);
        return helper.learn(guess, verdict);
    };
    const init = helper.init;
    const isFirst = helper.isFirst;
    const getRestUnsafe = helper.getRestUnsafe;

    const getFirstBest = (scores, possible_codes, knuth_codes_set) => {
        const minimum = Math.min(...scores);
        const guess_codes = [];
        for (const code of possible_codes) {
            if (scores[code] === minimum) {
                if (knuth_codes_set.has(code)) {
                    return code;
                }
                guess_codes.push(code);
            }
        }
        return guess_codes[0];
    };

    const MiniMax = (knuth_codes_set, possible_codes, calc_best_callback) => {
        const len = Math.floor(Math.pow(10, pos));
        const max_value = Math.floor(Math.pow(colors, pos)) + 1;
        const verdict_len = pos * 10 + 1;
        const scores = new Array(len).fill(max_value);
        for (const code of possible_codes) {
            const times_found = new Array(verdict_len).fill(0);
            const eng = engine.fromNum(code);
            for (const code_to_crack of knuth_codes_set) {
                const verdict = eng.testNum(code_to_crack);
                ++times_found[verdict];
            }
            const maximum = Math.max(...times_found);
            scores[code] = maximum;
        }
        return calc_best_callback(scores, possible_codes, knuth_codes_set);
    };

    const getCode = (calc_best_callback) => MiniMax(new Set(helper.getRestUnsafe()), allPossibles, calc_best_callback);

    const tryGuessNum = () => getCode(getFirstBest);

    return {
        init,
        learn,
        tryGuessNum,
        getRestUnsafe,
        isFirst,
        getCode,
    };
}

function fast() {
    const helper = simple(4, 6);
    const learn = helper.learn;
    const init = helper.init;

    const tryGuessNum = () => {
        if (helper.isFirst()) {
            return 1122;
        } else {
            return helper.tryGuessNum();
        }
    };

    return {
        init,
        learn,
        tryGuessNum
    };
}

function random(pos, colors) {
    const helper = simple(pos, colors);

    const learn = helper.learn;
    const init = helper.init;
    const isFirst = helper.isFirst;
    const getRestUnsafe = helper.getRestUnsafe;

    const getRandomBest = (scores, possible_codes, knuth_codes_set) => {
        const minimum = Math.min(...scores);
        const guess_codes = [];
        const best_codes = [];
        for (const code of possible_codes) {
            if (scores[code] === minimum) {
                if (knuth_codes_set.has(code)) {
                    best_codes.push(code);
                } else {
                    guess_codes.push(code);
                }

            }
        }
        if (best_codes.length > 0) {
            return randomUtil.randEl(best_codes);
        }
        return randomUtil.randEl(guess_codes);
    };

    const tryGuessNum = () => helper.getCode(getRandomBest);

    return {
        init,
        learn,
        tryGuessNum,
        getRestUnsafe,
        isFirst
    };
}

function random_fast() {
    const helper = random(4, 6);
    const learn = helper.learn;
    const init = helper.init;

    const twoColors = helper.getRestUnsafe().filter(el => {
        const a = numToDigits(el);
        a.sort();
        return a[0] === a[1] && a[1] !== a[2] && a[2] === a[3];
    });

    const tryGuessNum = () => {
        if (helper.isFirst()) {
            return randomUtil.randEl(twoColors);
        } else {
            return helper.tryGuessNum();
        }
    };

    return {
        init,
        learn,
        tryGuessNum
    };
}

export default {
    simple,
    fast,
    random,
    random_fast
};
