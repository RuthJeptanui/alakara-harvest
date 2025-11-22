import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controllers.ts';
import {  requireAuthMiddleware } from '../middlewares/clerk.middleware.ts';

const router = Router();

// These routes are protected. 
// The 'requireAuth' middleware will run first.
// If the user is not authenticated, it will return a 401.
// If they are, it will attach 'req.auth' and call the controller.

// GET /api/profile
router.get('/profile', requireAuthMiddleware, getProfile);

// PUT /api/profile
router.put('/profile', requireAuthMiddleware, updateProfile);

export default router;

// Remember to add this to your main app.ts/index.ts:
// import profileRoutes from './routes/profile.routes';
// import { clerkErrorHandler } from './middleware/clerk.middleware';
// ...
// app.use('/api', profileRoutes);
// app.use(clerkErrorHandler); // Add the error handler