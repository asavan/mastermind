"use strict";

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
