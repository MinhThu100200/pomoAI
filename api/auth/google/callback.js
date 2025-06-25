"use strict";
// File: api/auth/google/callback.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const axios_1 = __importDefault(require("axios"));
const firebase_1 = require("../../../lib/firebase"); // Firebase Admin SDK đã setup
async function handler(req) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const redirect_uri = 'https://pomoai.vercel.app/api/auth/google/callback';
    if (!code) {
        return new Response('Missing code', { status: 400 });
    }
    // Step 1: Exchange code for tokens
    const tokenRes = await axios_1.default.post('https://oauth2.googleapis.com/token', new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri,
        grant_type: 'authorization_code',
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const tokenData = tokenRes.data;
    const id_token = tokenData.id_token;
    if (!id_token) {
        return new Response('Failed to exchange code for token', { status: 400 });
    }
    // Step 2: Decode id_token to get user info
    const decoded = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());
    const { email, name, picture, sub } = decoded;
    // Step 3: Create or get Firebase user
    let user;
    try {
        user = await firebase_1.auth.getUserByEmail(email);
    }
    catch {
        user = await firebase_1.auth.createUser({
            uid: sub,
            email,
            displayName: name,
            photoURL: picture,
        });
    }
    // Step 4: Create Firebase Custom Token
    const firebaseToken = await firebase_1.auth.createCustomToken(user.uid);
    // Step 5: Redirect back to mobile app via deep link
    const appUrl = `pomoai://login?token=${firebaseToken}`;
    return Response.redirect(appUrl, 302);
}
