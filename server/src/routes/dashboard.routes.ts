import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controllers.ts';
import {  requireAuthMiddleware } from '../middlewares/clerk.middleware.ts';

const router = Router();

// Protect the dashboard route
router.get('/', requireAuthMiddleware, getDashboardData);

export default router;