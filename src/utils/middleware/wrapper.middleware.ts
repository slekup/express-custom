import { NextFunction, Request, Response } from 'express';
import { ClientSession, startSession } from 'mongoose';

import { logger } from '@utils/index';

type ControllerType = (
  req: Request,
  res: Response,
  session: ClientSession
) => Promise<unknown> | unknown;

/**
 * Handles a function.
 * @param controller The handler function.
 * @param req The request.
 * @param res The response.
 * @param next The next function.
 */
const handledFunction = async (
  controller: ControllerType,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const session = await startSession();

  try {
    session.startTransaction();
    await controller(req, res, session);
    await session.commitTransaction();
    next();
  } catch (error) {
    await session.abortTransaction();
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    session.endSession();
  }
};

/**
 * Wraps a handler function in error handling.
 * @param controller The handler function.
 * @returns The handler function wrapped in error handling.
 */
export const withErrorHandling =
  (controller: ControllerType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    handledFunction(controller, req, res, next);
  };
