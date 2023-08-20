import { Request, Response } from 'express';

import { logger } from '..';

/**
 * Middleware to handle 404 errors.
 * @param __ The response object.
 * @param res The response object.
 */
function notFound(__: Request, res: Response): void {
  res.status(404).json({
    status: 404,
    message: 'The server cannot find the requested resource',
  });
}

interface HttpError extends Error {
  status: number;
  field?: string;
}

/**
 * Middleware to handle errors.
 * @param err The error object.
 * @param __ The request object.
 * @param res The response object.
 */
function errorHandler(err: HttpError, __: Request, res: Response): void {
  logger.error(err.message);

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    // stack: err.stack,
    field: err.field,
  });
}

export default {
  notFound,
  errorHandler,
};
