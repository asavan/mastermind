"use strict";
(self["webpackChunkmastermind"] = self["webpackChunkmastermind"] || []).push([[317],{

/***/ 317:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ netMode)
});

// EXTERNAL MODULE: ./src/connection.js
var src_connection = __webpack_require__(661);
// EXTERNAL MODULE: ./src/qr_helper.js
var qr_helper = __webpack_require__(925);
;// ./src/actions.js


function init(game) {
    return {
        "player": (data) => game.testSecret(data),
        "sendSecret": (data) => game.tellSecret(data),
        "sendAnswer": (data) => game.takeResp(data)
    };
}

/* harmony default export */ const src_actions = (init);

// EXTERNAL MODULE: ./src/helper.js
var helper = __webpack_require__(541);
;// ./src/net_mode.js







function toObjJson(v, method) {
    const value = {
        "method": method
    };
    value[method] = v;
    return JSON.stringify(value);
}

function netMode(window, document, settings, gameFunction) {
    return new Promise((resolve, reject) => {
        const connection = (0,src_connection/* default */.A)(settings, window.location);
        const color = settings.color;
        const staticHost = settings.sh || window.location.href;
        const logger = document.getElementsByClassName("log")[0];
        connection.on("error", (e) => {
            (0,helper/* log */.Rm)(settings, e, logger);
        });
        connection.on("socket_open", () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const url = new URL(staticHost);
            url.search = urlParams;
            url.searchParams.delete("wh");
            url.searchParams.delete("sh");
            url.searchParams.set("color", connection.getOtherColor(color));
            url.searchParams.set("mode", "net");
            console.log("enemy url", url.toString());
            const code = (0,qr_helper/* makeQrPlainEl */.Zk)(url.toString(), document.querySelector(".qrcode"));
            connection.on("socket_close", () => {
                (0,qr_helper/* removeElem */.k6)(code);
            });
        });

        connection.on("open", () => {
            const game = gameFunction(window, document, settings);
            const actions = src_actions(game);
            connection.on("recv", (data) => {
                // console.log(data);
                const obj = JSON.parse(data);
                const res = obj[obj.method];
                const callback = actions[obj.method];
                if (typeof callback === "function") {
                    callback(res);
                }
            });
            for (const [handlerName,] of Object.entries(actions)) {
                game.on(handlerName, (n) => connection.sendMessage(toObjJson(n, handlerName)));
            }
            resolve(game);
        });

        try {
            connection.connect();
        } catch (e) {
            (0,helper/* log */.Rm)(settings, e, logger);
            reject(e);
        }
    });
}


/***/ }),

/***/ 661:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const colors = ["blue", "red"];

function stub(message) {
    console.log("Stub " + message);
}

let user = "";
let user2 = "";

const handlers = {
    "recv": stub,
    "open": stub,
    "socket_open": stub,
    "socket_close": stub,
    "close": stub,
    "error": stub,
};

function stringifyEvent(e) {
    const obj = {};
    for (const k in e) {
        obj[k] = e[k];
    }
    return JSON.stringify(obj, (k, v) => {
        if (v instanceof Node) {
            return "Node";
        }
        if (v instanceof Window) {
            return "Window";
        }
        return v;
    }, " ");
}


function sendNegotiation(type, sdp, ws) {
    const json = {from: user, to: user2, action: type, data: sdp};
    console.log("Sending [" + user + "] to [" + user2 + "]: " + JSON.stringify(sdp));
    return ws.send(JSON.stringify(json));
}

function getOtherColor(color) {
    for (const colorOther of colors) {
        if (color === colorOther) {
            continue;
        }
        return colorOther;
    }
    return "";
}


function createSignalingChannel(socketUrl, color, serverOnly) {
    const ws = new WebSocket(socketUrl);

    const send = (type, sdp) => sendNegotiation(type, sdp, ws);
    const close = () => {
        // iphone fires "onerror" on close socket
        handlers["error"] = stub;
        ws.close();
    };

    const onmessage = stub;
    const result = {onmessage, send, close};

    ws.onopen = function (e) {
        console.log("Websocket opened", e);
        handlers["socket_open"]();
        if (!serverOnly) {
            user = color;
            user2 = getOtherColor(color);
            sendNegotiation("connected", {color: user}, ws);
        }
    };
    ws.onclose = function (e) {
        console.log("Websocket closed", e);
        handlers["socket_close"]();
    };

    ws.onmessage = function (e) {
        if (e.data instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
                result.onmessage(reader.result);
            };
            reader.readAsText(e.data);
        } else {
            result.onmessage(e.data);
        }
    };
    ws.onerror = function (e) {
        console.log(e);
        handlers["error"](stringifyEvent(e));
    };
    return result;
}

