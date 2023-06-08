"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initController = void 0;
const __1 = require("..");
/**
 * Wraps a handler function in error handling.
 * @param controller The handler function.
 * @returns The handler function wrapped in error handling.
 */
function initController(controller) {
    return (req, res) => {
        (async () => {
            try {
                await controller(req, res);
            }
            catch (error) {
                __1.logger.error(error);
                res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        })();
    };
}
exports.initController = initController;
