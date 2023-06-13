import { NextFunction, Request, Response } from 'express';

import { InternalController, UserController } from '@typings/builders';
import {
  EndpointNote,
  EndpointResponse,
  PathString,
  RateLimit,
  RequestMethod,
} from '@typings/core';
import { ExportedEndpoint } from '@typings/exports';
import { ExpressCustomError } from '@utils/index';
import { withErrorHandling } from '@utils/middleware';
import Controller from './Controller';
import Schema from './Schema';

export interface EndpointOptions extends Record<string, unknown> {
  name: string;
  description: string;
  path: PathString;
  method: RequestMethod;
  controller?: UserController | Controller;
  notes?: EndpointNote[];
  paramSchema?: Schema;
  querySchema?: Schema;
  bodySchema?: Schema;
  responses?: EndpointResponse[];
  disabled?: boolean;
  errorResponse?: Record<string, unknown>;
}

/**
 * The Endpoint class, used to build an endpoint.
 */
export default class Endpoint {
  public disabled: boolean;
  public name: string;
  public description: string;
  public path: PathString;
  public method: RequestMethod;
  public notes: EndpointNote[];
  public paramSchema?: Schema;
  public querySchema?: Schema;
  public bodySchema?: Schema;
  public responses: EndpointResponse[];
  public controller?: InternalController;
  public ratelimit?: Partial<RateLimit>;
  public errorResponse: Record<string, unknown>;

  /**
   * Creates a new instance of the Endpoint class.
   * @param options The options for the endpoint.
   * @param options.name The name of the endpoint.
   * @param options.description The description of the endpoint.
   * @param options.path The path of the endpoint.
   * @param options.method The method of the endpoint.
   * @param options.controller The controller of the endpoint.
   * @param options.notes The notes of the endpoint.
   * @param options.paramSchema The schema to validate the client's request parameters against.
   * @param options.querySchema The schema to validate the client's request queries against.
   * @param options.bodySchema The schema to validate the client's request body against.
   * @param options.responses An array of responses for the endpoint.
   * @param options.disabled Whether the endpoint is temporarily disabled or not.
   */
  public constructor(options: EndpointOptions) {
    // Create the schema for the constructor options.
    const constructorSchema = new Schema()
      .addBoolean({
        name: 'disabled',
        required: false,
        defaultValue: false,
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
      })
      .addString({
        name: 'path',
        required: true,
        min: 1,
        max: 100,
        test: 'path',
      })
      .addString({
        name: 'method',
        required: true,
        min: 1,
        max: 100,
        options: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      })
      .addObject({
        name: 'errorResponse',
        required: false,
        properties: {},
      });

    // Test the options against the schema.
    constructorSchema.validate(options).then((result) => {
      if (typeof result === 'string')
        throw new ExpressCustomError(
          `Endpoint (${options.name || options.path}): ${result}`
        );
    });

    const errorResponse = options.errorResponse ?? {
      status: 500,
      message: 'Internal Server Error',
    };

    // Assign the options to the endpoint.
    this.disabled = options.disabled ?? false;
    this.name = options.name;
    this.description = options.description;
    this.path = options.path;
    this.method = options.method;
    if (options.controller) {
      // If the controller function is passed directly
      if (typeof options.controller === 'function')
        this.controller = withErrorHandling(options.controller, errorResponse);
      // If an instance of the Controller class is passed
      else if (options.controller instanceof Controller)
        this.controller = withErrorHandling(
          options.controller.callback,
          errorResponse
        );
    }
    this.notes = options.notes ?? [];
    if (options.paramSchema) this.paramSchema = options.paramSchema;
    if (options.querySchema) this.querySchema = options.querySchema;
    if (options.bodySchema) this.bodySchema = options.bodySchema;
    this.responses = options.responses ?? [];
    this.errorResponse = errorResponse;
  }

