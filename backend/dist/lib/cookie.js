"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = setCookie;
const cookie_1 = require("cookie");
function setCookie(res, name, value, options = {}) {
    const cookie = (0, cookie_1.serialize)(name, value, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        ...options,
    });
    res.setHeader('Set-Cookie', cookie);
}
