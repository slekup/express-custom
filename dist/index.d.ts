import express, { Request, Response, NextFunction, Router } from 'express';
export { default } from 'express';
import { ClientSession } from 'mongoose';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type PathType = `/${string}`;

type SchemaTest = 'email' | 'username' | 'passwordStrength' | 'phoneNumber' | 'ipAddress' | 'url';
type SchemaOption = string | number | boolean | null | undefined;
type SchemaBaseTypes = 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'image';
type SchemaTypes = SchemaBaseTypes | 'string';
interface SchemaItems {
    type: SchemaTypes;
    enum: unknown[];
}
interface SchemaCheck {
    run: ((value: string) => boolean) | ((value: string) => Promise<boolean>);
    response: string;
}
interface BaseSchema<T = unknown> {
    description: string;
    required: boolean;
    options?: SchemaOption[];
    enum?: unknown[];
    items?: SchemaItems;
    min?: number;
    max?: number;
    checks?: SchemaCheck[];
    properties?: T;
    schema?: `{${string}}`;
}
interface SchemaWithTest<T> extends BaseSchema<T> {
    type: 'string';
    test?: SchemaTest;
}
interface SchemaWithoutTest<T> extends BaseSchema<T> {
    type: SchemaBaseTypes;
}
type Schema = Record<string, SchemaWithTest<Schema> | SchemaWithoutTest<Schema>>;

/**
 * The value builder class.
 */
declare class ValueBuilder implements BaseSchema {
    name: string;
    type: SchemaTypes;
    typeSchema?: `{${string}}`;
    description: string;
    required: boolean;
    options?: SchemaOption[];
    enum?: unknown[];
    items?: SchemaItems;
    min?: number;
    max?: number;
    checks?: SchemaCheck[];
    properties?: Schema;
    test?: SchemaTest;
    /**
     * Sets the name of the value.
     * @param type The type of the value.
     */
    constructor(type: SchemaTypes);
    /**
     * Sets the type of the value.
     * @param name The name of the value.
     * @returns The value builder.
     */
    setName(name: string): this;
    /**
     * Sets the type schema of the value.
     * @param typeSchema The type schema of the value.
     * @returns The value builder.
     */
    setTypeSchema(typeSchema: `{${string}}`): this;
    /**
     * Sets the description of the value.
     * @param description The description of the value.
     * @returns The value builder.
     */
    setDescription(description: string): this;
    /**
     * Sets whether the value is required.
     * @param required Whether the value is required.
     * @returns The value builder.
     */
    setRequired(required: boolean): this;
    /**
     * Sets the options of the value.
     * @param options The options of the value.
     * @returns The value builder.
     */
    setOptions(options: SchemaOption[]): this;
    /**
     * Sets the enum of the value.
     * @param enumValue The enum of the value.
     * @returns The value builder.
     */
    setEnum(enumValue: unknown[]): this;
    /**
     * Sets the items of the value.
     * @param items The items of the value.
     * @returns The value builder.
     */
    setItems(items: SchemaItems): this;
    /**
     * Sets the min of the value.
     * @param min The min of the value.
     * @returns The value builder.
     */
    setMin(min: number): this;
    /**
     * Sets the max of the value.
     * @param max The max of the value.
     * @returns The value builder.
     */
    setMax(max: number): this;
    /**
     * Sets the checks of the value.
     * @param checks The checks of the value.
     * @returns The value builder.
     */
    setChecks(checks: SchemaCheck[]): this;
    /**
     * Sets the properties of the value.
     * @param properties The properties of the value.
     * @returns The value builder.
     */
    setProperties(properties: Schema): this;
    /**
     * Sets the test of the value.
     * @param test The test of the value.
     * @returns The value builder.
     */
    setTest(test: SchemaTest): this;
}

/**
 * The Schema Builder class.
 */
