/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 541:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P$: () => (/* binding */ parseSettings),
/* harmony export */   Rm: () => (/* binding */ log),
/* harmony export */   cb: () => (/* binding */ delay),
/* harmony export */   fi: () => (/* binding */ showElem),
/* harmony export */   td: () => (/* binding */ pluralize),
/* harmony export */   vA: () => (/* binding */ assert),
/* harmony export */   y9: () => (/* binding */ hideElem)
/* harmony export */ });
/* unused harmony export removeElem */


function hideElem(el) {
    if (el) {
        el.classList.add("hidden");
    }
}

function showElem(el) {
    if (el) {
        el.classList.remove("hidden");
    }
}

function removeElem(el) {
    if (el) {
        el.remove();
    }
}

function log(settings, message, el) {
    if (settings.logger) {
        if (typeof message == "object") {
            el.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + "<br />";
        } else {
            el.innerHTML += message + "<br />";
        }
    }
    console.log(message);
}


function stringToBoolean(string) {
    switch (string.toLowerCase().trim()) {
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(string);
    }
}

function parseSettings(window, document, settings) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams) {
        if (typeof settings[key] === "number") {
            settings[key] = parseInt(value, 10);
        } else if (typeof settings[key] === "boolean") {
            settings[key] = stringToBoolean(value);
        } else {
            settings[key] = value;
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function assert(b, message) {
    if (b) {
        return;
    }
    console.error(message);
    throw message;
}

function pluralize(count, noun, suffix = "s") {
    return `${count} ${noun}${count !== 1 ? suffix : ""}`;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + {"187":"f7f79ac5a2ee884e8acf","218":"175883b168dbbc2d35b3","317":"b9efd7e80545da15fb58","420":"d899466169e1c7e9f8fb"}[chunkId] + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "mastermind:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			792: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmastermind"] = self["webpackChunkmastermind"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {

// EXTERNAL MODULE: ./src/helper.js
var src_helper = __webpack_require__(541);
;// ./src/install_as_app.js


function install(window, document) {
    const btnAdd = document.querySelector(".butInstall");
    let deferredPrompt;
    btnAdd.addEventListener("click", (e) => {
        e.preventDefault();
        (0,src_helper/* hideElem */.y9)(btnAdd);
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((resp) => {
            console.log(JSON.stringify(resp));
        });
    });

    window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent the mini-info bar from appearing.
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        (0,src_helper/* showElem */.fi)(btnAdd);
    });
    return btnAdd;
}

;// ./src/settings.js
/* harmony default export */ const settings = ({
    modes: ["net", "ai", "server"],
    mode: "ai",
    wsPort : 8088,
    color: "blue",
    size: 4,
    logger: true,
    repeat: false,
    min: 1,
    max: 6,
    maxMoves: 8,
    cheating: false
});

;// ./src/solver.js


function intersect_safe(a, b) {
    let ai=0, bi=0;
    const result = [];

    while ( ai < a.length && bi < b.length ) {
        if (a[ai] < b[bi] ) {
            ai++;
        } else if (a[ai] > b[bi] ) {
            bi++;
        } else /* they're equal */ {
            result.push(a[ai]);
            ai++;
            bi++;
        }
    }

    return result;
}

function numToDigits(num) {
    const arr = [];
    while (num > 0) {
        arr.push(num%10);
        num = Math.floor(num/10);
    }
    arr.reverse();
    return arr;
}

function commonArr(a, b) {
    let same = 0;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] == b[i]) {
            a.splice(i, 1);
            b.splice(i, 1);
            ++same;
            --i;
        }
    }
    a.sort();
    b.sort();
    const c = intersect_safe(a, b);

    const res = same * 10 + c.length;
    return res;
}

function common(arr, str) {
    const a = Array.from(arr).map((i) => parseInt(i, 10));
    const b = Array.from(str).map((i) => parseInt(i, 10));
    return commonArr(a, b);
}

;// ./src/engine.js


function init(secArr) {
    function testNum(num) {
        return commonArr(secArr.slice(), numToDigits(num));
    }

    function testStr(str) {
        return common(secArr, str);
    }

    function isWinNum(verdict) {
        return verdict === secArr.length * 10;
    }

    return {
        testNum,
        isWinNum,
        testStr
    };
}

function fromString(str) {
    return init(Array.from(str).map((i) => parseInt(i, 10)));
}

