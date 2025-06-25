"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
function handler(_, res) {
    res.setHeader('Set-Cookie', `refresh_token=; Path=/; HttpOnly; Max-Age=0`);
    res.status(200).json({ message: 'Logged out' });
}
