"use strict";(self.webpackChunkmastermind=self.webpackChunkmastermind||[]).push([[996],{996:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var s=n(34),r=n(293);const o={parser:function(e,t,n){const s=JSON.parse(e),r=s[s.method];return s.method===t&&n(r),r},toObjJson:function(e,t){const n={method:t};return n[t]=e,JSON.stringify(n)}};const c=function(e){return{player:async t=>e.testSecret(t),sendSecret:async t=>e.tellSecret(t),sendAnswer:async t=>e.takeResp(t)}};var a=n(363);function h(e,t,n,h){return new Promise(((l,i)=>{const m=(0,s.Z)(n),u=n.color,d=n.sh||e.location.href,f=t.getElementsByClassName("log")[0];m.on("error",(e=>{(0,a.cM)(n,e,f)})),m.on("socket_open",(()=>{const n=e.location.search,s=new URLSearchParams(n),o=new URL(d);o.search=s,o.searchParams.delete("wh"),o.searchParams.delete("sh"),o.searchParams.set("color",m.getOtherColor(u)),o.searchParams.set("currentMode","net");const c=(0,r.Z)(o.toString(),t.querySelector(".qrcode"));m.on("socket_close",(()=>{(0,a.ew)(c)}))}));try{m.connect(e.location.hostname)}catch(e){(0,a.cM)(n,e,f),i(e)}m.on("open",(()=>{const s=h(e,t,n),r=c(s);m.on("recv",(e=>{for(const[t,n]of Object.entries(r))o.parser(e,t,n)}));for(const[e,t]of Object.entries(r))s.on(e,(t=>m.sendMessage(o.toObjJson(t,e))));l(s)}))}))}}}]);