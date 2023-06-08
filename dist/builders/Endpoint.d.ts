import { NextFunction, Request, Response } from 'express';
import { ControllerType, EndpointNote, EndpointResponse, PathString, RateLimit, RequestMethod } from '@typings/core';
import { ExportedEndpoint } from '@typings/exports';
import Schema from './Schema';
/**
 * The Endpoint class, used to build an endpoint.
 */
export default class Endpoint {
    disabled: boolean;
    name: string;
    description: string;
    path: PathString;
    method: RequestMethod;
    notes: EndpointNote[];
    paramSchema?: Schema;
    querySchema?: Schema;
    bodySchema?: Schema;
    responses: EndpointResponse[];
    controller: (req: Request, res: Response, next: NextFunction) => void;
    ratelimit?: Partial<RateLimit>;
    /**
     * Creates a new instance of the Endpoint class.
     * @param options The options for the endpoint.
     * @param options.name The name of the endpoint.
     * @param options.description The description of the endpoint.
     * @param options.path The path of the endpoint.
     * @param options.method The method of the endpoint.
     * @param options.controller The controller of the endpoint.
     * @param options.notes The notes of the endpoint.
     * @param options.responses An array of responses for the endpoint.
     * @param options.disabled Whether the endpoint is temporarily disabled or not.
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
     * Sets the notes of the endpoint, for the documentation.
     * @param notes An array of note objects.
     * @returns The current Endpoint instance.
     */
    setNotes(notes: EndpointNote[]): this;
    /**
     * Sets the schema to validate the client's request parameters against.
     * @param callback The callback function to build the schema.
     * @returns The current Endpont instance.
     */
    setParamSchema(callback: (schema: Schema) => void): this;
    /**
     * Sets the schema to validate the client's request queries against.
     * @param callback The callback function to build the schema.
     * @returns The current Endpoint instance.
     */
    setQuerySchema(callback: (schema: Schema) => void): this;
    /**
     * Sets the schema to validate the client's request body against.
     * @param callback The callback function to build the schema.
     * @returns The current Endpoint instance.
     */
    setBodySchema(callback: (schema: Schema) => void): this;
    /**
     * Sets the example responses of the endpoint, for the documentation.
     * @param responses An array of response objects.
     * @returns The current Endpoint instance.
     */
    setResponses(responses: EndpointResponse[]): this;
    /**
     * Sets the controler for the endpoint.
     * @param controller The controlller function to run when the endpoint is called.
     * @returns The current Endpoint instance.
     */
    setController(controller: (req: Request, res: Response) => Promise<unknown> | unknown): this;
    /**
     * Executes the endpoint controller function with error handling and validation.
     * @param req The express request object.
     * @param res The express response object.
     * @param next The express next function.
     */
    execute: (req: Request, res: Response, next: NextFunction) => void;
    /**
     * Exports the Endpoint instance properties to a JSON object.
     * @returns The exported endpoint as a JSON object.
     */
    export(): Readonly<ExportedEndpoint>;
}
//# sourceMappingURL=Endpoint.d.ts.map