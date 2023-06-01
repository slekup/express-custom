import colors from 'colors';
import { NextFunction, Request, Response } from 'express';

import { logger } from '..';

/**
 * Middleware to handle 404 errors.
 * @param req The request object.
 * @param res The response object.
 * @param next The next function.
 */
function notFound(req: Request, res: Response, next: NextFunction): void {
  res.status(404).json({
    status: 404,
    message: 'The server cannot find the requested resource',
  });
  logger.error(
    colors.red(`The route at ${req.originalUrl} was not found - ${req.method}`)
  );
  next();
}

interface HttpError extends Error {
  status: number;
  field?: string;
}

/**
 * Middleware to handle errors.
 * @param err The error object.
 * @param req The request object.
 * @param res The response object.
 */
function errorHandler(err: HttpError, req: Request, res: Response): void {
  logger.error(err);

  res.status(err.status || 500);

  res.json({
    error: {
      status: err.status || 500,
      message: 'Internal Server Error',
      // stack: err.stack,
      field: err.field,
    },
  });
}

export default {
  notFound,
  errorHandler,
};
