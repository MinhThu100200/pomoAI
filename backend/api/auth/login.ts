import { VercelRequest, VercelResponse } from '@vercel/node';
import { createAccessToken, createRefreshToken } from '../../lib/jwt';
import { setCookie } from '../../lib/cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { email, password } = req.body;

  // authenticate user here...
  const user = { id: 'user123', email };

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  setCookie(res, 'refresh_token', refreshToken, {
    httpOnly: true,
    path: '/api/auth/refresh',
    maxAge: 60 * 60 * 24 * 7,
  });

  res.status(200).json({ accessToken });
}
