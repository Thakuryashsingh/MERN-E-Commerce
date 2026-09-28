import { body } from 'express-validator';

export const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }).withMessage('Name must be 80 characters or fewer'),
  body('email').trim().isEmail().withMessage('Enter a valid email').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

export const loginRules = [
  body('email').trim().isEmail().withMessage('Enter a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];
