// src/middlewares/validation.middleware.ts

import type{ Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod'; // Assuming Zod for validation
import { CustomError } from '../utils/errors.utils.ts';

export default (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    next(new CustomError(400, error.errors[0].message));
  }
};