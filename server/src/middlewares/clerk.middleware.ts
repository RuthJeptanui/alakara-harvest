//import { ClerkExpressRequireAuth } from '@clerk/express';
import { requireAuth } from "@clerk/express";

import { Request, Response, NextFunction } from 'express';

// This is the main authentication middleware
// It will check for a valid JWT in the Authorization header
export const authMiddleware = requireAuth();

// You can also create a custom error handler
export const clerkErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ClerkExpressError') {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  next(err);
};