import { logger } from '..';
/**
 * Wraps a handler function in error handling.
 * @param controller The handler function.
 * @returns The handler function wrapped in error handling.
 */
export function initController(controller) {
    return (req, res) => {
        (async () => {
            try {
                await controller(req, res);
            }
            catch (error) {
                logger.error(error);
                res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        })();
    };
}
//# sourceMappingURL=wrapper.middleware.js.map