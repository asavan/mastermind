"use strict";(self.webpackChunkmastermind=self.webpackChunkmastermind||[]).push([[218],{661:(e,n,t)=>{t.d(n,{A:()=>f});const o=["blue","red"];function c(e){}let s="",r="";const a={recv:c,open:c,socket_open:c,socket_close:c,close:c,error:c};function i(e,n,t){const o={from:s,to:r,action:e,data:n};return t.send(JSON.stringify(o))}function l(e){for(const n of o)if(e!==n)return n;return""}function d(e,n,t){const o=new WebSocket(e),d={onmessage:c,send:(e,n)=>i(e,n,o),close:()=>{a.error=c,o.close()}};return o.onopen=function(e){a.socket_open(),t||(s=n,r=l(n),i("connected",{color:s},o))},o.onclose=function(e){a.socket_close()},o.onmessage=function(e){if(e.data instanceof Blob){const n=new FileReader;n.onload=()=>{d.onmessage(n.result)},n.readAsText(e.data)}else d.onmessage(e.data)},o.onerror=function(e){a.error(function(e){const n={};for(const t in e)n[t]=e[t];return JSON.stringify(n,((e,n)=>n instanceof Node?"Node":n instanceof Window?"Window":n)," ")}(e))},d}const f=function(e,n){const t="server"===e.mode;let o=null,c=!1;function r(e,n){o=e,o.onmessage=function(e){a.recv(e.data)},o.onopen=function(){c=!0,n.send("close",{}),n.close(),a.open()},o.onclose=function(){c=!1},o.onerror=function(){}}return{connect:function(){const c=e.wh?e.wh:"https:"===n.protocol?null:"ws://"+n.hostname+":"+e.wsPort;if(null==c)throw"Can't determine ws address";const i=e.color,l=d(c,i,t);if(t)return void(l.onmessage=async function(e){const n=JSON.parse(e);n.from!==s&&await a.server_message(n)});const f=new RTCPeerConnection;f.onicecandidate=function(e){e&&l.send("candidate",e.candidate)},f.oniceconnectionstatechange=()=>{"failed"===f.iceConnectionState&&f.restartIce()};let u=!1;const g="red"===i;let m=!1,h=!1;f.onnegotiationneeded=async()=>{try{u=!0,await f.setLocalDescription(),l.send("description",f.localDescription)}catch(e){}finally{u=!1}},f.ondatachannel=e=>{(null==o||g)&&r(e.channel,l)},l.onmessage=async function(e){const n=JSON.parse(e);if(n.from!==s)if(t)a.server_message(n);else if("candidate"===n.action)f.addIceCandidate(n.data).catch((e=>{}));else if("description"===n.action){const e=n.data,t=!u&&("stable"==f.signalingState||h),o="offer"==e.type&&!t;if(m=!g&&o,m)return;h="answer"==e.type,await f.setRemoteDescription(e),h=!1,"offer"==e.type&&(await f.setLocalDescription(),l.send("description",f.localDescription))}else"connected"===n.action?r(f.createDataChannel("gamechannel"),l):n.action}},sendMessage:function(e){return!!o&&(!!c&&(o.send(e),c))},on:function(e,n){a[e]=n},getOtherColor:l}}},925:(e,n,t)=>{t.d(n,{Zk:()=>s,k6:()=>c});var o=t(420);function c(e){e&&e.remove()}function s(e,n,t="./images/mastermind.svg"){const c=new URL(e);var s,r;return function(e,n,t){const c=new o.hp(e,{level:"M",padding:3,image:{source:t,width:"15%",height:"15%",x:"center",y:"center"}});var s;return n.innerHTML=c.toString(),(s=n).addEventListener("click",(()=>s.classList.toggle("big"))),n}((s=c.toString(),r="/",s.charAt(s.length-r.length)===r?s.substr(0,s.length-r.length):s),n,t)}},218:(e,n,t)=>{t.r(n),t.d(n,{default:()=>i});var o=t(925),c=t(661);const s="black";function r(e,n){if(!e)return;const t=e.querySelector("path");t&&(t.style.fill=n)}function a(e,n,t,c,s){const a=s.createElement("div");a.classList.add("qrcode"),c.appendChild(a),e.searchParams.set("color",t),(0,o.Zk)(e.toString(),a),r(a,t),n[t]=a}function i(e,n,t){const i=(0,c.A)(t,e.location),l=t.sh||e.location.href,d={};{const e=new URL(l);e.searchParams.delete("mode");const t=n.querySelector(".qrcontainerserver");a(e,d,"blue",t,n),a(e,d,"red",t,n)}i.on("socket_open",(()=>{r(d.blue,"royalblue")})),i.on("server_message",(e=>{"connected"===e.action?r(d[e.from],s):"close"===e.action&&(0,o.k6)(d[e.from])}));try{i.connect()}catch(e){}}}}]);