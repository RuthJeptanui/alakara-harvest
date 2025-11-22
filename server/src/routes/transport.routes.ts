import { Router } from 'express';
import { createTransport, getTransports, getMyTransports, deleteTransport } from '../controllers/transport.controllers.ts';
import {  requireAuthMiddleware } from '../middlewares/clerk.middleware.ts';

const router = Router();

// Public-ish route (Authenticated users can see available transport)
router.get('/', requireAuthMiddleware, getTransports);

// Protected routes for managing listings
router.post('/', requireAuthMiddleware, createTransport);
router.get('/my', requireAuthMiddleware, getMyTransports);
router.delete('/:id', requireAuthMiddleware, deleteTransport);

export default router;