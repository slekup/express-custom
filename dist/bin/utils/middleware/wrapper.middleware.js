"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorHandling = void 0;
const mongoose_1 = require("mongoose");
const index_1 = require("@utils/index");
/**
 * Handles a function.
 * @param controller The handler function.
 * @param req The request.
 * @param res The response.
 * @param next The next function.
 */
const handledFunction = async (controller, req, res, next) => {
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        await controller(req, res, session);
        await session.commitTransaction();
        next();
    }
    catch (error) {
        await session.abortTransaction();
        index_1.logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        session.endSession();
    }
};
/**
 * Wraps a handler function in error handling.
 * @param controller The handler function.
 * @returns The handler function wrapped in error handling.
 */
const withErrorHandling = (controller) => (req, res, next) => {
    handledFunction(controller, req, res, next);
};
exports.withErrorHandling = withErrorHandling;
