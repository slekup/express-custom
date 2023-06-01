import { Router } from 'express';

import { PathString } from '@typings/core';
import BaseAppBuilder from './Base/BaseAppBuilder';
import EndpointBuilder, { ExportedEndpoint } from './EndpointBuilder';

export interface ExportedRoute {
  name: string;
  description: string;
  path: PathString;
  endpoints: ExportedEndpoint[];
}

/**
 * The route builder class.
 */
export default class RouteBuilder extends BaseAppBuilder {
  public raw: Router = Router();
  private path: PathString;
  private name: string;
  private description: string;
  private endpoints: EndpointBuilder[] = [];

  /**
   * Creates a new route.
   * @param options The options for the route.
   * @param options.path The path of the route.
   * @param options.name The name of the route.
   * @param options.description The description of the route.
   */
  public constructor({
    name,
    description,
    path,
  }: {
    name: string;
    description: string;
    path: PathString;
  }) {
    super();
    this.path = path;
    this.name = name;
    this.description = description;
  }

  /**
   * Adds an endpoint to the route.
   * @param endpoint The endpoint to add to the route.
   * @returns The router builder.
   */
  public addEndpoint(endpoint: EndpointBuilder): this {
    this.endpoints.push(endpoint);

    // Replace multiple slashes with a single slash.
    const doubleSlashRegex = /\/+/g;

    const url: string = `${this.path}${endpoint.path}`.replaceAll(
      doubleSlashRegex,
      '/'
    );

    switch (endpoint.method) {
      case 'GET':
        this.raw.get(url, endpoint.controller);
        break;
      case 'POST':
        this.raw.post(url, endpoint.controller);
        break;
      case 'PUT':
        this.raw.put(url, endpoint.controller);
        break;
      case 'PATCH':
        this.raw.patch(url, endpoint.controller);
        break;
      case 'DELETE':
        this.raw.delete(url, endpoint.controller);
        break;
      case 'OPTIONS':
        this.raw.options(url, endpoint.controller);
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
   * Exports the route.
   * @returns The exported route.
   */
  public export(): Readonly<ExportedRoute> {
    return {
      name: this.name,
      description: this.description,
      path: this.path,
      endpoints: this.endpoints.map((endpoint) => endpoint.export()),
    };
  }
}
