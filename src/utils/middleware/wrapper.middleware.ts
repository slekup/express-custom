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
 * @returns The handler function wrapped in error handling.
 */
export default function withErrorHandling<
  T extends ControllerParams = ControllerParams
>(controller: UserController<T>): ErrorHandlingReturnType {
  return (req: Request, res: Response): void => {
    (async () => {
      try {
        await controller(req, res);
      } catch (error) {
        logger.error(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
      }
    })();
  };
}
