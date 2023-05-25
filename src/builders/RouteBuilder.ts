import { NextFunction, Request, Response, Router } from 'express';

import EndpointBuilder from './EndpointBuilder';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

/**
 * The route builder class.
 */
export default class RouteBuilder {
  public raw: Router = Router();
  private route: `/${string}`;
  private name: string;
  private description: string;
  private endpoints: EndpointBuilder[] = [];
  private middlewares: Middleware[] = [];

  /**
   * Creates a new route builder.
   */
  public constructor() {
    // this.raw = Router();
    this.route = '/';
    this.name = 'Unnamed route';
    this.description = 'No description provided.';
    this.endpoints = [];
  }

  /**
   * Sets the name of the route.
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
   * Builds the route.
   * @param route The route to set.
   * @returns The route builder.
   */
  public setRoute(route: `/${string}`): this {
    this.route = route;
    return this;
  }

  /**
   * Adds a middleware to the route.
   * @param middleware The middleware to add to the route.
   * @returns The route builder.
   */
  public addMiddleware(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  /**
   * Adds an endpoint to the route.
   * @param endpoint The endpoint to add to the route.
   * @returns The route builder.
   */
  public addEndpoint(endpoint: EndpointBuilder): this {
    this.endpoints.push(endpoint);

    const url: string = `${this.route}${endpoint.url}`.replace('//', '/');

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
   * Uses a router.
   * @param route The route to use.
   * @param router The router to use.
   * @returns The route builder.
   */
  public use(route: string, router: RouteBuilder): this {
    if (!route) return this;
    // Replace multiple slashes with a single slash.
    const doubleSlashRegex = /\/+/g;
    // Use the router.
    this.raw.use(route.replace(doubleSlashRegex, '/'), router.raw);
    return this;
  }
}
