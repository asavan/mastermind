"use strict";

function init(game) {
    return {
        'player': (n) => {
          console.log("try to move " + JSON.stringify(n));
          game.testSecret(n);
        },
        'sendSecret': (secret) => {
            game.tellSecret(secret);
        },
        'sendAnswer': (ans) => {
            game.takeResp(ans);
        }
    }
}

export default init;
