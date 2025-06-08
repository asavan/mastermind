/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/* eslint-env serviceworker */

const version = "1.2.6";
const CACHE = "cache-only-" + version;

self.addEventListener("install", (evt) => {
    evt.waitUntil(precache().then(() => self.skipWaiting()));
});

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = [CACHE];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
};

const deleteAndClaim = async () => {
    await deleteOldCaches();
    await self.clients.claim();
};

self.addEventListener("activate", (event) => {
    event.waitUntil(deleteAndClaim());
});

self.addEventListener("fetch", (evt) => {
    evt.respondWith(networkOrCache(evt.request));
});

function networkOrCache(request) {
    return fetch(request).then((resp) => {
        if (resp.ok) {
            return resp;
        }
        console.log(resp.ok, resp);
        return fromCache(request);
    })
        .catch(() => fromCache(request));
}

async function fromCache(request) {
    const cache = await caches.open(CACHE);
    const matching = await cache.match(request, { ignoreSearch: true });
    if (matching) {
        return matching;
    }
    throw new Error("request-not-in-cache");
}

const filesToCache = [{'revision':null,'url':'187.f7f79ac5a2ee884e8acf.js'},{'revision':null,'url':'218.175883b168dbbc2d35b3.js'},{'revision':null,'url':'317.b9efd7e80545da15fb58.js'},{'revision':null,'url':'420.d899466169e1c7e9f8fb.js'},{'revision':'c9b2753f66091435d61dc6f71d10d65d','url':'images/icon.ico'},{'revision':'2b8184e2936d9891c47393c2b931c6e8','url':'images/icon.png'},{'revision':'d647503acf6735482c26b2ba32068507','url':'images/icon.svg'},{'revision':'e790cf4e4f55d27fb656e6a9232d0c8c','url':'images/icon192.png'},{'revision':'b6678f8d99d97634a450a89f295ac7ad','url':'images/icon512.png'},{'revision':'5bac78d16df1e8ed7ea82a23258b7ee9','url':'images/mastermind.svg'},{'revision':'c315b7be1b4e86271dc106b355755900','url':'images/reload.svg'},{'revision':null,'url':'main.f8d790627ade0acd9d32.js'},{'revision':'7ed6b85fe6685380a089c83b87511e4c','url':'manifest.json'}].map((e) => e.url);
async function precache() {
    const cache = await caches.open(CACHE);
    return await cache.addAll([
        "./",
        ...filesToCache
    ]);
}

/******/ })()
;