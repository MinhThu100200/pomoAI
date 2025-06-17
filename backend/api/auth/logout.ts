import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_: VercelRequest, res: VercelResponse) {
  res.setHeader('Set-Cookie', `refresh_token=; Path=/; HttpOnly; Max-Age=0`);
  res.status(200).json({ message: 'Logged out' });
}
