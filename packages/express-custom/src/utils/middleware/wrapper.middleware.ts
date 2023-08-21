import { NextFunction, Request, Response } from 'express';

import { ControllerParams, UserController } from '@typings/builders';
import { logger } from '..';

type ErrorHandlingReturnType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

/**
 * Wraps a handler function in error handling.
 * @param controller The handler function.
 * @param errorResponse The response to send if an error occurs.
 * @returns The handler function wrapped in error handling.
 */
export default function withErrorHandling<T = unknown>(
  controller: UserController<T>,
  errorResponse: Record<string, unknown>
): ErrorHandlingReturnType {
  return (req: Request, res: Response): void => {
    (async () => {
      try {
        await controller(req as ControllerParams<T>['req'] & T, res);
      } catch (error) {
        logger.error(error);
        res.status(500).json(errorResponse);
      }
    })();
  };
}
