import test from "node:test";
import assert from "node:assert/strict";


import {commonArr, numToDigits} from "../src/solver.js";

test("numToDigits", async () => {
    const arr = numToDigits(1234);
    assert.deepStrictEqual([1, 2, 3, 4], arr);
});

test("common", async () => {
    const res = commonArr([1, 2, 3, 4], [1, 2, 4, 3]);
    assert.strictEqual(res, 22);
});

test("commonAll", async () => {
    const res = commonArr([1, 2, 3, 4], [1, 2, 3, 4]);
    assert.strictEqual(res, 40);
});

test("commonNone", async () => {
    const res = commonArr([5, 6, 3, 4], [1, 1, 2, 2]);
    assert.strictEqual(res, 0);
});
