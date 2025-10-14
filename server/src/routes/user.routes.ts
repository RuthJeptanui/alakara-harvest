import { Router } from 'express';
import * as userController from '../controllers/user.controller.ts';
import authMiddleware from '../middlewares/auth.middleware.ts';
import validationMiddleware from '../middlewares/validation.middleware.ts';
import rateLimitMiddleware from '../middlewares/rateLimit.middleware.ts';
import { registerSchema, loginSchema, updateProfileSchema } from '..//interfaces/user.validation.ts';

const router = Router();

// Public routes
router.post('/register', validationMiddleware(registerSchema), rateLimitMiddleware, userController.register);
router.post('/login', validationMiddleware(loginSchema), rateLimitMiddleware, userController.login);
router.get('/verify-email/:token', userController.verifyEmail);
router.post('/resend-verification', rateLimitMiddleware, userController.resendVerificationEmail);

// Protected routes
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, validationMiddleware(updateProfileSchema), userController.updateProfile);
router.get('/users', authMiddleware, userController.getAllUsers);

export default router;