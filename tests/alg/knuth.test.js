import test from "node:test";
import assert from "node:assert/strict";


import knuthGuesser from "../../src/alg/knuth.js";
import runner from "../../src/alg/runner.js";
import engine from "../../src/engine.js";

test("knuth fast", () => {
    const eng = engine.fromString("1235");
    const guesser = knuthGuesser.fast();
    const count = runner(guesser, eng, []);
    assert.strictEqual(count, 3);
});


test("knuth simple", () => {
    const eng = engine.fromString("1235");
    const guesser = knuthGuesser.simple();
    const count = runner(guesser, eng, []);
    assert.strictEqual(count, 3);
});

test("knuth rand", () => {
    const eng = engine.fromString("1235");
    const guesser = knuthGuesser.random();
    const count = runner(guesser, eng, []);
    console.log("knuth rand", count);
    assert.ok(count <= 5);
});


test("knuth rand fast", () => {
    const eng = engine.fromString("1235");
    const guesser = knuthGuesser.random_fast();
    const count = runner(guesser, eng, []);
    console.log("knuth rand fast", count);
    assert.ok(count <= 5);
});
