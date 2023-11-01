import simple from "./simple.js";

const randomInteger = (min, max) => {
    const rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};

const randEl = (arr) => {
    const index = randomInteger(0, arr.length);
    return arr[index];
}

export default function randomGuesser(pos, colors) {
    const helper = simple.simpleGuesser(pos, colors);
    const learn = helper.learn;
    const init = helper.init;
    const getRest = helper.getRest;
    const tryGuessNum = () => randEl(helper.getRest());

    return {
        init,
        learn,
        tryGuessNum,
        getRest
    }
}


