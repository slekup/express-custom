import { Router } from 'express';

import { Middleware, PathType } from '@typings/core';
import EndpointBuilder, { ExportedEndpoint } from './EndpointBuilder';

export interface ExportedRoute {
  name: string;
  description: string;
  path: PathType;
  endpoints: ExportedEndpoint[];
}

/**
 * The route builder class.
 */
export default class RouteBuilder {
  public raw: Router = Router();
  private path: PathType;
  private name: string;
  private description: string;
  private endpoints: EndpointBuilder[] = [];
  private middlewares: Middleware[] = [];
  private afterwares: Middleware[] = [];

  /**
   * Creates a new route.
   * @param path The path of the route.
   */
  public constructor(path?: PathType) {
    this.path = path ?? '/';
    this.name = 'Unnamed route';
    this.description = 'No description provided.';
  }

  /**
   * Sets the path of the route.
   * @param name The name of the route.
   * @returns The route builder.
   */
  public setName(name: string): this {
    this.name = name;
    return this;
  }

  /**
   * Sets the description of the route.
   * @param description The description of the route.
   * @returns The route builder.
   */
  public setDescription(description: string): this {
    this.description = description;
    return this;
  }

  /**
   * Sets the path of the route.
   * @param path The path to set the router to.
   * @returns The router builder.
   */
  public setPath(path: `/${string}`): this {
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
   * Adds an endpoint to the route.
   * @param endpoint The endpoint to add to the route.
   * @returns The router builder.
   */
  public addEndpoint(endpoint: EndpointBuilder): this {
    this.endpoints.push(endpoint);

    const url: string = `${this.path}${endpoint.path}`.replace('//', '/');

    switch (endpoint.method) {
      case 'GET':
        this.raw.get(url, ...this.middlewares, endpoint.controller);
        break;
      case 'POST':
        this.raw.post(url, ...this.middlewares, endpoint.controller);
        break;
      case 'PUT':
        this.raw.put(url, ...this.middlewares, endpoint.controller);
        break;
      case 'PATCH':
        this.raw.patch(url, ...this.middlewares, endpoint.controller);
        break;
      case 'DELETE':
        this.raw.delete(url, ...this.middlewares, endpoint.controller);
        break;
      case 'OPTIONS':
        this.raw.options(url, ...this.middlewares, endpoint.controller);
        break;
      default:
        throw new Error(`Invalid method ${String(endpoint.method)}`);
    }

    return this;
  }

  /**
   * Adds all endpoints from an endpoint file to the route.
   * @param endpointFile The endpoint file to add endpoints from.
   * @returns The route builder.
   */
  public addEndpointFile(endpointFile: Record<string, EndpointBuilder>): this {
    for (const value of Object.values(endpointFile)) {
      this.addEndpoint(value);
    }

    return this;
  }

  /**
   * Gets the middlewares and afterwares of the route.
   * @returns The middlewares and afterwares of the route.
   */
  public access(): { middlewares: Middleware[]; afterwares: Middleware[] } {
    return {
      middlewares: this.middlewares,
      afterwares: this.afterwares,
    };
  }

  /**
   * Exports the route.
   * @returns The exported route.
   */
  public export(): ExportedRoute {
    return {
      name: this.name,
      description: this.description,
      path: this.path,
      endpoints: this.endpoints.map((endpoint) => endpoint.export()),
    };
  }
}
