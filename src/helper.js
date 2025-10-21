"use strict";

export function hideElem(el) {
    if (el) {
        el.classList.add("hidden");
    }
}

export function showElem(el) {
    if (el) {
        el.classList.remove("hidden");
    }
}

export function removeElem(el) {
    if (el) {
        el.remove();
    }
}

export function log(settings, message, el) {
    if (settings.logger) {
        if (typeof message == "object") {
            el.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + "<br />";
        } else {
            el.innerHTML += message + "<br />";
        }
    }
    console.log(message);
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function assert(b, message) {
    if (b) {
        return;
    }
    console.error(message);
    throw message;
}

export function pluralize(count, noun, suffix = "s") {
    return `${count} ${noun}${count !== 1 ? suffix : ""}`;
}
