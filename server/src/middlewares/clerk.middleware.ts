import express from "express";
import type { Request, Response, NextFunction } from "express";
import { requireAuth } from "@clerk/express";

// Main middleware: Protects routes using Clerk JWT
export const authMiddleware = requireAuth();

// Wrap requireAuth for your own use
export const requireAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return authMiddleware(req, res, next);
};

// Optional error handler
export const clerkErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ClerkExpressError") {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  next(err);
};
