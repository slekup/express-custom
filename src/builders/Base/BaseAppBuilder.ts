import express, { Express, Router } from 'express';
import { Options, rateLimit } from 'express-rate-limit';

import { Middleware, RateLimit } from '@typings/core';

/**
 * Base app builder class.
 */
export default class BaseAppBuilder<T = 'router'> {
  public raw:
    | (T extends 'app' ? Express : never)
    | (T extends 'router' ? Router : never);
  protected ratelimit?: Partial<RateLimit>;
  protected middlewares: Middleware[];

  /**
   * Creates an instance of the base app builder class.
   * Router is the default type, so only pass 'app' to create an express app.
   * @param type The type of the builder.
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
   * Adds a router to the API.
   * @param options The options of the rate limit.
   * @param showInDocs Whether to show the rate limit in the docs.
   * @returns The API builder.
   */
  public setRateLimit(options: Partial<Options>, showInDocs?: boolean): this {
    if (this.ratelimit) throw new Error('Rate limit already set.');

    // If showInDocs is undefined, it will default to true.
    if (showInDocs || showInDocs === undefined)
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
   * @returns The router builder.
   */
  public addMiddleware(middleware: Middleware): this {
    this.middlewares.push(middleware);
    this.raw.use(middleware);
    return this;
  }
}
