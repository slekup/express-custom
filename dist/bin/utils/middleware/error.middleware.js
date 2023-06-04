"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const __1 = require("..");
/**
 * Middleware to handle 404 errors.
 * @param req The request object.
 * @param res The response object.
 * @param next The next function.
 */
function notFound(req, res, next) {
    res.status(404).json({
        status: 404,
        message: 'The server cannot find the requested resource',
    });
    __1.logger.error(colors_1.default.red(`The route at ${req.originalUrl} was not found - ${req.method}`));
    next();
}
/**
 * Middleware to handle errors.
 * @param err The error object.
 * @param req The request object.
 * @param res The response object.
 */
function errorHandler(err, req, res) {
    __1.logger.error(err);
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: 'Internal Server Error',
            // stack: err.stack,
            field: err.field,
        },
    });
}
exports.default = {
    notFound,
    errorHandler,
};
