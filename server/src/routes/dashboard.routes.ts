import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controllers.ts';
import { requireAuth } from '@clerk/express';
import { authMiddleware } from '../middlewares/clerk.middleware';

const router = Router();

// Protect the dashboard route
router.get('/dashboard', authMiddleware, getDashboardData);

export default router;