"use strict";

import connectionFunc from "./connection.js";
import qrRender from "./qrcode.js";
import protocol from "./protocol.js";
import actionsFunc from "./actions.js";
import {removeElem, log} from "./helper.js";

export default function netMode(window, document, settings, gameFunction) {
    return new Promise((resolve, reject) => {
        const connection = connectionFunc(settings, window.location);
        const color = settings.color;
        const staticHost = settings.sh || window.location.href;
        const logger = document.getElementsByClassName('log')[0];
        connection.on('error', (e) => {
            log(settings, e, logger);
        });
        connection.on('socket_open', () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const url = new URL(staticHost);
            url.search = urlParams;
            url.searchParams.delete('wh');
            url.searchParams.delete('sh');
            url.searchParams.set('color', connection.getOtherColor(color));
            url.searchParams.set('currentMode', 'net');
            console.log("enemy url", url.toString());
            const code = qrRender(url.toString(), document.querySelector(".qrcode"));
            connection.on('socket_close', () => {
                removeElem(code);
            });
        });

        connection.on('open', () => {
            const game = gameFunction(window, document, settings);
            const actions = actionsFunc(game);
            connection.on('recv', (data) => {
                // console.log(data);
                for (const [handlerName, callback] of Object.entries(actions)) {
                  protocol.parser(data, handlerName, callback);
                }
            });
            for (const [handlerName, callback] of Object.entries(actions)) {
                game.on(handlerName, (n) => connection.sendMessage(protocol.toObjJson(n, handlerName)));
            }
            resolve(game);
        });

        try {
            connection.connect();
        } catch (e) {
            log(settings, e, logger);
            reject(e);
        }
    });
}
