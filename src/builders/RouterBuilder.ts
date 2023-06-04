import { Router } from 'express';

import { Middleware, PathString, RateLimit } from '@typings/core';
import BaseAppBuilder from './Base/BaseAppBuilder';
import RouteBuilder, { ExportedRoute } from './RouteBuilder';
import SchemaBuilder from './SchemaBuilder';

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

    const constructorSchema = new SchemaBuilder()
      .addString((option) =>
        option
          .setName('path')
          .setRequired(true)
          .setMin(1)
          .setMax(100)
          .setTest('path')
      )
      .addString((option) =>
        option.setName('name').setRequired(true).setMin(1).setMax(50)
      );

    constructorSchema.validate({ path, name }).then((result) => {
      if (typeof result === 'string')
        throw new Error(`Router (${name || path}): ${result}`);
    });

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

  /**
   * Validates the router.
   */
  public validate(): void {
    if (!this.routes.length) throw new Error('No routes provided');

    this.routes.forEach((route) => route.validate());
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
}
