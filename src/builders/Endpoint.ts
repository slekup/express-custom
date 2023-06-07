import { NextFunction, Request, Response } from 'express';

import {
  ControllerType,
  EndpointNote,
  EndpointResponse,
  PathString,
  RateLimit,
  RequestMethod,
} from '@typings/core';
import { ExportedEndpoint } from '@typings/exports';
import { PackageError, logger } from '@utils/index';
import { initController } from '@utils/middleware/wrapper.middleware';
import SchemaBuilder from './Schema';

/**
 * The endpoint builder class.
 */
export default class EndpointBuilder {
  public disabled: boolean;
  public name: string;
  public description: string;
  public path: PathString;
  public method: RequestMethod;
  public notes: EndpointNote[];
  public paramSchema?: SchemaBuilder;
  public querySchema?: SchemaBuilder;
  public bodySchema?: SchemaBuilder;
  public responses: EndpointResponse[];
  public controller: (req: Request, res: Response, next: NextFunction) => void;
  public ratelimit?: Partial<RateLimit>;

  /**
   * Creates a new endpoint.
   * @param options The options for the endpoint.
   * @param options.name The name of the endpoint.
   * @param options.description The description of the endpoint.
   * @param options.path The path of the endpoint.
   * @param options.method The method of the endpoint.
   * @param options.controller The controller of the endpoint.
   * @param options.notes The notes of the endpoint.
   * @param options.responses The responses of the endpoint.
   * @param options.disabled The disabled state of the endpoint.
   */
  public constructor(options: {
    name: string;
    description: string;
    path: PathString;
    method: RequestMethod;
    controller: ControllerType;
    notes?: EndpointNote[];
    responses?: EndpointResponse[];
    disabled?: boolean;
  }) {
    this.disabled = options.disabled ?? false;
    this.name = options.name;
    this.description = options.description;
    this.path = options.path;
    this.method = options.method;
    this.controller = initController(options.controller);
    this.notes = options.notes ?? [];
    this.responses = options.responses ?? [];

    const constructorSchema = new SchemaBuilder()
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
      });

    constructorSchema.validate(options).then((result) => {
      if (typeof result === 'string')
        throw new PackageError(
          `Endpoint (${options.name || options.path}): ${result}`
        );
    });
  }

  /**
   * Sets the notes of the endpoint.
   * @param notes The notes of the endpoint.
   * @returns The endpoint builder.
   */
  public setNotes(notes: EndpointNote[]): this {
    this.notes = notes;
    return this;
  }

  /**
   * Sets the schema to validate the provided request parameters against.
   * @param callback The callback to build the schema.
   * @returns The endpoint builder.
   */
  public setParamSchema(callback: (schema: SchemaBuilder) => void): this {
    const schema = new SchemaBuilder();
    callback(schema);
    this.paramSchema = schema;
    return this;
  }

  /**
   * Sets the schema to validate the provided request queries against.
   * @param callback The callback to build the schema.
   * @returns The endpoint builder.
   */
  public setQuerySchema(callback: (schema: SchemaBuilder) => void): this {
    const schema = new SchemaBuilder();
    callback(schema);
    this.querySchema = schema;
    return this;
  }

  /**
   * Sets the schema to validate the provided request body against.
   * @param callback The callback to build the schema.
   * @returns The endpoint builder.
   */
  public setBodySchema(callback: (schema: SchemaBuilder) => void): this {
    const schema = new SchemaBuilder();
    callback(schema);
    this.bodySchema = schema;
    return this;
  }

  /**
   * Sets the responses of the endpoint.
   * @param responses The responses of the endpoint.
   * @returns The endpoint builder.
   */
  public setResponses(responses: EndpointResponse[]): this {
    this.responses = responses;
    return this;
  }

  /**
   * Sets the controler to run.
   * @param controller The controlller function to run.
   * @returns The endpoint builder.
   */
  public setController(
    controller: (req: Request, res: Response) => Promise<unknown> | unknown
  ): this {
    this.controller = initController(controller);
    return this;
  }

  /**
   * Executes the endpoint function.
   * @param req The request.
   * @param res The response.
   * @param next The next function.
   */
  public execute = (req: Request, res: Response, next: NextFunction): void => {
    (async () => {
      try {
        // Validate the request
        if (
          this.paramSchema &&
          (await this.paramSchema.validate(req.params, { res }))
        )
          return;
        if (
          this.querySchema &&
          (await this.querySchema.validate(req.query, { res }))
        )
          return;
        if (
          this.bodySchema &&
          (await this.bodySchema.validate(req.body as Record<string, unknown>, {
            res,
          }))
        )
          return;

        // Run the controller
        this.controller(req, res, next);
      } catch (error) {
        logger.error(error);
      }
    })();
  };

  /**
   * Exports the endpoint.
   * @returns The exported endpoint.
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
