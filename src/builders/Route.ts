import { PathString } from '@typings/core';
import { ExportedRoute } from '@typings/exports';
import { ExpressCustomError } from '@utils/index';
import BaseApp from './Base/BaseApp';
import Endpoint from './Endpoint';
import Schema from './Schema';

/**
 * The Route class, used to create a route with endpoints.
 */
export default class Route extends BaseApp<'router'> {
  private path: PathString;
  private name: string;
  private description: string;
  private endpoints: Endpoint[] = [];

  /**
   * Creates a new instance of the Route class.
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
      })
      .addString({
        name: 'description',
        required: true,
        min: 1,
        max: 1000,
      });

    // Test the the constructor against the schema.
    constructorSchema.validate({ name, description, path }).then((result) => {
      if (typeof result === 'string')
        throw new ExpressCustomError(`Route (${name || path}): ${result}`);
    });

    // Assign the options to the instance.
    this.path = path;
    this.name = name;
    this.description = description;
  }

  /**
   * Adds an endpoint to the route.
   * @param endpoint An instance of the Endpoint class.
   * @returns The current Route instance.
   */
  public addEndpoint(endpoint: Endpoint): this {
    // Add the endpoint to the route.
    this.endpoints.push(endpoint);

    // Replace multiple slashes with a single slash.
    const doubleSlashRegex = /\/+/g;

    // Create the url for the endpoint.
    const url: string = `${this.path}${endpoint.path}`.replaceAll(
      doubleSlashRegex,
      '/'
    );

    // Add the endpoint to the router.
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
        throw new ExpressCustomError(
          `Invalid method ${String(endpoint.method)}`
        );
    }

    return this;
  }

  /**
   * Adds all endpoints from an endpoint file to the route.
   * @param endpointFile The endpoint file to add endpoints from.
   * @returns The current Route instance.
   */
  public addEndpointFile(endpointFile: Record<string, Endpoint>): this {
    for (const value of Object.values(endpointFile)) {
      this.addEndpoint(value);
    }

    return this;
  }

  /**
   * Validates the current Route instance.
   * @throws Throws an error if the route is invalid.
   */
  public validate(): void {
    // If the route has no endpoints
    if (this.endpoints.length === 0)
      throw new ExpressCustomError(`Route ${this.name} has no endpoints`);
  }

  /**
   * Exports the route to a JSON object.
   * @returns The exported route as a JSON object.
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
