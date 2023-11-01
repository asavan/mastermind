import engine from "../engine.js";


function generateAllVariantsRec(pos, colors, index, rec, val) {
    if (index >= pos) {
        rec.add(val);
        return;
    }
    for (let i = 1; i <= colors; ++i) {
        generateAllVariantsRec(pos, colors, index + 1, rec, val*10 + i);
    }
}

function generateAllVariants(pos, colors) {
    const arr = new Set();
    generateAllVariantsRec(pos, colors, 0, arr, 0);
    return arr;
}

function genArray(pos, colors, filler) {
    const size = Math.floor(Math.pow(colors, pos));
    return new Array(size).fill(filler);
}

function simpleGuesser(pos, colors) {
    let rest = Array.from(generateAllVariants(pos, colors));
    let totalCount = 0;
    let guessCount = 0;
    function learn(guess, verdict) {
        ++totalCount;
        const eng = engine.fromNum(guess);
        rest = rest.filter(el => eng.testNum(el) === verdict);
    }

    function init(initial) {
        for (const [guess, verdict] of initial) {
            learn(guess, verdict);
        }
    }

    function getRest() {
        return Array.from(rest);
    }

    const isLogicalMove = (numGuess) => rest.includes(numGuess);

    const tryGuessNum = () => {
        ++guessCount;
        return rest[0];
    };

    const getGuessCount = () => guessCount;
    const getTotalCount = () => totalCount;

    const isFirst = () => totalCount === 0;

    return {
        init,
        learn,
        tryGuessNum,
        getRest,
        isLogicalMove,
        getGuessCount,
        getTotalCount,
        isFirst
    };
}

export default {
    generateAllVariants,
    simpleGuesser,
    genArray
};
