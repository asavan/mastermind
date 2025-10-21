"use strict";

import settings from "./settings.js";
import gameFunction from "./game.js";
import {parseSettings, assert} from "netutils";

export default function starter(window, document) {
    parseSettings(window.location.search, settings);

    if (settings.mode === "net") {
        import("./mode/net_mode.js").then(netMode => {
            netMode.default(window, document, settings, gameFunction);
        });
    } else if (settings.mode === "ai") {
        import("./mode/ai.js").then(ai => {
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
