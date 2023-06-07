import { NextFunction, Request, Response } from 'express';

import { logger } from '@utils/index';

type ControllerType = (
  req: Request,
  res: Response
) => Promise<unknown> | unknown;

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
export function initController(
  controller: ControllerType
): ErrorHandlingReturnType {
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
