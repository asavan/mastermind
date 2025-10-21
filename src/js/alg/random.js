import simple from "./simple.js";
import randomUtil from "./random-util.js";

export default function randomGuesser(pos, colors) {
    const helper = simple.simpleGuesser(pos, colors);
    const learn = helper.learn;
    const init = helper.init;
    const getRest = helper.getRest;
    const tryGuessNum = () => randomUtil.randEl(helper.getRest());

    return {
        init,
        learn,
        tryGuessNum,
        getRest
    };
}
