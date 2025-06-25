"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const jwt_1 = require("../../lib/jwt");
async function handler(req, res) {
    const token = req.cookies['refresh_token'];
    if (!token)
        return res.status(401).json({ error: 'No token' });
    try {
        const user = (0, jwt_1.verifyRefreshToken)(token);
        const newAccessToken = (0, jwt_1.createAccessToken)({ id: user.id, email: user.email });
        res.json({ accessToken: newAccessToken });
    }
    catch {
        res.status(403).json({ error: 'Invalid token' });
    }
}
