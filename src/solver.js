"use strict";

function intersect_safe(a, b) {
    let ai=0, bi=0;
    const result = [];

    while ( ai < a.length && bi < b.length ) {
        if (a[ai] < b[bi] ) {
            ai++;
        } else if (a[ai] > b[bi] ) {
            bi++;
        } else /* they're equal */ {
            result.push(a[ai]);
            ai++;
            bi++;
        }
    }

    return result;
}

export function numToDigits(num) {
    const arr = [];
    while (num > 0) {
        arr.push(num%10);
        num = Math.floor(num/10);
    }
    arr.reverse();
    return arr;
}

export function commonArr(a, b) {
    let same = 0;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] == b[i]) {
            a.splice(i, 1);
            b.splice(i, 1);
            ++same;
            --i;
        }
    }
    a.sort();
    b.sort();
    const c = intersect_safe(a, b);

    const res = same * 10 + c.length;
    return res;
}

export function common(arr, str) {
    const a = Array.from(arr).map((i) => parseInt(i, 10));
    const b = Array.from(str).map((i) => parseInt(i, 10));
    return commonArr(a, b);
}
