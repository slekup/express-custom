import { Express, Router } from 'express';
import { Options } from 'express-rate-limit';
import { Middleware, RateLimit } from '@typings/core';
/**
 * The BaseApp class, used to build on top of an express app or router.
 */
export default class BaseApp<T extends 'router' | 'app'> {
    raw: (T extends 'app' ? Express : never) | (T extends 'router' ? Router : never);
    protected ratelimit?: Partial<RateLimit>;
    protected middlewares: Middleware[];
    /**
     * Creates an instance of the BaseApp class.
     * Pass 'app' to create an express app, and 'router' for an express router.
     * @param type The type of the base app - 'app' or 'router'.
     */
    constructor(type?: T);
    /**
     * Sets the rate limit for the base app or router.
     * @param options The rate limit options provided by the express-rate-limit package.
     * @returns The BaseApp class.
     */
    setRateLimit(options: Partial<Options>): this;
    /**
     * Adds a middleware to the route. Add it before adding the route.
     * @param middleware The middleware to add to the route.
     * @returns The BaseApp class.
     */
    addMiddleware(middleware: Middleware): this;
}
//# sourceMappingURL=BaseApp.d.ts.map