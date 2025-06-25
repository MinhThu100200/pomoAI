"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const withAuth_1 = require("../lib/withAuth");
async function handler(req, res, user) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed. Use POST." });
    }
    const prompt = req.body?.prompt;
    if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Missing or invalid prompt" });
    }
    try {
        const response = await axios_1.default.post("https://api.groq.com/openai/v1/chat/completions", {
            model: "llama3-8b-8192",
            messages: [
                { role: "system", content: "Bạn là một trợ lý AI thông minh. Trả lời mọi câu hỏi bằng tiếng Việt." },
                { role: "user", content: prompt },
            ],
        }, {
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
        });
        const text = response.data.choices?.[0]?.message?.content || "No response";
        res.status(200).json({ response: text });
    }
    catch (err) {
        console.error("Groq API error:", err?.response?.data || err.message);
        res.status(500).json({ error: "Groq API error" });
    }
}
exports.default = (0, withAuth_1.withAuth)(handler);