function fromNum(num) {
    return init(numToDigits(num));
}

/* harmony default export */ const engine = ({
    fromString,
    fromNum
});


;// ./src/alg/simple.js



function generateAllVariantsRec(pos, colors, index, rec, val) {
    if (index >= pos) {
        rec.add(val);
        return;
    }
    for (let i = 1; i <= colors; ++i) {
        generateAllVariantsRec(pos, colors, index + 1, rec, val*10 + i);
    }
}

function generateAllVariants(pos, colors) {
    const arr = new Set();
    generateAllVariantsRec(pos, colors, 0, arr, 0);
    return arr;
}

function genArray(pos, colors, filler) {
    const size = Math.floor(Math.pow(colors, pos));
    return new Array(size).fill(filler);
}

function simpleGuesser(pos, colors) {
    const initial_set = generateAllVariants(pos, colors);
    let rest = Array.from(initial_set);
    let totalCount = 0;
    let guessCount = 0;
    function learn(guess, verdict) {
        ++totalCount;
        const eng = engine.fromNum(guess);
        rest = rest.filter(el => eng.testNum(el) === verdict);
    }

    function init(initial) {
        for (const [guess, verdict] of initial) {
            learn(guess, verdict);
        }
    }

    function getRest() {
        return Array.from(rest);
    }


    const getInitialSet = () => initial_set;
    const getRestUnsafe = () => rest;

    const isLogicalMove = (numGuess) => rest.includes(numGuess);

    const tryGuessNum = () => {
        ++guessCount;
        return rest[0];
    };

    const getGuessCount = () => guessCount;
    const getTotalCount = () => totalCount;

    const isFirst = () => totalCount === 0;

    return {
        init,
        learn,
        tryGuessNum,
        getRest,
        getRestUnsafe,
        getInitialSet,
        isLogicalMove,
        getGuessCount,
        getTotalCount,
        isFirst
    };
}

/* harmony default export */ const simple = ({
    generateAllVariants,
    simpleGuesser,
    genArray
});

;// ./src/alg/random-util.js
const randomInteger = (min, max) => {
    const rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};

const randEl = (arr) => {
    const index = randomInteger(0, arr.length);
    return arr[index];
};

/* harmony default export */ const random_util = ({
    randomInteger,
    randEl
});

;// ./src/alg/knuth.js







// https://en.wikipedia.org/wiki/Mastermind_(board_game)#Five-guess_algorithm
function knuth_simple(pos, colors) {
    const helper = simple.simpleGuesser(pos, colors);
    const allPossibles = helper.getInitialSet();
    const learn = (guess, verdict) => {
        allPossibles.delete(guess);
        return helper.learn(guess, verdict);
    };
    const init = helper.init;
    const isFirst = helper.isFirst;
    const getRestUnsafe = helper.getRestUnsafe;

    const getFirstBest = (scores, possible_codes, knuth_codes_set) => {
        const minimum = Math.min(...scores);
        const guess_codes = [];
        for (const code of possible_codes) {
            if (scores[code] === minimum) {
                if (knuth_codes_set.has(code)) {
                    return code;
                }
                guess_codes.push(code);
            }
        }
        return guess_codes[0];
    };

    const MiniMax = (knuth_codes_set, possible_codes, calc_best_callback) => {
        const len = Math.floor(Math.pow(10, pos));
        const max_value = Math.floor(Math.pow(colors, pos)) + 1;
        const verdict_len = pos * 10 + 1;
        const scores = new Array(len).fill(max_value);
        for (const code of possible_codes) {
            const times_found = new Array(verdict_len).fill(0);
            const eng = engine.fromNum(code);
            for (const code_to_crack of knuth_codes_set) {
                const verdict = eng.testNum(code_to_crack);
                ++times_found[verdict];
            }
            const maximum = Math.max(...times_found);
            scores[code] = maximum;
        }
        return calc_best_callback(scores, possible_codes, knuth_codes_set);
    };

    const getCode = (calc_best_callback) => MiniMax(new Set(helper.getRestUnsafe()), allPossibles, calc_best_callback);

    const tryGuessNum = () => getCode(getFirstBest);

    return {
        init,
        learn,
        tryGuessNum,
        getRestUnsafe,
        isFirst,
        getCode,
    };
}

