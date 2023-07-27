(()=>{"use strict";var e,t,n={363:(e,t,n)=>{function r(e){return document.querySelector(e)}function o(e){e&&e.classList.add("hidden")}function s(e){e&&e.classList.remove("hidden")}function i(e){e&&e.remove()}function a(e,t,n){e.logger&&(n.innerHTML+="object"==typeof t?(JSON&&JSON.stringify?JSON.stringify(t):t)+"<br />":t+"<br />")}function c(e){switch(e.toLowerCase().trim()){case"true":case"yes":case"1":return!0;case"false":case"no":case"0":case null:return!1;default:return Boolean(e)}}function u(e,t,n){const r=e.location.search,o=new URLSearchParams(r);for(const[e,t]of o)"number"==typeof n[e]?n[e]=parseInt(t,10):"boolean"==typeof n[e]?n[e]=c(t):n[e]=t}n.d(t,{Bk:()=>u,N8:()=>o,cM:()=>a,ew:()=>i,gw:()=>l,hu:()=>f,iA:()=>r,oX:()=>s});const l=e=>new Promise((t=>setTimeout(t,e)));function f(e,t){if(!e)throw t}}},r={};function o(e){var t=r[e];if(void 0!==t)return t.exports;var s=r[e]={exports:{}};return n[e](s,s.exports,o),s.exports}o.m=n,o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,n)=>(o.f[n](e,t),t)),[])),o.u=e=>e+"."+{567:"10c4016ad592b7009d63",746:"baebc620f33fc0f6c4b2",947:"597bbb50b0e94a71397f",996:"dc4745d1e53dbef480d9"}[e]+".js",o.miniCssF=e=>{},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="mastermind:",o.l=(n,r,s,i)=>{if(e[n])e[n].push(r);else{var a,c;if(void 0!==s)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var f=u[l];if(f.getAttribute("src")==n||f.getAttribute("data-webpack")==t+s){a=f;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.setAttribute("data-webpack",t+s),a.src=n),e[n]=[r];var d=(t,r)=>{a.onerror=a.onload=null,clearTimeout(m);var o=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(r))),t)return t(r)},m=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var r=n.length-1;r>-1&&!e;)e=n[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={179:0};o.f.j=(t,n)=>{var r=o.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var s=new Promise(((n,o)=>r=e[t]=[n,o]));n.push(r[2]=s);var i=o.p+o.u(t),a=new Error;o.l(i,(n=>{if(o.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var s=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",a.name="ChunkLoadError",a.type=s,a.request=i,r[1](a)}}),"chunk-"+t,t)}};var t=(t,n)=>{var r,s,[i,a,c]=n,u=0;if(i.some((t=>0!==e[t]))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(c)c(o)}for(t&&t(n);u<i.length;u++)s=i[u],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0},n=self.webpackChunkmastermind=self.webpackChunkmastermind||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),(()=>{const e={modes:["net","ai","server"],currentMode:"ai",wsPort:8088,color:"blue",size:4,logger:!0,repeat:!1,min:1,max:6,maxMoves:8,cheating:!1};var t=o(363);function n(e,t){let n=0;const r=Array.from(e).map((e=>parseInt(e,10))),o=Array.from(t).map((e=>parseInt(e,10)));for(let e=0;e<r.length;++e)r[e]==o[e]&&(r.splice(e,1),o.splice(e,1),++n,--e);r.sort(),o.sort();const s=function(e,t){let n=0,r=0;const o=[];for(;n<e.length&&r<t.length;)e[n]<t[r]?n++:(e[n]>t[r]||(o.push(e[n]),n++),r++);return o}(r,o);return 10*n+s.length}function r(){}let s="";function i(e,t){s="";for(let n=0;n<t;n++)s+=e[n].value}function a(e,t){if(t.length!=e.size)return!1;for(const n of t){const t=parseInt(n,10);if(isNaN(t)||t<e.min||t>e.max)return!1}return!0}function c(e,t,n,r){const o=t.getElementsByTagName("input"),c=(t.getElementsByClassName("log")[0],n.size);function u(){for(const e of o)e.value="";i(o,n.size),o[0].focus()}e.onkeyup=e=>{const t=parseInt(e.target.getAttribute("data-index"),10);if(isNaN(t))return!1;if("Enter"==e.key)return a(n,s)&&(r(s),s="",u()),!1;if("Backspace"==e.key){let e=t-1;return t===c-1&&s[t]&&(e=t),e>=0?(o[e].value="",o[e].focus()):o[0].focus(),i(o,c),!1}if(!(e.key>="1"&&e.key<="6"||229==e.keyCode))return o[t].value="",!1;i(o,c),a(n,s)?setTimeout((()=>{a(n,s)&&(r(s),s="",u())}),200):function(e,t,n){for(let r=0;r<t.length;++r){const o=(r+e+1)%t.length,s=parseInt(t[o].value,10);if(isNaN(s)||s<n.min||s>n.max)return t[o].value="",t[o].focus(),o}}(t,o,n)}}function u(e,o,s){const i=o.getElementsByClassName("overlay")[0],a=o.getElementsByClassName("close")[0],u=o.getElementsByClassName("install")[0],l=o.querySelector("#result-row"),f=o.querySelector(".result"),d=o.getElementsByTagName("input"),m=o.querySelector(".input-div");let p,h,g=s.maxMoves+1,v=s.maxMoves+1,y=!1,b=null,w=null,k=!1;function S(e,t){i.querySelector("h2").textContent=e;i.querySelector(".content").textContent=t,i.classList.add("show"),u.classList.remove("hidden2"),m.classList.add("hidden"),x.gameover()}function N(){S("You loose","Secret was "+p)}function C(){k=!0;for(const e of d)e.disabled=!0}function E(){v<=g&&function(){k=!1;for(const e of d)e.disabled=!1;d[0].focus()}()}a.addEventListener("click",(function(e){e.preventDefault(),i.classList.remove("show")}),!1);const x={player:r,sendSecret:r,sendAnswer:r,gameover:r};async function M(e){C(),w=e;const t=l.content.cloneNode(!0);t.querySelector(".request").textContent=e,b=f.appendChild(t.firstElementChild),--g;await x.player(e);E()}async function L(t){C(),h=t,--g;const n=await x.sendSecret(t);return c(e,o,s,M),E(),n}return"ai"===s.currentMode||"net"===s.currentMode&&c(e,o,s,L),{on:function(e,t){x[e]=t},takeResp:async function(e){if(p){const r=function(e,t,r){return e===n(t,r)}(e,p,w);(0,t.hu)(s.cheating||r,"Cheating detected")}else(0,t.hu)(s.cheating,"Cheating detected2");if(b){b.querySelector(".response").textContent=String(e).padStart(2,"0")}else(0,t.hu)(!1,e);e!=10*s.size?(y&&N(),g<=0&&N()):S(y?"Draw":"You win","In "+(s.maxMoves-g)+" moves")},tellSecret:function(e){s.cheating||((0,t.hu)(e,"Not valid secret"),(0,t.hu)(!p||p==e,"Unable to change secret")),p=e,--v,E()},testSecret:async function(e){const t=n(h,e);return y=t===10*s.size&&"ai"!==s.currentMode,--v,await x.sendAnswer(t),E(),t},setMyNumber:L}}"serviceWorker"in navigator&&(navigator.serviceWorker.register("./sw.js",{scope:"./"}),function(e,n){const r=(0,t.iA)(".butInstall");let o;r.addEventListener("click",(e=>{e.preventDefault(),(0,t.N8)(r),o.prompt(),o.userChoice.then((e=>{}))})),e.addEventListener("beforeinstallprompt",(e=>{e.preventDefault(),o=e,(0,t.oX)(r)}))}(window,document)),function(e,t,n){e(t,n)}((function(n,r){(0,t.Bk)(n,r,e),"net"===e.currentMode?Promise.all([o.e(567),o.e(996)]).then(o.bind(o,996)).then((t=>{t.default(n,r,e,u)})):"server"===e.currentMode||"black"==e.color?Promise.all([o.e(567),o.e(746)]).then(o.bind(o,746)).then((t=>{e.color="black",t.default(n,r,e)})):"ai"===e.currentMode?o.e(947).then(o.bind(o,947)).then((t=>{t.default(n,r,e,u)})):(0,t.hu)(!1,"Unsupported mode")}),window,document)})()})();