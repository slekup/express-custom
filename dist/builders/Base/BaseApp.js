import express, { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import ExpressCustomError from '@utils/ExpressCustomError';
/**
 * The BaseApp class, used to build on top of an express app or router.
 */
export default class BaseApp {
    raw;
    ratelimit;
    middlewares;
    /**
     * Creates an instance of the BaseApp class.
     * Pass 'app' to create an express app, and 'router' for an express router.
     * @param type The type of the base app - 'app' or 'router'.
     */
    constructor(type = 'router') {
        if (type === 'app') {
            this.raw = express();
        }
        else {
            this.raw = Router();
        }
        this.middlewares = [];
    }
    /**
     * Sets the rate limit for the base app or router.
     * @param options The rate limit options provided by the express-rate-limit package.
     * @returns The BaseApp class.
     */
    setRateLimit(options) {
        if (this.ratelimit)
            throw new ExpressCustomError('Rate limit already set.');
        this.ratelimit = {
            statusCode: options.statusCode ?? 429,
            ...(typeof options.windowMs === 'number'
                ? { window: options.windowMs }
                : {}),
            ...(typeof options.max === 'number' ? { max: options.max } : {}),
        };
        // Use the express-rate-limit middleware.
        this.raw.use(rateLimit(options));
        return this;
    }
    /**
     * Adds a middleware to the route. Add it before adding the route.
     * @param middleware The middleware to add to the route.
     * @returns The BaseApp class.
     */
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
        this.raw.use(middleware);
        return this;
    }
}
//# sourceMappingURL=BaseApp.js.map