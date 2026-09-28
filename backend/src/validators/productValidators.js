import { body } from 'express-validator';

export const productRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }).withMessage('Name must be 120 characters or fewer'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 2000 }).withMessage('Description must be 2000 characters or fewer'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a number greater than or equal to 0').toFloat(),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a whole number greater than or equal to 0').toInt(),
  body('category').trim().notEmpty().withMessage('Category is required').isLength({ max: 80 }).withMessage('Category must be 80 characters or fewer'),
  body('image').optional({ values: 'falsy' }).isURL({ require_protocol: true }).withMessage('Image must be a valid URL')
];
