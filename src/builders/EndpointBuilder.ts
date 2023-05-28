import { NextFunction, Request, Response } from 'express';

import { PathType } from '@typings/core';
import { Schema, logger, validate } from '@utils/index';
import { withErrorHandling } from '@utils/middleware';
import { ClientSession } from 'mongoose';
import SchemaBuilder from './SchemaBuilder';

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
  params: Schema;
  query: Schema;
  body: Schema;
  responses: EndpointResponse[];
}

/**
 * The endpoint builder class.
 */
export default class EndpointBuilder {
  public disabled: boolean;
  public name: string;
  public description: string;
  public path: PathType;
  public method: RequestMethod;
  public notes: EndpointNote[];
  public paramSchema?: Schema;
  public querySchema?: Schema;
  public bodySchema?: Schema;
  public responses: EndpointResponse[];
  public controller: (req: Request, res: Response, next: NextFunction) => void;

  /**
   * Creates a new endpoint.
   */
  public constructor() {
    this.disabled = false;
    this.name = 'Name not provided';
    this.description = 'Description not provided';
    this.path = '/';
    this.method = 'GET';
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
   * Sets the disabled state of the endpoint.
   * @param disabled The disabled state of the endpoint.
   * @returns The endpoint builder.
   */
  public setDisabled(disabled: boolean): this {
    this.disabled = disabled;
    return this;
  }

  /**
   * Sets the name of the endpoint.
   * @param name The name of the endpoint.
   * @returns The endpoint builder.
   */
  public setName(name: string): this {
    this.name = name;
    return this;
  }

  /**
   * Sets the description of the endpoint.
   * @param description The description of the endpoint.
   * @returns The endpoint builder.
   */
  public setDescription(description: string): this {
    this.description = description;
    return this;
  }

  /**
   * Sets the path of the endpoint.
   * @param path The path of the endpoint.
   * @returns The endpoint builder.
   */
  public setPath(path: PathType): this {
    this.path = path;
    return this;
  }

  /**
   * Sets the method of the endpoint.
   * @param method The method of the endpoint.
   * @returns The endpoint builder.
   */
  public setMethod(method: RequestMethod): this {
    this.method = method;
    return this;
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
    this.paramSchema = schema.schema;
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
    this.querySchema = schema.schema;
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
    this.bodySchema = schema.schema;
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
          (await validate(req.params, this.paramSchema, res))
        )
          return;
        if (
          this.querySchema &&
          (await validate(req.query, this.querySchema, res))
        )
          return;
        if (
          this.bodySchema &&
          (await validate(
            req.body as Record<string, unknown>,
            this.bodySchema,
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
  public export(): ExportedEndpoint {
    return {
      name: this.name,
      description: this.description,
      path: this.path === '/' ? '' : this.path,
      method: this.method,
      notes: this.notes,
      params: this.paramSchema ?? {},
      query: this.querySchema ?? {},
      body: this.bodySchema ?? {},
      responses: this.responses,
    };
  }
}
