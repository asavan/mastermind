const randomInteger = (min, max) => {
    const rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};

const randEl = (arr) => {
    const index = randomInteger(0, arr.length);
    return arr[index];
};

export default {
    randomInteger,
    randEl
};
