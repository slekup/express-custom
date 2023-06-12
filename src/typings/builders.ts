import { NextFunction, Request, Response } from 'express';

export interface ControllerParams {
  req: Request;
  res: Response;
}

export type InternalController = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type UserController<T extends ControllerParams = ControllerParams> = (
  req: T['req'],
  res: T['res']
) => Promise<unknown> | unknown;
