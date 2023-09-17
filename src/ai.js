"use strict";

import {delay} from "./helper.js";

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};


function simpleBot(settings, game) {
    let result = [];
    for (let i = 0; i < settings.size; i++) {
        let cand = randomInteger(settings.min, settings.max + 1);
        while (!settings.repeat && result.includes(cand)) {
            cand = randomInteger(settings.min, settings.max + 1);
        }
        result.push(cand);
    }

    game.tellSecret(result.join(""));
    game.setMyNumber(result.join(""));

    const makeMove = async function (num) {
        const res = await game.testSecret(num);
        await delay(200);
        await game.takeResp(res);
        return res;
    };

    return {
        makeMove: makeMove
    };
}

export default function ai(window, document, settings, gameFunction) {
    return new Promise((resolve) => {
        const game = gameFunction(window, document, settings);
        const bot = simpleBot(settings, game);
        game.on("player", (move) => bot.makeMove(move));
        resolve(game);
    });
}
