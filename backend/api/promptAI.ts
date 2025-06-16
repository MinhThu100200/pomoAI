import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Thêm CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Xử lý OPTIONS request (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  console.log("hiiiiiii be", req.body?.prompt, process.env.GROQ_API_KEY);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }
  console.log("hiiiiiii be", req.body?.prompt);
  const prompt = req.body?.prompt;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing or invalid prompt" });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "Bạn là một trợ lý AI thông minh. Trả lời mọi câu hỏi bằng tiếng Việt.",
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.choices?.[0]?.message?.content || "No response";
    res.status(200).json({ response: text });
  } catch (err: any) {
    console.error("Groq API error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Groq API error" });
  }
}
