// initial - [(1111, 20), (1112, 21), ...]
export default function run(guesser, engine, initial) {
    guesser.init(initial);
    let guess = guesser.tryGuessNum();
    let verdict = engine.testNum(guess);
    let count = 1;
    while (!engine.isWinNum(verdict)) {
        guesser.learn(guess, verdict);
        guess = guesser.tryGuessNum();
        verdict = engine.testNum(guess);
        ++count;
    }
    return count;
}