function fast() {
    const helper = knuth_simple(4, 6);
    const learn = helper.learn;
    const init = helper.init;

    const tryGuessNum = () => {
        if (helper.isFirst()) {
            return 1122;
        } else {
            return helper.tryGuessNum();
        }
    };

    return {
        init,
        learn,
        tryGuessNum
    };
}

function random(pos, colors) {
    const helper = knuth_simple(pos, colors);

    const learn = helper.learn;
    const init = helper.init;
    const isFirst = helper.isFirst;
    const getRestUnsafe = helper.getRestUnsafe;

    const getRandomBest = (scores, possible_codes, knuth_codes_set) => {
        const minimum = Math.min(...scores);
        const guess_codes = [];
        const best_codes = [];
        for (const code of possible_codes) {
            if (scores[code] === minimum) {
                if (knuth_codes_set.has(code)) {
                    best_codes.push(code);
                } else {
                    guess_codes.push(code);
                }

            }
        }
        if (best_codes.length > 0) {
            return random_util.randEl(best_codes);
        }
        return random_util.randEl(guess_codes);
    };

    const tryGuessNum = () => helper.getCode(getRandomBest);

    return {
        init,
        learn,
        tryGuessNum,
        getRestUnsafe,
        isFirst
    };
}

function random_fast() {
    const helper = random(4, 6);
    const learn = helper.learn;
    const init = helper.init;

    const twoColors = helper.getRestUnsafe().filter(el => {
        const a = numToDigits(el);
        a.sort();
        return a[0] === a[1] && a[1] !== a[2] && a[2] === a[3];
    });

    const tryGuessNum = () => {
        if (helper.isFirst()) {
            return random_util.randEl(twoColors);
        } else {
            return helper.tryGuessNum();
        }
    };

    return {
        init,
        learn,
        tryGuessNum
    };
}

/* harmony default export */ const knuth = ({
    simple: knuth_simple,
    fast,
    random,
    random_fast
});

;// ./src/game.js
 // jshint ;_;





function stub() {
}

let str = "";

function updateStr(inputArr) {
    str = "";
    for (const input of inputArr) {
        if (input.value) {
            str += input.value;
        } else {
            str += " ";
        }
    }
}

function validateVerdict(verdict, secret, lastGuess) {
    const res = common(secret, lastGuess);
    return verdict === res;
}

function validateInput(settings, str) {
    if (str.length !== settings.size) {
        return false;
    }
    for (const ch of str) {
        const digit = parseInt(ch, 10);
        if (isNaN(digit) || digit < settings.min || digit > settings.max) {
            return false;
        }
    }
    return true;
}

function validateInputCheckRepeat(settings, str) {
    if (str.length !== settings.size) {
        return false;
    }
    const unique = new Set();
    for (const ch of str) {
        const digit = parseInt(ch, 10);
        if (isNaN(digit) || digit < settings.min || digit > settings.max) {
            return false;
        }
        unique.add(digit);
    }
    return settings.repeat || unique.size === settings.size;
}

function focusNextIndex(curIndex, inputArr, settings) {
    // console.trace("focusNextIndex", curIndex);
    for (let i = 0; i < inputArr.length; ++i) {
        const index = (i + curIndex + 1) % inputArr.length;
        const digit = parseInt(inputArr[index].value, 10);
        // console.log("found next", digit);
        if (isNaN(digit) || digit < settings.min || digit > settings.max) {
            inputArr[index].value = "";
            inputArr[index].focus();
            return index;
        }
    }
}

