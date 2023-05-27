import { Router } from 'express';

import { Middleware, PathType } from '@typings/core';
import logger from '@utils/logger';
import RouteBuilder, { ExportedRoute } from './RouteBuilder';

interface ExportedRouter {
  name: string;
  path: PathType;
  routes: ExportedRoute[];
}

/**
 * The router builder class.
 */
export default class RouterBuilder {
  public raw: Router = Router();
  private path: `/${string}`;
  private defaultCategory: string;
  private routes: RouteBuilder[] = [];
  private middlewares: Middleware[] = [];
  private afterwares: Middleware[] = [];

  /**
   * Creates a new router builder.
   */
  public constructor() {
    // this.raw = Router();
    this.path = '/';
    this.defaultCategory = 'No default category';
  }

  /**
   * Sets the default category of the route.
   * @param defaultCategory The default category of the route.
   * @returns The router builder.
   */
  public setDefaultCategory(defaultCategory: string): this {
    this.defaultCategory = defaultCategory;
    return this;
  }

  /**
   * Sets the path of the route.
   * @param path The path to set the router to.
   * @returns The router builder.
   */
  public setPath(path: PathType): this {
    this.path = path;
    return this;
  }

  /**
   * Adds a middleware to the route. Add it before adding the route.
   * @param middleware The middleware to add to the route.
   * @returns The router builder.
   */
  public addMiddleware(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  /**
   * Adds an afterware to the route. Add it before adding the route.
   * @param afterware The afterware to add to the route.
   * @returns The router builder.
   */
  public addAfterware(afterware: Middleware): this {
    this.afterwares.push(afterware);
    return this;
  }

  /**
   * Uses a router.
   * @param path The path to use.
   * @param route The router to use.
   * @returns The router builder.
   */
  public addRoute(path: string, route: RouteBuilder): this {
    if (!path) return this;

    this.routes.push(route);

    // Replace multiple slashes with a single slash.
    const doubleSlashRegex = /\/+/g;

    const routeAccess = route.access();

    // Use the router.
    this.raw.use(
      path.replace(doubleSlashRegex, '/'),
      ...routeAccess.middlewares,
      route.raw,
      ...routeAccess.afterwares
    );

    return this;
  }

  /**
   * Gets the express router.
   * @returns The express router.
   */
  public getRouter = (): Router => this.raw;

  /**
   * Exports the routes and endpoints data.
   * @returns The exported data.
   */
  public export(): ExportedRouter {
    return {
      name: this.defaultCategory,
      path: this.path,
      routes: this.routes.map((route) => route.export()),
    };
  }

  /**
   * Generates the site with next.js.
   * @returns The router builder.
   */
  public async generateSite(): Promise<this> {
    /* 
    - somewhere the nextjs website is defined, maybe /site
    - the export method exports the route data to a JSON file and copies it to the site folder
    - the export method cds into the folder and runs the nessesary commands to build the project
    - the site reads the json files and uses it to build the pages
    */

    logger.info('Generating site...');

    /**
     * Artificial await.
     * @returns The artificial await.
     */
    const artificialAwait = (): Promise<unknown> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 1000);
      });

    await artificialAwait();

    // logger.info('Site generated.');
    logger.error('Site generation has not been implemented yet.');

    return this;
  }
}
