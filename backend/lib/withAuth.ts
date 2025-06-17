import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken"; // hoặc dùng Firebase Admin SDK nếu dùng Firebase

const SECRET = process.env.ACCESS_SECRET!;

export function withAuth(
  handler: (req: VercelRequest, res: VercelResponse, user: any) => Promise<void> | void | any
) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET);
      return handler(req, res, decoded);
    } catch (err) {
      console.error("Auth error:", err);
      return res.status(403).json({ error: "Invalid token" });
    }
  };
}
