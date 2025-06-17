import { serialize } from 'cookie';

export function setCookie(res: any, name: string, value: string, options = {}) {
  const cookie = serialize(name, value, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    ...options,
  });
  res.setHeader('Set-Cookie', cookie);
}
