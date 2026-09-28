import { readAccessToken } from '../utils/auth.util.js';

export function requireAuth(req, res, next) {
  const header = req.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  let payload;
  try { payload = readAccessToken(token); }
  catch {
    return res.status(401).json({ message: 'Access token is invalid or expired' });
  }
  req.userId = payload.id;
  next();
}
