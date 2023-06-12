import { NextFunction, Request, Response } from 'express';

interface CustomRequest<T> extends Omit<Request, 'params' | 'query' | 'body'> {
  params?: T extends { params: unknown } ? T['params'] : Request['params'];
  query?: T extends { query: unknown } ? T['query'] : Request['query'];
  body?: T extends { body: unknown } ? T['body'] : Request['body'];
}

export interface ControllerParams<T = unknown> {
  req: CustomRequest<T>;
  res: Response;
}

export type InternalController = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type UserController<T = unknown> = (
  req: ControllerParams<T>['req'] & T,
  res: Response
) => Promise<unknown> | unknown;