  /**
   * Sets the notes of the endpoint, for the documentation.
   * @param notes An array of note objects.
   * @returns The current Endpoint instance.
   */
  public setNotes(notes: EndpointNote[]): this {
    this.notes = notes;
    return this;
  }

  /**
   * Sets the schema to validate the client's request parameters against.
   * @param callback The callback function to build the schema.
   * @returns The current Endpont instance.
   */
  public setParamSchema(callback: (schema: Schema) => void): this {
    const schema = new Schema();
    callback(schema);
    this.paramSchema = schema;
    return this;
  }

  /**
   * Sets the schema to validate the client's request queries against.
   * @param callback The callback function to build the schema.
   * @returns The current Endpoint instance.
   */
  public setQuerySchema(callback: (schema: Schema) => void): this {
    const schema = new Schema();
    callback(schema);
    this.querySchema = schema;
    return this;
  }

  /**
   * Sets the schema to validate the client's request body against.
   * @param callback The callback function to build the schema.
   * @returns The current Endpoint instance.
   */
  public setBodySchema(callback: (schema: Schema) => void): this {
    const schema = new Schema();
    callback(schema);
    this.bodySchema = schema;
    return this;
  }

  /**
   * Sets the example responses of the endpoint, for the documentation.
   * @param responses An array of response objects.
   * @returns The current Endpoint instance.
   */
  public setResponses(responses: EndpointResponse[]): this {
    this.responses = responses;
    return this;
  }

  /**
   * Sets the controler for the endpoint.
   * @param controller The controlller function to run when the endpoint is called.
   * @returns The current Endpoint instance.
   */
  public setController<T = unknown>(
    controller: UserController<T> | Controller
  ): this {
    // If the controller function is passed directly
    if (typeof controller === 'function')
      this.controller = withErrorHandling(controller, this.errorResponse);
    // If an instance of the Controller class is passed
    else if (controller instanceof Controller)
      this.controller = withErrorHandling(
        controller.callback,
        this.errorResponse
      );
    return this;
  }

  /**
   * Validates the endpoint.
   * @throws An error if the endpoint is invalid.
   */
  public validate(): void {
    if (!this.controller)
      throw new ExpressCustomError(
        `Endpoint (${this.name || this.path}): Controller is not defined.`
      );
  }

  /**
   * Executes the endpoint controller function with error handling and validation.
   * @param req The express request object.
   * @param res The express response object.
   * @param next The express next function.
   */
  public execute = (req: Request, res: Response, next: NextFunction): void => {
    // Don't return, but run a self-executing async function to allow for async/await controller functions.
    (async () => {
      try {
        // Validate the request against the schemas.
        // If any of them fail, return because the response is handled by the validation function.
        if (
          this.paramSchema &&
          (await this.paramSchema.validateData(req.params, { res }))
        )
          return;
        if (
          this.querySchema &&
          (await this.querySchema.validateData(req.query, { res }))
        )
          return;
        if (
          this.bodySchema &&
          (await this.bodySchema.validateData(
            req.body as Record<string, unknown>,
            {
              res,
            }
          ))
        )
          return;

        // Run the controller function
        if (!this.controller)
          throw new ExpressCustomError(
            `Endpoint (${
              this.name || this.path
            }): no controller function was set.`
          );

        this.controller(req, res, next);
      } catch (error) {
        return next(error);
      }
    })();
  };

  /**
   * Exports the Endpoint instance properties to a JSON object.
   * @returns The exported endpoint as a JSON object.
   */
  public export(): Readonly<ExportedEndpoint> {
    return {
      name: this.name,
      description: this.description,
      path: this.path === '/' ? '' : this.path,
      method: this.method,
      notes: this.notes,
      params: this.paramSchema ? this.paramSchema.export() : {},
      queries: this.querySchema ? this.querySchema.export() : {},
      body: this.bodySchema ? this.bodySchema.export() : {},
      responses: this.responses,
    };
  }
}
