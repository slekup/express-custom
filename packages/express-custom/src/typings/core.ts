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

export type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PATCH'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'TRACE'
  | 'CONNECT';

type EndpointMessageType = 'INFO' | 'WARNING' | 'DANGER' | 'SUCCESS';

export interface EndpointNote {
  type: EndpointMessageType;
  text: string;
}

type StatusCode =
  | 200
  | 201
  | 204
  | 301
  | 400
  | 401
  | 403
  | 404
  | 405
  | 409
  | 500
  | 501;

export interface EndpointResponse {
  status: StatusCode;
  message: string;
  [key: string]: unknown;
}

export type StructureType = 'schema' | 'option';

export interface StructureField {
  name: string;
  description: string;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  structure?: string;
  option?: string;
}
