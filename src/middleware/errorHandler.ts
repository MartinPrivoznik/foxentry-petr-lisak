import { BaseApiResponse } from '../controllers/dto/ApiResponse';
import NotFoundError from '../utils/exceptions/NotFoundError';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';

/**
 * Application global error handler.
 * Logs the error and sends a response based on error type
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<BaseApiResponse>,
  next: NextFunction
) => {
  logger.error(err.message);

  if (err instanceof NotFoundError) {
    res.status(404).json({ success: false, message: err.message });
  }

  res.status(500).json({ success: false, message: 'Internal server error' });
  next();
};
