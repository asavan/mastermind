(()=>{"use strict";const n="cache-only-1.0.2";function e(e){return caches.open(n).then((function(n){return n.match(e,{ignoreSearch:!0}).then((function(n){return n||Promise.reject("request-not-in-cache")}))}))}self.addEventListener("install",(function(e){e.waitUntil(function(){const e=[{'revision':null,'url':'567.01d65636c929db9df5b3.js'},{'revision':null,'url':'722.84b3f2e26caaf399af20.js'},{'revision':null,'url':'746.531cf12ba0115e816929.js'},{'revision':null,'url':'947.548cb5cc5c2e7817c6b7.js'},{'revision':'c9b2753f66091435d61dc6f71d10d65d','url':'images/icon.ico'},{'revision':'2b8184e2936d9891c47393c2b931c6e8','url':'images/icon.png'},{'revision':'d647503acf6735482c26b2ba32068507','url':'images/icon.svg'},{'revision':'e790cf4e4f55d27fb656e6a9232d0c8c','url':'images/icon192.png'},{'revision':'b6678f8d99d97634a450a89f295ac7ad','url':'images/icon512.png'},{'revision':'5bac78d16df1e8ed7ea82a23258b7ee9','url':'images/mastermind.svg'},{'revision':'c315b7be1b4e86271dc106b355755900','url':'images/reload.svg'},{'revision':null,'url':'main.8b82f0df2b6438d432c8.js'},{'revision':'7ed6b85fe6685380a089c83b87511e4c','url':'manifest.json'}].map((n=>n.url));return caches.open(n).then((function(n){return n.addAll(["./",...e])}))}().then((function(){return self.skipWaiting()})))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(e!==n)return caches.delete(e)})))})).then((function(){return self.clients.claim()})))})),self.addEventListener("fetch",(function(n){var t;n.respondWith((t=n.request,fetch(t).then((function(n){return n.ok?n:e(t)})).catch((function(){return e(t)}))))}))})();