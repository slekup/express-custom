import { NextFunction, Request, Response } from 'express';
/**
 * Middleware to handle 404 errors.
 * @param __ The response object.
 * @param res The response object.
 * @param next The next function.
 */
declare function notFound(__: Request, res: Response, next: NextFunction): void;
interface HttpError extends Error {
    status: number;
    field?: string;
}
/**
 * Middleware to handle errors.
 * @param err The error object.
 * @param __ The request object.
 * @param res The response object.
 */
declare function errorHandler(err: HttpError, __: Request, res: Response): void;
declare const _default: {
    notFound: typeof notFound;
    errorHandler: typeof errorHandler;
};
export default _default;
//# sourceMappingURL=error.middleware.d.ts.map