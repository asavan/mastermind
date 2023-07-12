"use strict";

function init(game) {
    return {
        'player': async (n) => {
          console.log("try to move " + JSON.stringify(n));
          return game.testSecret(n);
        },
        'sendSecret': async (secret) => {
            return game.tellSecret(secret);
        },
        'sendAnswer': async (ans) => {
            return game.takeResp(ans);
        }
    }
}

export default init;