function handleInput(window, inputArr, settings, callback, validator, isSending) {
    if (isSending) {
        console.log("handleInput1", isSending);
        // return;
    }

    let hasSymbol = false;

    function clear() {
        for (const input of inputArr) {
            input.value = "";
        }
        updateStr(inputArr);
    }

    window.onkeydown = (e) => {
        // console.log("down", e.key, curIndex);
        if (e.key === "Backspace") {
            const curIndex = parseInt(e.target.getAttribute("data-index"), 10); //Get the index of the current input
            if (isNaN(curIndex) || curIndex < 0) {
                return false;
            }
            hasSymbol = str[curIndex] && str[curIndex] !== " ";
            return true;
        }
        return true;
    };


    window.onkeyup = (e) => {
        const curIndex = parseInt(e.target.getAttribute("data-index"), 10); //Get the index of the current input
        console.log("up", e.key, curIndex);
        if (isNaN(curIndex) || curIndex < 0) {
            return false;
        }
        if (e.key === "Enter") {
            if (validator(settings, str)) {
                callback(str);
                // clear
                clear();
            }

            return false;
        }
        if (e.key === "Backspace") {
            let prev = curIndex - 1;
            if (hasSymbol || prev < 0) {
                prev = curIndex;
            }
            hasSymbol = false;

            inputArr[prev].value = "";
            inputArr[prev].focus();
            updateStr(inputArr);
            return false;
        }
        //If the input is not a number
        const value = inputArr[curIndex].value;
        // console.log("before update", str, inputArr[curIndex].value);
        if (value === "" || value < settings.min.toString() || value > settings.max.toString()) {
            inputArr[curIndex].value = "";
            // console.log("fast exit");
            updateStr(inputArr);
            return false;
        }
        updateStr(inputArr);
        // console.log("after update", str);
        if (!validator(settings, str)) {
            focusNextIndex(curIndex, inputArr, settings);
        } else {
            setTimeout(() => {
                if (validator(settings, str)) {
                    callback(str);
                    clear();
                }
            }, 200);
        }
    };
}

function initField(window, document, settings) {
    document.documentElement.style.setProperty("--field-size", settings.size);
    const inputBox = document.querySelector(".input-div");
    const cellItem = document.querySelector("#cell");
    for (let i = 0; i < settings.size; ++i) {
        const square = cellItem.content.cloneNode(true);
        const input = square.querySelector("input");
        input.dataset.index = i;
        inputBox.appendChild(square.firstElementChild);
    }
}


