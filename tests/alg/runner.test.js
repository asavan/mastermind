import test from "node:test";
import assert from "node:assert/strict";


import simple from "../../src/alg/simple.js";
import randomGuesser from "../../src/alg/random.js";
import swaszekGuesser from "../../src/alg/swaszek.js";
import runner from "../../src/alg/runner.js";
import engine from "../../src/engine.js";

test("simple", async () => {
    const eng = engine.fromString("1235");
    const guesser = simple.simpleGuesser(4, 6);
    const count = runner(guesser, eng, []);
    assert.strictEqual(count, 5, "too long");
});

test("random", async () => {
    const eng = engine.fromString("1235");
    const guesser = randomGuesser(4, 6);
    const count = runner(guesser, eng, []);
    assert.ok(count < 8, "too long " + count);
});

test("random average", async () => {
    const allVariants = simple.generateAllVariants(4, 6);
    let allCount = 0;
    let maxCount = 0;
    for (const variant of allVariants) {
        const eng = engine.fromNum(variant);
        const guesser = randomGuesser(4, 6);
        const count = runner(guesser, eng, []);
        maxCount = Math.max(maxCount, count);
        allCount += count;
    }
    console.log(allCount, maxCount);
});

test("simple average", async () => {
    const allVariants = simple.generateAllVariants(4, 6);
    let allCount = 0;
    let maxCount = 0;
    for (const variant of allVariants) {
        const eng = engine.fromNum(variant);
        const guesser = simple.simpleGuesser(4, 6);
        const count = runner(guesser, eng, []);
        maxCount = Math.max(maxCount, count);
        allCount += count;
    }
    assert.strictEqual(maxCount, 9, "too long");
    assert.strictEqual(allCount, 7471, "too long");
});

test("Swaszek average", async () => {
    const allVariants = simple.generateAllVariants(4, 6);
    let allCount = 0;
    let maxCount = 0;
    for (const variant of allVariants) {
        const eng = engine.fromNum(variant);
        const guesser = swaszekGuesser();
        const count = runner(guesser, eng, []);
        maxCount = Math.max(maxCount, count);
        allCount += count;
    }
    assert.strictEqual(maxCount, 8, "too long");
    assert.strictEqual(allCount, 6508, "too long");
});

test("simple with init", async () => {
    const eng = engine.fromString("1235");
    const guesser = simple.simpleGuesser(4, 6);
    const count = runner(guesser, eng, [[1234, 30]]);
    assert.strictEqual(count, 4, "too long");
});
