"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
/**
 * Middleware to handle 404 errors.
 * @param __ The response object.
 * @param res The response object.
 * @param next The next function.
 */
function notFound(__, res, next) {
    res.status(404).json({
        status: 404,
        message: 'The server cannot find the requested resource',
    });
    next();
}
/**
 * Middleware to handle errors.
 * @param err The error object.
 * @param __ The request object.
 * @param res The response object.
 */
function errorHandler(err, __, res) {
    __1.logger.error(err.message);
    res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        // stack: err.stack,
        field: err.field,
    });
}
exports.default = {
    notFound,
    errorHandler,
};
