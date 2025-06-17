import { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyRefreshToken, createAccessToken } from '../../lib/jwt';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.cookies['refresh_token'];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const user = verifyRefreshToken(token) as any;
    const newAccessToken = createAccessToken({ id: user.id, email: user.email });
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}
