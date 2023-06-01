import { Router } from 'express';

import { Middleware, PathString, RateLimit } from '@typings/core';
import BaseAppBuilder from './Base/BaseAppBuilder';
import RouteBuilder, { ExportedRoute } from './RouteBuilder';

export interface ExportedRouter {
  name: string;
  path: PathString;
  routes: ExportedRoute[];
}

/**
 * The router builder class.
 */
export default class RouterBuilder extends BaseAppBuilder {
  private path: PathString;
  private name: string;
  private routes: RouteBuilder[];

  /**
   * Creates a new router builder.
   * @param params The router parameters.
   * @param params.path The path of the router.
   * @param params.name The name of the router.
   */
  public constructor({ path, name }: { path: PathString; name: string }) {
    super();
    this.path = path;
    this.name = name;
    this.routes = [];
  }

  /**
   * Uses a router.
   * @param route The router to use.
   * @returns The router builder.
   */
  public addRoute(route: RouteBuilder): this {
    this.routes.push(route);
    this.raw.use(this.path, route.raw);
    return this;
  }

  /**
   * Exports the routes and endpoints data.
   * @returns The exported data.
   */
  public export(): Readonly<ExportedRouter> {
    return {
      name: this.name,
      path: this.path,
      routes: this.routes.map((route) => route.export()),
    };
  }

  /**
   * Returns the router values.
   * @returns The router values.
   */
  public values(): Readonly<{
    raw: Router;
    ratelimit?: Partial<RateLimit>;
    path: `/${string}`;
    defaultCategory: string;
    routes: RouteBuilder[];
    middlewares: Middleware[];
  }> {
    return {
      raw: this.raw,
      ratelimit: this.ratelimit,
      path: this.path,
      defaultCategory: this.name,
      routes: this.routes,
      middlewares: this.middlewares,
    };
  }
}