const connectionFunc = function (settings, location) {

    const serverOnly = settings.mode === "server";

    function on(name, f) {
        handlers[name] = f;
    }

    function getWebSocketUrl() {
        if (settings.wh) {
            return settings.wh;
        }
        if (location.protocol === "https:") {
            return null;
        }
        return "ws://" + location.hostname + ":" + settings.wsPort;
    }

    // inspired by
    // http://udn.realityripple.com/docs/Web/API/WebRTC_API/Perfect_negotiation#Implementing_perfect_negotiation
    // and https://w3c.github.io/webrtc-pc/#perfect-negotiation-example
    function connect() {
        const socketUrl = getWebSocketUrl();
        if (socketUrl == null) {
            throw "Can't determine ws address";
        }
        const color = settings.color;
        const signaling = createSignalingChannel(socketUrl, color, serverOnly);

        if (serverOnly) {
            signaling.onmessage = async function(text) {
                console.log("Websocket message received: " + text);
                const json = JSON.parse(text);
                if (json.from === user) {
                    console.error("same user");
                    return;
                }
                await handlers["server_message"](json);
            };
            return;
        }

        const peerConnection = new RTCPeerConnection();
        // window.pc = peerConnection;

        peerConnection.onicecandidate = function (e) {
            if (!e) {
                return;
            }
            console.log("candidate", e.candidate);
            signaling.send("candidate", e.candidate);
        };
        peerConnection.oniceconnectionstatechange = () => {
            if (peerConnection.iceConnectionState === "failed") {
                console.error("failed");
                peerConnection.restartIce();
            }
        };
        let makingOffer = false;
        const polite = color === "red";

        let ignoreOffer = false;
        let isSettingRemoteAnswerPending = false;

        peerConnection.onnegotiationneeded = async () => {
            try {
                makingOffer = true;
                console.log("make offer");
                await peerConnection.setLocalDescription();
                signaling.send("description", peerConnection.localDescription);
            } catch (err) {
                console.error(err);
            } finally {
                makingOffer = false;
            }
        };

        peerConnection.ondatachannel = (ev) => {
            if (dataChannel == null || polite) {
                setupDataChannel(ev.channel, signaling);
            }
        };

        signaling.onmessage = async function(text) {
            console.log("Websocket message received: " + text);
            const json = JSON.parse(text);
            if (json.from === user) {
                console.error("same user");
                return;
            }

            if (serverOnly) {
                handlers["server_message"](json);
                return;
            }

            if (json.action === "candidate") {
                peerConnection.addIceCandidate(json.data).catch(e => {
                    console.error(e);
                });
            } else if (json.action === "description") {
                const description = json.data;
                const readyForOffer =
                !makingOffer &&
                (peerConnection.signalingState == "stable" || isSettingRemoteAnswerPending);
                const offerCollision = description.type == "offer" && !readyForOffer;
                ignoreOffer = !polite && offerCollision;
                if (ignoreOffer) {
                    console.error("ignore");
                    return;
                }
                isSettingRemoteAnswerPending = description.type == "answer";
                await peerConnection.setRemoteDescription(description);
                isSettingRemoteAnswerPending = false;
                if (description.type =="offer") {
                    await peerConnection.setLocalDescription();
                    signaling.send("description", peerConnection.localDescription);
                }
            } else if (json.action === "connected") {
                setupDataChannel(peerConnection.createDataChannel("gamechannel"), signaling);
            } else if (json.action === "close") {
                // need for server
            } else {
                console.log("Unknown type " + json.action);
            }
        };
    }

    let dataChannel = null;
    let isConnected = false;

    function setupDataChannel(c, signaling) {
        dataChannel = c;
        dataChannel.onmessage = function (e) {
            handlers["recv"](e.data);
        };

        dataChannel.onopen = function () {
            console.log("------ DATACHANNEL OPENED ------");
            isConnected = true;
            signaling.send("close", {});
            signaling.close();
            handlers["open"]();
        };

        dataChannel.onclose = function () {
            console.log("------ DC closed! ------");
            isConnected = false;
        };

        dataChannel.onerror = function () {
            console.log("DC ERROR!!!");
        };
    }

    function sendMessage(messageBody) {
        if (!dataChannel) {
            return false;
        }
        if (!isConnected) {
            console.log("Not connected");
            return false;
        }
        dataChannel.send(messageBody);
        return isConnected;
    }

    return {connect, sendMessage, on, getOtherColor};
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectionFunc);


/***/ }),

/***/ 925:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Zk: () => (/* binding */ makeQrPlainEl),
/* harmony export */   k6: () => (/* binding */ removeElem)
/* harmony export */ });
/* unused harmony exports bigPicture, makeQrPlain, makeQr */
/* harmony import */ var _akamfoad_qrcode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(420);


function bigPicture(elem) {
    elem.addEventListener("click", () => elem.classList.toggle("big"));
}

function chomp(string, c) {
    if (string.charAt(string.length - c.length) === c) {
        return string.substr(0, string.length - c.length);
    }
    return string;
}

function renderQRCodeSVG(text, divElement, pic) {
    const qrSVG = new _akamfoad_qrcode__WEBPACK_IMPORTED_MODULE_0__/* .QRCodeSVG */ .hp(text, {
        level: "M",
        padding: 3,
        image: {
            source: pic,
            width: "15%",
            height: "15%",
            x: "center",
            y: "center",
        },
    });
    divElement.innerHTML = qrSVG.toString();
    bigPicture(divElement);
    return divElement;
}

function removeElem(el) {
    if (el) {
        el.remove();
    }
}

function makeQrPlainEl(staticHost, el, pic = "./images/mastermind.svg") {
    const url = new URL(staticHost);
    const urlStr = chomp(url.toString(), "/");
    console.log("enemy url", urlStr);
    return renderQRCodeSVG(urlStr, el, pic);
}

function makeQrPlain(staticHost, document, selector) {
    return makeQrPlainEl(staticHost, document.querySelector(selector));
}

function makeQr(window, document, settings) {
    const staticHost = settings.sh || window.location.origin;
    return makeQrPlain(staticHost, document, ".qrcode");
}


/***/ })

}]);