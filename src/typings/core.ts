import { NextFunction, Request, Response } from 'express';

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type PathString = `/${string}`;

export interface RateLimit {
  statusCode: number;
  window: number;
  max: number;
}
