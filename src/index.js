"use strict";

import settings from "./settings.js";
import gameFunction from "./game.js";
import install from "./install_as_app.js";
import {parseSettings, assert} from "./helper.js";

function launch(f, window, document) {
    f(window, document);
}

function starter(window, document) {
    parseSettings(window, document, settings);

    if (settings.currentMode === 'net') {
        import("./net_mode.js").then(netMode => {
            netMode.default(window, document, settings, gameFunction);
        });
    } else if (settings.currentMode === 'server' || settings.color == 'black') {
        import("./server_mode.js").then(serverMode => {
            settings.color = 'black';
            serverMode.default(window, document, settings);
        });
    } else if (settings.currentMode === 'ai') {
        import("./ai.js").then(ai => {
            ai.default(window, document, settings, gameFunction);
        });
    } else {
        assert(false, "Unsupported mode");
    }
}


if (__USE_SERVICE_WORKERS__) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {scope: './'});
        install(window, document);
    }
}

launch(starter, window, document);
