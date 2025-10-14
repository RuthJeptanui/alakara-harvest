import type { Response } from 'express';


export const sendResponse = (
  res: Response,
  status: number,
  success: boolean,
  data: any = null,
  message: string | null = null,
  optionalMessage: string | null = null
) => {
  res.status(status).json({
    success,
    message: optionalMessage || message || '',
    data,
  });
};