function game(window, document, settings) {
    const overlay = document.getElementsByClassName("overlay")[0];
    const close = document.getElementsByClassName("close")[0];
    const btnInstall = document.getElementsByClassName("install")[0];

    const listItem = document.querySelector("#result-row");
    const resultTable = document.querySelector(".result");

    const inputBox = document.querySelector(".input-div");
    let helper = null;
    if (settings.min === 1 && settings.max === 6 && settings.size === 4 && settings.cheating) {
        helper = knuth.fast();
    }
    initField(window, document, settings);

    const inputArr = inputBox.getElementsByTagName("input");

    let movesLeft = settings.maxMoves + 1; // plus one for initial setup
    let opponentMovesLeft = settings.maxMoves + 1;
    let opponentAlreadyWin = false;
    let meAlreadyWin = false;

    let lastTry = null;
    let lastGuess = null;
    let isSending = false;
    let secret;
    let myNumber;
    let score = 0;


    function onGameEnd(message1, message2) {
        const h2 = overlay.querySelector("h2");
        h2.textContent = message1;
        const content = overlay.querySelector(".content");
        content.textContent = message2;
        overlay.classList.add("show");
        btnInstall.classList.remove("hidden2");
        inputBox.classList.add("hidden");
        handlers["gameover"](score);
    }

    close.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.remove("show");
    }, false);

    function onWin(movesCount) {
        score += 1;
        onGameEnd("You win", "In " + (0,src_helper/* pluralize */.td)(movesCount, "move"));
    }

    function onLoose() {
        score -= 1;
        onGameEnd("You loose", "Secret was " + secret);
    }

    function onDraw(movesCount) {
        score += 0.5;
        onGameEnd("Draw", "In " + (0,src_helper/* pluralize */.td)(movesCount, "move"));
    }

    function disableSend() {
        isSending = true;
        for (const input of inputArr) {
            // input.value = "";
            input.disabled = true;
        }
    }

    function enableSend() {
        isSending = false;

        let clue = new Array(settings.size).fill(0);
        if (helper) {
            const num = helper.tryGuessNum();
            clue = numToDigits(num);
        }
        let ind = 0;
        for (const input of inputArr) {
            // input.value = "";
            input.disabled = false;
            if (clue[ind]) {
                input.placeholder = clue[ind];
            }
            ++ind;
        }
        inputArr[0].focus();
    }

    function tryEnableInputs() {
        if (opponentMovesLeft <= movesLeft) {
            enableSend();
        }
        // console.log(isSending);
    }

    const handlers = {
        "player": stub,
        "sendSecret": stub,
        "sendAnswer": stub,
        "gameover": stub
    };

    function on(name, f) {
        handlers[name] = f;
    }

    async function onMove(num) {
        disableSend();
        lastGuess = num;
        const li = listItem.content.cloneNode(true);
        const request = li.querySelector(".request");
        request.textContent = num;
        lastTry = resultTable.appendChild(li.firstElementChild);
        --movesLeft;
        const ans = await handlers["player"](num);
        if (helper) {
            helper.learn(num, ans);
        }
        // console.log(ans);
        tryEnableInputs();
    }

    async function setMyNumber(num) {
        disableSend();
        myNumber = num;
        --movesLeft;
        const ans = await handlers["sendSecret"](num);
        handleInput(window, inputArr, settings, onMove, validateInput, isSending);
        tryEnableInputs();
        return ans;
    }

    function checkWinner() {
        if (!meAlreadyWin && !opponentAlreadyWin) {
            if (movesLeft <= 0) {
                onLoose();
            }
            return;
        }
        const myMovesCount = settings.maxMoves - movesLeft;
        const opponentMovesCount = settings.maxMoves - opponentMovesLeft;

        if (meAlreadyWin && opponentAlreadyWin && myMovesCount === opponentMovesCount) {
            onDraw(myMovesCount);
            return;
        }

        if (meAlreadyWin && myMovesCount <= opponentMovesCount) {
            onWin(myMovesCount);
            return;
        }

        if (opponentAlreadyWin && opponentMovesCount <= myMovesCount) {
            onLoose();
            return;
        }
    }

    function takeResp(verdict) {
        if (secret) {
            const isOk = validateVerdict(verdict, secret, lastGuess);
            (0,src_helper/* assert */.vA)(settings.cheating || isOk, "Cheating detected");
        } else {
            (0,src_helper/* assert */.vA)(settings.cheating, "Cheating detected2");
        }
        if (lastTry) {
            const resp = lastTry.querySelector(".response");
            resp.textContent = String(verdict).padStart(2, "0");
        } else {
            (0,src_helper/* assert */.vA)(false, verdict);
        }
        if (verdict == settings.size*10) {
            meAlreadyWin = true;
        }
        checkWinner();
    }

    function tellSecret(s) {
        if (!settings.cheating) {
            (0,src_helper/* assert */.vA)(s, "Not valid secret");
            (0,src_helper/* assert */.vA)(!secret || secret == s, "Unable to change secret");
        }

        secret = s;
        console.log(secret);
        --opponentMovesLeft;
        tryEnableInputs();
    }

    if (settings.mode === "net") {
        handleInput(window, inputArr, settings, setMyNumber, validateInputCheckRepeat, isSending);
    }

    async function testSecret(num) {
        const res = common(myNumber, num);
        opponentAlreadyWin = ((res === settings.size*10) && (settings.mode !== "ai"));
        --opponentMovesLeft;
        await handlers["sendAnswer"](res);
        tryEnableInputs();
        checkWinner();
        return res;
    }

    const getScore = () => score;

    enableSend();

    return {
        on: on,
        takeResp: takeResp,
        tellSecret: tellSecret,
        testSecret: testSecret,
        setMyNumber: setMyNumber,
        getScore: getScore
    };
}

;// ./src/starter.js






function starter(window, document) {
    (0,src_helper/* parseSettings */.P$)(window, document, settings);

    if (settings.mode === "net") {
        Promise.all(/* import() */[__webpack_require__.e(420), __webpack_require__.e(317)]).then(__webpack_require__.bind(__webpack_require__, 317)).then(netMode => {
            netMode.default(window, document, settings, game);
        });
    } else if (settings.mode === "server" || settings.color === "black") {
        Promise.all(/* import() */[__webpack_require__.e(420), __webpack_require__.e(218)]).then(__webpack_require__.bind(__webpack_require__, 218)).then(serverMode => {
            settings.color = "black";
            serverMode.default(window, document, settings);
        });
    } else if (settings.mode === "ai") {
        __webpack_require__.e(/* import() */ 187).then(__webpack_require__.bind(__webpack_require__, 187)).then(ai => {
            ai.default(window, document, settings, game).then(g => {
                g.on("gameover", (score) => {
                    console.log("Score", score);
                    const btnAdd = document.querySelector(".butInstall");
                    btnAdd.classList.remove("hidden2");
                });
            });
        });
    } else {
        (0,src_helper/* assert */.vA)(false, "Unsupported mode");
    }
}

;// ./src/index.js






if (true) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
        install(window, document);
    }
}

starter(window, document);

})();

// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {
// extracted by mini-css-extract-plugin

})();

/******/ })()
;