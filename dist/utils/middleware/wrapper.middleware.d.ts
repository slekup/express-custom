import { NextFunction, Request, Response } from 'express';
import { ClientSession } from 'mongoose';
type ControllerType = (req: Request, res: Response, session: ClientSession) => Promise<unknown> | unknown;
/**
 * Wraps a handler function in error handling.
 * @param controller The handler function.
 * @returns The handler function wrapped in error handling.
 */
export declare const withErrorHandling: (controller: ControllerType) => (req: Request, res: Response, next: NextFunction) => void;
export {};
