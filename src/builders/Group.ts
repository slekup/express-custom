import { Router } from 'express';

import { Middleware, PathString, RateLimit } from '@typings/core';
import { ExportedGroup } from '@typings/exports';
import { PackageError } from '@utils/index';
import BaseApp from './Base/BaseApp';
import RouteBuilder from './Route';
import SchemaBuilder from './Schema';

/**
 * The group builder class, used to build a group of routes.
 */
export default class GroupBuilder extends BaseApp<'router'> {
  private path: PathString;
  private name: string;
  private routes: RouteBuilder[];

  /**
   * Creates a new group builder.
   * @param params The group parameters.
   * @param params.path The path of the group.
   * @param params.name The name of the group.
   */
  public constructor({ path, name }: { path: PathString; name: string }) {
    super();

    const constructorSchema = new SchemaBuilder()
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

    constructorSchema.validate({ path, name }).then((result) => {
      if (typeof result === 'string')
        throw new PackageError(`Group (${name || path}): ${result}`);
    });

    this.path = path;
    this.name = name;
    this.routes = [];
  }

  /**
   * Uses a group.
   * @param route The group to use.
   * @returns The group builder.
   */
  public addRoute(route: RouteBuilder): this {
    this.routes.push(route);
    this.raw.use(this.path, route.raw);
    return this;
  }

  /**
   * Returns the group values.
   * @returns The group values.
   */
  public values(): Readonly<{
    raw: Router;
    ratelimit?: Partial<RateLimit>;
    path: PathString;
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
   * Validates the group.
   */
  public validate(): void {
    if (!this.routes.length) throw new PackageError('No routes provided');

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
