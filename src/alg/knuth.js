import dumb from "./simple.js";
import engine from "../engine.js";
import {numToDigits} from "../solver.js";

import randomUtil from "./random-util.js";


// https://en.wikipedia.org/wiki/Mastermind_(board_game)#Five-guess_algorithm
function simple() {
    const helper = dumb.simpleGuesser(4, 6);
    let allPossibles = helper.getRest().slice();
    const learn = (guess, verdict) => {
        allPossibles = allPossibles.filter(x => x !== guess);
        return helper.learn(guess, verdict);
    };
    const init = helper.init;
    const isFirst = helper.isFirst;
    const getRest = helper.getRest;

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

    const MiniMax = (knuth_codes, possible_codes, calc_best_callback) => {
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
        return calc_best_callback(scores, possible_codes, knuth_codes_set);
    };

    const tryGuessNum = () => {
        return MiniMax(helper.getRest(), allPossibles, getFirstBest);
    };

    const getAllPossibles = () => allPossibles;

    return {
        init,
        learn,
        tryGuessNum,
        getRest,
        isFirst,
        getAllPossibles,
        MiniMax
    };
}

function fast() {
    const helper = simple();
    const learn = helper.learn;
    const init = helper.init;
    const getRest = helper.getRest;

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
        tryGuessNum,
        getRest
    };
}

function random() {
    const helper = simple();

    const learn = helper.learn;
    const init = helper.init;
    const isFirst = helper.isFirst;
    const getRest = helper.getRest;

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

    const tryGuessNum = () => {
        return helper.MiniMax(helper.getRest(), helper.getAllPossibles(), getRandomBest);
    };

    return {
        init,
        learn,
        tryGuessNum,
        getRest,
        isFirst
    };
}

function random_fast() {
    const helper = random();
    const learn = helper.learn;
    const init = helper.init;
    const getRest = helper.getRest;

    const twoColors = helper.getRest().filter(el => {
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
        tryGuessNum,
        getRest
    };
}

export default {
    simple,
    fast,
    random,
    random_fast
};
