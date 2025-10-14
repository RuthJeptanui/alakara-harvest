// src/middlewares/error.middleware.ts

import type { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/errors.utils';
import logger from '../utils/logger.utils';


export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    logger.error(`${err.status}: ${err.message}`);
    return res.status(err.status).json({ error: err.message });
  }

  logger.error(`500: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
};