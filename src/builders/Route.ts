import { Router } from 'express';

import { PathString } from '@typings/core';
import { ExportedRoute } from '@typings/exports';
import { PackageError } from '@utils/index';
import BaseApp from './Base/BaseApp';
import EndpointBuilder from './Endpoint';
import SchemaBuilder from './Schema';

/**
 * The route builder class.
 */
export default class RouteBuilder extends BaseApp<'router'> {
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
    path,
    name,
    description,
  }: {
    path: PathString;
    name: string;
    description: string;
  }) {
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
      })
      .addString({
        name: 'description',
        required: true,
        min: 1,
        max: 1000,
      });

    constructorSchema.validate({ name, description, path }).then((result) => {
      if (typeof result === 'string')
        throw new PackageError(`Route (${name || path}): ${result}`);
    });

    this.path = path;
    this.name = name;
    this.description = description;
  }

  /**
   * Adds an endpoint to the route.
   * @param endpoint The endpoint to add to the route.
   * @returns The route builder.
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
        this.raw.get(url, endpoint.execute);
        break;
      case 'POST':
        this.raw.post(url, endpoint.execute);
        break;
      case 'PUT':
        this.raw.put(url, endpoint.execute);
        break;
      case 'PATCH':
        this.raw.patch(url, endpoint.execute);
        break;
      case 'DELETE':
        this.raw.delete(url, endpoint.execute);
        break;
      case 'OPTIONS':
        this.raw.options(url, endpoint.execute);
        break;
      default:
        throw new PackageError(`Invalid method ${String(endpoint.method)}`);
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
   * Validates the route.
   */
  public validate(): void {
    if (this.endpoints.length === 0)
      throw new PackageError(`Route ${this.name} has no endpoints`);

    this.endpoints.forEach((endpoint) => endpoint.validate());
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
