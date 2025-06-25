"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello from Vercel!' });
    }
    else if (req.method === 'POST') {
        const body = req.body;
        res.status(200).json({ received: body });
    }
    else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
