"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuth = withAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // hoặc dùng Firebase Admin SDK nếu dùng Firebase
const SECRET = process.env.ACCESS_SECRET;
function withAuth(handler) {
    return async (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized: Missing token" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET);
            return handler(req, res, decoded);
        }
        catch (err) {
            console.error("Auth error:", err);
            return res.status(403).json({ error: "Invalid token" });
        }
    };
}
