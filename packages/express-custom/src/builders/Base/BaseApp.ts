import express, { Express, Router } from 'express';
import { Options, rateLimit } from 'express-rate-limit';

import { Middleware, PathString, RateLimit } from '@typings/core';
import ExpressCustomError from '@utils/ExpressCustomError';
import Schema from '../Schema';

interface BaseAppOptions extends Record<string, unknown> {
  path?: PathString | undefined;
}

/**
 * The BaseApp class, used to build on top of an express app or router.
 */
export default class BaseApp<T extends 'router' | 'app'> {
  public raw:
    | (T extends 'app' ? Express : never)
    | (T extends 'router' ? Router : never);
  protected path: PathString;
  protected ratelimit?: Partial<RateLimit>;
  private type: 'router' | 'app';

  /**
   * Creates an instance of the BaseApp class.
   * Pass 'app' to create an express app, and 'router' for an express router.
   * @param type The type of the base app - 'app' or 'router'.
   * @param options The options for the base app.
   */
  public constructor(type: 'router' | 'app', options: BaseAppOptions) {
    this.type = type;

    // The constructor schema.
    const constructorSchema = new Schema().addString({
      name: 'path',
      min: 1,
      max: 50,
    });

    // Validate the constructor against the schema.
    constructorSchema.validate(options).then((result) => {
      if (typeof result === 'string')
        throw new ExpressCustomError(`Base App: ${result}`);
    });

    if (options.path) this.path = options.path;
    else this.path = '/';

    this.raw =
      type === 'app'
        ? (express() as T extends 'app' ? Express : never)
        : (Router() as T extends 'router' ? Router : never);
  }

  /**
   * Sets the rate limit for the base app or router.
   * @param options The rate limit options provided by the express-rate-limit package.
   * @returns The BaseApp class.
   */
  public setRateLimit(options: Partial<Options>): this {
    if (this.ratelimit) throw new ExpressCustomError('Rate limit already set.');

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
    if (this.type === 'app') {
      (this.raw as T extends 'app' ? Express : never).use(
        this.path,
        middleware
      );
    } else {
      (this.raw as T extends 'router' ? Router : never).use(
        this.path,
        middleware
      );
    }

    return this;
  }
}
