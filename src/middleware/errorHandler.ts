import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';

/**
 * Application global error handler.
 * Logs the error and sends a response based on error type
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);

  //   if (err instanceof Error) {
  //   }

  res.status(500).json({ error: { message: 'Server side error occured' } });
  next();
};
