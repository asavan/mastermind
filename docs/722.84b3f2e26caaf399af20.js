"use strict";(self.webpackChunkmastermind=self.webpackChunkmastermind||[]).push([[722],{722:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var s=n(34),r=n(293);const o=function(e){return{player:async t=>e.testSecret(t),sendSecret:async t=>e.tellSecret(t),sendAnswer:async t=>e.takeResp(t)}};var c=n(363);function a(e,t){const n={method:t};return n[t]=e,JSON.stringify(n)}function h(e,t,n,h){return new Promise(((l,i)=>{const m=(0,s.Z)(n,e.location),d=n.color,u=n.sh||e.location.href,f=t.getElementsByClassName("log")[0];m.on("error",(e=>{(0,c.cM)(n,e,f)})),m.on("socket_open",(()=>{const n=e.location.search,s=new URLSearchParams(n),o=new URL(u);o.search=s,o.searchParams.delete("wh"),o.searchParams.delete("sh"),o.searchParams.set("color",m.getOtherColor(d)),o.searchParams.set("currentMode","net");const a=(0,r.Z)(o.toString(),t.querySelector(".qrcode"));m.on("socket_close",(()=>{(0,c.ew)(a)}))})),m.on("open",(()=>{const s=h(e,t,n),r=o(s);m.on("recv",(e=>{const t=JSON.parse(e),n=t[t.method],s=r[t.method];"function"==typeof s&&s(n)}));for(const[e,t]of Object.entries(r))s.on(e,(t=>m.sendMessage(a(t,e))));l(s)}));try{m.connect()}catch(e){(0,c.cM)(n,e,f),i(e)}}))}}}]);