import { NextFunction, Request, Response } from 'express';
type ControllerType = (req: Request, res: Response) => Promise<unknown> | unknown;
type ErrorHandlingReturnType = (req: Request, res: Response, next: NextFunction) => void;
/**
 * Wraps a handler function in error handling.
 * @param controller The handler function.
 * @returns The handler function wrapped in error handling.
 */
export declare function initController(controller: ControllerType): ErrorHandlingReturnType;
export {};
//# sourceMappingURL=wrapper.middleware.d.ts.map