import express, { Express, Router } from 'express';
import { Options, rateLimit } from 'express-rate-limit';

import { Middleware, RateLimit } from '@typings/core';
import PackageError from '@utils/PackageError';

/**
 * The BaseApp class, used to build on top of an express app or router.
 */
export default class BaseApp<T extends 'router' | 'app'> {
  public raw:
    | (T extends 'app' ? Express : never)
    | (T extends 'router' ? Router : never);
  protected ratelimit?: Partial<RateLimit>;
  protected middlewares: Middleware[];

  /**
   * Creates an instance of the BaseApp class.
   * Pass 'app' to create an express app, and 'router' for an express router.
   * @param type The type of the base app - 'app' or 'router'.
   */
  public constructor(type: T = 'router' as T) {
    if (type === 'app') {
      this.raw = express() as T extends 'app' ? Express : never;
    } else {
      this.raw = Router() as T extends 'router' ? Router : never;
    }
    this.middlewares = [];
  }

  /**
   * Sets the rate limit for the base app or router.
   * @param options The rate limit options provided by the express-rate-limit package.
   * @returns The BaseApp class.
   */
  public setRateLimit(options: Partial<Options>): this {
    if (this.ratelimit) throw new PackageError('Rate limit already set.');

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
  public addMiddleware(middleware: Middleware): this {
    this.middlewares.push(middleware);
    this.raw.use(middleware);
    return this;
  }
}
