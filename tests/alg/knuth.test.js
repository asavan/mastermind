import test from "node:test";
import assert from "node:assert/strict";


import knuthGuesser from "../../src/alg/knuth.js";
import runner from "../../src/alg/runner.js";
import engine from "../../src/engine.js";

test("knuth", async () => {
    const eng = engine.fromString("1235");
    const guesser = knuthGuesser();
    const count = runner(guesser, eng, []);
    assert.strictEqual(count, 3);
});