declare class SchemaBuilder {
    schema: Schema;
    /**
     * Creates a new schema.
     */
    constructor();
    /**
     * Adds a string value to the schema.
     * @param callback The callback to build the string value.
     * @returns The schema builder.
     */
    addStringValue(callback: (value: ValueBuilder) => void): this;
    /**
     * Adds a number value to the schema.
     * @param callback The callback to build the number value.
     * @returns The schema builder.
     */
    addNumberValue(callback: (value: ValueBuilder) => void): this;
    /**
     * Adds a integer value to the schema.
     * @param callback The callback to build the integer value.
     * @returns The schema builder.
     */
    addIntegerValue(callback: (value: ValueBuilder) => void): this;
    /**
     * Adds a boolean value to the schema.
     * @param callback The callback to build the boolean value.
     * @returns The schema builder.
     */
    addBooleanValue(callback: (value: ValueBuilder) => void): this;
    /**
     * Adds a object value to the schema.
     * @param callback The callback to build the object value.
     * @returns The schema builder.
     */
    addObjectValue(callback: (value: ValueBuilder) => void): this;
    /**
     * Adds a array value to the schema.
     * @param callback The callback to build the array value.
     * @returns The schema builder.
     */
    addArrayValue(callback: (value: ValueBuilder) => void): this;
    /**
     * Adds a image value to the schema.
     * @param callback The callback to build the image value.
     * @returns The schema builder.
     */
    addImageValue(callback: (value: ValueBuilder) => void): this;
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT';
type EndpointMessageType = 'INFO' | 'WARNING' | 'DANGER' | 'SUCCESS';
interface EndpointNote {
    type: EndpointMessageType;
    text: string;
}
type StatusCode = 200 | 201 | 204 | 301 | 400 | 401 | 403 | 404 | 405 | 409 | 500 | 501;
interface EndpointResponse {
    status: StatusCode;
    message: string;
    [key: string]: unknown;
}
interface ExportedEndpoint {
    name: string;
    description: string;
    path: `/${string}`;
    notes: EndpointNote[];
    params: Schema;
    query: Schema;
    body: Schema;
    responses: EndpointResponse[];
}
/**
 * The endpoint builder class.
 */
declare class EndpointBuilder {
    disabled: boolean;
    name: string;
    description: string;
    path: PathType;
    method: RequestMethod;
    notes: EndpointNote[];
    paramSchema?: Schema;
    querySchema?: Schema;
    bodySchema?: Schema;
    responses: EndpointResponse[];
    controller: (req: Request, res: Response, next: NextFunction) => void;
    /**
     * Creates a new endpoint.
     */
    constructor();
    /**
     * Sets the disabled state of the endpoint.
     * @param disabled The disabled state of the endpoint.
     * @returns The endpoint builder.
     */
    setDisabled(disabled: boolean): this;
    /**
     * Sets the name of the endpoint.
     * @param name The name of the endpoint.
     * @returns The endpoint builder.
     */
    setName(name: string): this;
    /**
     * Sets the description of the endpoint.
     * @param description The description of the endpoint.
     * @returns The endpoint builder.
     */
    setDescription(description: string): this;
    /**
     * Sets the path of the endpoint.
     * @param path The path of the endpoint.
     * @returns The endpoint builder.
     */
    setPath(path: PathType): this;
    /**
     * Sets the method of the endpoint.
     * @param method The method of the endpoint.
     * @returns The endpoint builder.
     */
    setMethod(method: RequestMethod): this;
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
    setController(controller: (req: Request, res: Response, session: ClientSession) => Promise<unknown> | unknown): this;
    /**
     * Executes the endpoint function.
     * @param req The request.
     * @param res The response.
     * @param next The next function.
     */
    execute(req: Request, res: Response, next: NextFunction): void;
    /**
     * Exports the endpoint.
     * @returns The exported endpoint.
     */
    export(): ExportedEndpoint;
}

interface ExportedRoute {
    name: string;
    description: string;
    path: PathType;
    endpoints: ExportedEndpoint[];
}
/**
 * The route builder class.
 */
declare class RouteBuilder {
    raw: Router;
    private path;
    private name;
    private description;
    private endpoints;
    private middlewares;
    private afterwares;
    /**
     * Creates a new route.
     * @param path The path of the route.
     */
    constructor(path?: PathType);
    /**
     * Sets the path of the route.
     * @param name The name of the route.
     * @returns The route builder.
     */
    setName(name: string): this;
    /**
     * Sets the description of the route.
     * @param description The description of the route.
     * @returns The route builder.
     */
    setDescription(description: string): this;
    /**
     * Sets the path of the route.
     * @param path The path to set the router to.
     * @returns The router builder.
     */
    setPath(path: `/${string}`): this;
    /**
     * Adds a middleware to the route. Add it before adding the route.
     * @param middleware The middleware to add to the route.
     * @returns The router builder.
     */
    addMiddleware(middleware: Middleware): this;
    /**
     * Adds an afterware to the route. Add it before adding the route.
     * @param afterware The afterware to add to the route.
     * @returns The router builder.
     */
    addAfterware(afterware: Middleware): this;
    /**
     * Adds an endpoint to the route.
     * @param endpoint The endpoint to add to the route.
     * @returns The router builder.
     */
    addEndpoint(endpoint: EndpointBuilder): this;
    /**
     * Adds all endpoints from an endpoint file to the route.
     * @param endpointFile The endpoint file to add endpoints from.
     * @returns The route builder.
     */
    addEndpointFile(endpointFile: Record<string, EndpointBuilder>): this;
    /**
     * Gets the middlewares and afterwares of the route.
     * @returns The middlewares and afterwares of the route.
     */
    access(): {
        middlewares: Middleware[];
        afterwares: Middleware[];
    };
    /**
     * Exports the route.
     * @returns The exported route.
     */
    export(): ExportedRoute;
}

interface ExportedRouter {
    name: string;
    path: PathType;
    routes: ExportedRoute[];
}
/**
 * The router builder class.
 */
declare class RouterBuilder {
    raw: Router;
    private path;
    private name;
    private routes;
    private middlewares;
    private afterwares;
    /**
     * Creates a new router builder.
     */
    constructor();
    /**
     * Sets the name of the route.
     * @param name The name of the route.
     * @returns The router builder.
     */
    setName(name: string): this;
    /**
     * Sets the path of the route.
     * @param path The path to set the router to.
     * @returns The router builder.
     */
    setPath(path: PathType): this;
    /**
     * Adds a middleware to the route. Add it before adding the route.
     * @param middleware The middleware to add to the route.
     * @returns The router builder.
     */
    addMiddleware(middleware: Middleware): this;
    /**
     * Adds an afterware to the route. Add it before adding the route.
     * @param afterware The afterware to add to the route.
     * @returns The router builder.
     */
    addAfterware(afterware: Middleware): this;
    /**
     * Uses a router.
     * @param path The path to use.
     * @param route The router to use.
     * @returns The router builder.
     */
    addRoute(path: string, route: RouteBuilder): this;
    /**
     * Gets the express router.
     * @returns The express router.
     */
    getRouter: () => Router;
    /**
     * Exports the routes and endpoints data.
     * @returns The exported data.
     */
    export(): ExportedRouter;
    /**
     * Generates the site with next.js.
     * @returns The router builder.
     */
    generateSite(): Promise<this>;
}

export { EndpointBuilder, RouteBuilder, RouterBuilder };
