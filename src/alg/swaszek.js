import simple from "./simple.js";

// https://puzzling.stackexchange.com/questions/546/clever-ways-to-solve-mastermind
export default function Swaszek() {
    const helper = simple.simpleGuesser(4, 6);
    let isFirst = true;
    const learn = helper.learn;
    const init = helper.init;
    const getRest = helper.getRest;
    const tryGuessNum = () => {
        if (isFirst && helper.isLogicalMove(1122)) {
            isFirst = false;
            return 1122;
        } else {
            return helper.tryGuessNum();
        }
    }

    return {
        init,
        learn,
        tryGuessNum,
        getRest
    }
}
