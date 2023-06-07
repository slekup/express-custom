import { NextFunction, Request, Response } from 'express';
import { ControllerType, EndpointNote, EndpointResponse, PathString, RateLimit, RequestMethod } from '@typings/core';
import { ExportedEndpoint } from '@typings/exports';
import SchemaBuilder from './Schema';
/**
 * The endpoint builder class.
 */
export default class EndpointBuilder {
    disabled: boolean;
    name: string;
    description: string;
    path: PathString;
    method: RequestMethod;
    notes: EndpointNote[];
    paramSchema?: SchemaBuilder;
    querySchema?: SchemaBuilder;
    bodySchema?: SchemaBuilder;
    responses: EndpointResponse[];
    controller: (req: Request, res: Response, next: NextFunction) => void;
    ratelimit?: Partial<RateLimit>;
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
    constructor(options: {
        name: string;
        description: string;
        path: PathString;
        method: RequestMethod;
        controller: ControllerType;
        notes?: EndpointNote[];
        responses?: EndpointResponse[];
        disabled?: boolean;
    });
    /**
     * Sets the notes of the endpoint.
     * @param notes The notes of the endpoint.
     * @returns The endpoint builder.
     */
    setNotes(notes: EndpointNote[]): this;
    /**
     * Sets the schema to validate the provided request parameters against.
     * @param callback The callback to build the schema.
     * @returns The endpoint builder.
     */
    setParamSchema(callback: (schema: SchemaBuilder) => void): this;
    /**
     * Sets the schema to validate the provided request queries against.
     * @param callback The callback to build the schema.
     * @returns The endpoint builder.
     */
    setQuerySchema(callback: (schema: SchemaBuilder) => void): this;
    /**
     * Sets the schema to validate the provided request body against.
     * @param callback The callback to build the schema.
     * @returns The endpoint builder.
     */
    setBodySchema(callback: (schema: SchemaBuilder) => void): this;
    /**
     * Sets the responses of the endpoint.
     * @param responses The responses of the endpoint.
     * @returns The endpoint builder.
     */
    setResponses(responses: EndpointResponse[]): this;
    /**
     * Sets the controler to run.
     * @param controller The controlller function to run.
     * @returns The endpoint builder.
     */
    setController(controller: (req: Request, res: Response) => Promise<unknown> | unknown): this;
    /**
     * Executes the endpoint function.
     * @param req The request.
     * @param res The response.
     * @param next The next function.
     */
    execute: (req: Request, res: Response, next: NextFunction) => void;
    /**
     * Exports the endpoint.
     * @returns The exported endpoint.
     */
    export(): Readonly<ExportedEndpoint>;
}
//# sourceMappingURL=Endpoint.d.ts.map