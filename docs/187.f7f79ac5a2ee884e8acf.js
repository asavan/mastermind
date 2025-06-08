"use strict";
(self["webpackChunkmastermind"] = self["webpackChunkmastermind"] || []).push([[187],{

/***/ 187:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ai)
/* harmony export */ });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(541);




const randomInteger = (min, max) => {
    const rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};


function simpleBot(settings, game) {
    const result = [];
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
        await (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__/* .delay */ .cb)(200);
        await game.takeResp(res);
        return res;
    };

    return {
        makeMove: makeMove
    };
}

function ai(window, document, settings, gameFunction) {
    return new Promise((resolve) => {
        const game = gameFunction(window, document, settings);
        const bot = simpleBot(settings, game);
        game.on("player", (move) => bot.makeMove(move));
        resolve(game);
    });
}


/***/ })

}]);