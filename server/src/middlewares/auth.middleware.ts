
import type { Request, Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { CustomError } from "../utils/errors.utils.ts";
import  type { IUser } from "../models/users.models.ts"
import usersModels from "../models/users.models.ts";




declare global {
    // Augmenting the Express Request interface to include user property
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}


export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next(new CustomError(401, 'No token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { _id: string };
    const user = await usersModels.findById(decoded._id).select('-passwordHash');
    if (!user) {
      throw new CustomError(401, 'Invalid token');
    }
    req.user = user;
    next();
  } catch (error) {
    next(new CustomError(401, 'Invalid token'));
  }
};