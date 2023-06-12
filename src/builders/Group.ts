import { Router } from 'express';

import { Middleware, PathString, RateLimit } from '@typings/core';
import { ExportedGroup } from '@typings/exports';
import { ExpressCustomError } from '@utils/index';
import BaseApp from './Base/BaseApp';
import Route from './Route';
import Schema from './Schema';

interface GroupOptions extends Record<string, unknown> {
  path: PathString;
  name: string;
  noRoutes?: boolean;
}

/**
 * The Group class, used to create a group of routes.
 */
export default class Group extends BaseApp<'router'> {
  private path: PathString;
  private name: string;
  private routes: Route[];
  private noRoutes: boolean;

  /**
   * Creates a new instance of the Group class.
   * @param options Options for the Group instance.
   * @param options.path The path of the group.
   * @param options.name The name of the group.
   * @param options.noRoutes Whether or not the group has routes.
   */
  public constructor(options: GroupOptions) {
    super();

    // Create the schema for the constructor options.
    const constructorSchema = new Schema()
      .addString({
        name: 'path',
        required: true,
        min: 1,
        max: 100,
        test: 'path',
      })
      .addString({
        name: 'name',
        required: true,
        min: 1,
        max: 50,
      });

    // Test the the constructor against the schema.
    constructorSchema.validate(options).then((result) => {
      if (typeof result === 'string')
        throw new ExpressCustomError(
          `Group (${options.name || options.path}): ${result}`
        );
    });

    // Assign the options to the instance.
    this.path = options.path;
    this.name = options.name;
    this.routes = [];
    this.noRoutes = options.noRoutes ?? false;
  }

  /**
   * Adds a route to the group.
   * @param route An instance of the Route class.
   * @returns The current Group instance.
   */
  public addRoute(route: Route): this {
    this.routes.push(route);
    this.raw.use(this.path, route.raw);
    return this;
  }

  /**
   * Returns the current group instance values.
   * @returns The current group instance values.
   */
  public values(): Readonly<{
    raw: Router;
    ratelimit?: Partial<RateLimit> | undefined;
    path: PathString;
    defaultCategory: string;
    routes: Route[];
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
   * Validates the group instance and all of its routes.
   * @throws Throws an error if the group instance is invalid.
   */
  public validate(): void {
    if (!this.noRoutes && !this.routes.length)
      throw new ExpressCustomError(
        `Group (${this.name || this.path}): No routes provided`
      );

    this.routes.forEach((route) => route.validate());
  }

  /**
   * Exports the routes and endpoints data.
   * @returns The exported data.
   */
  public export(): Readonly<ExportedGroup> {
    return {
      name: this.name,
      path: this.path,
      routes: this.routes.map((route) => route.export()),
    };
  }
}
