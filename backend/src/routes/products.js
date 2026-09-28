import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../validators/requestValidation.js';
import { productRules } from '../validators/productValidators.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', requireAuth, productRules, validateRequest, createProduct);
router.put('/:id', requireAuth, productRules, validateRequest, updateProduct);
router.delete('/:id', requireAuth, deleteProduct);

export default router;
