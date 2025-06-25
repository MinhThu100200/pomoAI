"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const jwt_1 = require("../../lib/jwt");
const cookie_1 = require("../../lib/cookie");
async function handler(req, res) {
    const { email, password } = req.body;
    // authenticate user here...
    const user = { id: 'user123', email };
    const accessToken = (0, jwt_1.createAccessToken)(user);
    const refreshToken = (0, jwt_1.createRefreshToken)(user);
    (0, cookie_1.setCookie)(res, 'refresh_token', refreshToken, {
        httpOnly: true,
        path: '/api/auth/refresh',
        maxAge: 60 * 60 * 24 * 7,
    });
    res.status(200).json({ accessToken });
}
