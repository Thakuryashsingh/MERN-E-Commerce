import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createAccessToken, createRefreshToken, readRefreshToken } from '../utils/auth.util.js';

const safeUser = user => ({ _id: user._id, name: user.name, email: user.email });

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (await User.exists({ email })) return res.status(409).json({ message: 'An account with this email already exists' });
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
  res.status(201).json({ message: 'Account created. You can now log in.', user: safeUser(user) });
}

export async function login(req, res) {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(401).json({ message: 'Email or password is incorrect' });
  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);
  res.json({ message: 'Logged in', accessToken, refreshToken, user: safeUser(user) });
}

export async function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token is required' });

  let payload;
  try {
    payload = readRefreshToken(refreshToken);
  } catch {
    return res.status(401).json({ message: 'Refresh token is invalid or expired' });
  }

  const user = await User.findById(payload.id);
  if (!user) return res.status(401).json({ message: 'User no longer exists' });

  res.json({ accessToken: createAccessToken(user._id) });
}

export async function getCurrentUser(req, res) {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: 'User no longer exists' });
  res.json({ user: safeUser(user) });
}
