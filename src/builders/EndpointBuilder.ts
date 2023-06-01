import { NextFunction, Request, Response } from 'express';
import { ClientSession } from 'mongoose';

import { PathString, RateLimit } from '@typings/core';
import { logger } from '@utils/index';
import { withErrorHandling } from '@utils/middleware';
import SchemaBuilder, { ExportedSchema } from './SchemaBuilder';

type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PATCH'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'TRACE'
  | 'CONNECT';

type EndpointMessageType = 'INFO' | 'WARNING' | 'DANGER' | 'SUCCESS';

interface EndpointNote {
  type: EndpointMessageType;
  text: string;
}

type StatusCode =
  | 200
  | 201
  | 204
  | 301
  | 400
  | 401
  | 403
  | 404
  | 405
  | 409
  | 500
  | 501;

interface EndpointResponse {
  status: StatusCode;
  message: string;
  [key: string]: unknown;
}

export interface ExportedEndpoint {
  name: string;
  description: string;
  path: string;
  method: RequestMethod;
  notes: EndpointNote[];
  params: ExportedSchema;
  queries: ExportedSchema;
  body: ExportedSchema;
  responses: EndpointResponse[];
}

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
   * @param options.disabled The disabled state of the endpoint.
   * @param options.name The name of the endpoint.
   * @param options.description The description of the endpoint.
   * @param options.path The path of the endpoint.
   * @param options.method The method of the endpoint.
   */
  public constructor({
    disabled,
    name,
    description,
    path,
    method,
  }: {
    disabled?: boolean;
    name: string;
    description: string;
    path: PathString;
    method: RequestMethod;
  }) {
    this.disabled = disabled ?? false;
    this.name = name;
    this.description = description;
    this.path = path;
    this.method = method;
    this.notes = [];
    this.responses = [];

    /**
     * If the controller is not set, throw an error.
     */
    this.controller = () => {
      throw new Error('Controller not set');
    };
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
    controller: (
      req: Request,
      res: Response,
      session: ClientSession
    ) => Promise<unknown> | unknown
  ): this {
    this.controller = withErrorHandling(controller);
    return this;
  }

  /**
   * Executes the endpoint function.
   * @param req The request.
   * @param res The response.
   * @param next The next function.
   */
  public execute(req: Request, res: Response, next: NextFunction): void {
    (async () => {
      try {
        if (!this.paramSchema && !this.querySchema && !this.bodySchema)
          return res
            .status(500)
            .json({ status: 500, message: 'Schema not set for endpoint.' });

        // Validate the request
        if (
          this.paramSchema &&
          (await this.paramSchema.validate(req.params, res))
        )
          return;
        if (
          this.querySchema &&
          (await this.querySchema.validate(req.query, res))
        )
          return;
        if (
          this.bodySchema &&
          (await this.bodySchema.validate(
            req.body as Record<string, unknown>,
            res
          ))
        )
          return;

        // Return the execution of the controller
        return this.controller(req, res, next);
      } catch (error) {
        logger.error(error);
      }
    })();
  }

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
