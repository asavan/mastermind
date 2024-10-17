"use strict";

import settings from "./settings.js";
import gameFunction from "./game.js";
import {parseSettings, assert} from "./helper.js";

export default function starter(window, document) {
    parseSettings(window, document, settings);

    if (settings.mode === "net") {
        import("./net_mode.js").then(netMode => {
            netMode.default(window, document, settings, gameFunction);
        });
    } else if (settings.mode === "server" || settings.color === "black") {
        import("./server_mode.js").then(serverMode => {
            settings.color = "black";
            serverMode.default(window, document, settings);
        });
    } else if (settings.mode === "ai") {
        import("./ai.js").then(ai => {
            ai.default(window, document, settings, gameFunction).then(g => {
                g.on("gameover", (score) => {
                    console.log("Score", score);
                    const btnAdd = document.querySelector(".butInstall");
                    btnAdd.classList.remove("hidden2");
                });
            });
        });
    } else {
        assert(false, "Unsupported mode");
    }
}
