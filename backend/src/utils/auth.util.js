import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

// The access token is sent with normal API requests and expires quickly.
export function createAccessToken(userId) {
  return jwt.sign({ id: userId.toString() }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  });
}

// The refresh token is used to get a new access token after it expires.
export function createRefreshToken(userId) {
  return jwt.sign({ id: userId.toString() }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  });
}

export function readAccessToken(token) {
  return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
}

export function readRefreshToken(token) {
  return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
}
