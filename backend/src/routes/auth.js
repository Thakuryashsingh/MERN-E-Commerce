import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getCurrentUser, login, refreshAccessToken, register } from '../controllers/authController.js';
import { loginRules, registerRules } from '../validators/authValidators.js';
import { validateRequest } from '../validators/requestValidation.js';

const router = Router();

router.post('/register', registerRules, validateRequest, register);
router.post('/login', loginRules, validateRequest, login);
router.post('/refresh-token', refreshAccessToken);
router.get('/me', requireAuth, getCurrentUser);

export default router;
