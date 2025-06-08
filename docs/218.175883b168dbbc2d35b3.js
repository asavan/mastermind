"use strict";
(self["webpackChunkmastermind"] = self["webpackChunkmastermind"] || []).push([[218],{

/***/ 218:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ server)
/* harmony export */ });
/* harmony import */ var _qr_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(925);
/* harmony import */ var _connection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(661);





const SERVER_COLOR = "black";

function colorizePath(elem, color) {
    if (!elem) {
        return;
    }
    const svgPath = elem.querySelector("path");
    if (svgPath) {
        svgPath.style.fill = color;
    }
}

function oneQrCode(url, code, color, qrcontainer, document) {
    const element = document.createElement("div");
    element.classList.add("qrcode");
    qrcontainer.appendChild(element);
    url.searchParams.set("color", color);
    (0,_qr_helper_js__WEBPACK_IMPORTED_MODULE_0__/* .makeQrPlainEl */ .Zk)(url.toString(), element);
    colorizePath(element, color);
    code[color] = element;
}

function server(window, document, settings) {
    const connection = (0,_connection_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(settings, window.location);
    const staticHost = settings.sh || window.location.href;
    const code = {};
    {
        const url = new URL(staticHost);
        url.searchParams.delete("mode");
        const qrcontainer = document.querySelector(".qrcontainerserver");
        oneQrCode(url, code, "blue", qrcontainer, document);
        oneQrCode(url, code, "red", qrcontainer, document);
    }

    connection.on("socket_open", () => {
        colorizePath(code["blue"], "royalblue");
    });

    connection.on("server_message", (json) => {
        if (json.action === "connected") {
            colorizePath(code[json.from], SERVER_COLOR);
        } else if (json.action === "close") {
            (0,_qr_helper_js__WEBPACK_IMPORTED_MODULE_0__/* .removeElem */ .k6)(code[json.from]);
        }
    });

    try {
        connection.connect();
    } catch (e) {
        console.log(e);
    }
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