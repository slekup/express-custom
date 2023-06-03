import express, { Request, Response, NextFunction, Express, Router } from 'express';
export { default } from 'express';
import { Server } from 'http';
import { Options } from 'express-rate-limit';
import { ClientSession } from 'mongoose';

type Themes = 'default' | 'dark' | 'facebook' | 'slack' | 'stack-overflow' | 'raspberry' | 'brave' | 'terminal' | 'high-contrast-light' | 'high-contrast-dark';
interface Socials {
    discord: string;
    github: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    twitter: string;
    email: string;
}
interface Config {
    file: string;
    name: string;
    description: string;
    logo: string;
    output: string;
    customDir?: string;
    theme: Themes;
    socials: Socials;
}

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type PathString = `/${string}`;
interface RateLimit {
    statusCode: number;
    window: number;
    max: number;
}

/**
 * Base app builder class.
 */
declare class BaseAppBuilder<T = 'router'> {
    raw: (T extends 'app' ? Express : never) | (T extends 'router' ? Router : never);
    protected ratelimit?: Partial<RateLimit>;
    protected middlewares: Middleware[];
    /**
     * Creates an instance of the base app builder class.
     * Router is the default type, so only pass 'app' to create an express app.
     * @param type The type of the builder.
     */
    constructor(type?: T);
    /**
     * Adds a router to the API.
     * @param options The options of the rate limit.
     * @param showInDocs Whether to show the rate limit in the docs.
     * @returns The API builder.
     */
    setRateLimit(options: Partial<Options>, showInDocs?: boolean): this;
    /**
     * Adds a middleware to the route. Add it before adding the route.
     * @param middleware The middleware to add to the route.
     * @returns The router builder.
     */
    addMiddleware(middleware: Middleware): this;
}

type StructureType = 'schema' | 'option';
interface StructureField {
    name: string;
    description: string;
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
    required?: boolean;
    structure?: string;
    option?: string;
}
/**
 * The StructureBuilder class is used to build a example structures for object schemas and value options.
 */
declare class StructureBuilder {
    private name;
    private type;
    private fields;
    /**
     * The name of the structure.
     * @param fields The fields of the structure.
     * @param fields.name The name of the field.
     * @param fields.type The type of the field.
     * @param fields.fields The fields of the field.
     */
    constructor({ name, type, fields, }: {
        name: string;
        type: StructureType;
        fields: StructureField[];
    });
    /**
     * Exports the structure.
     * @returns The exported structure.
     */
    export(): {
        name: string;
        type: StructureType;
        fields: StructureField[];
    };
}

type StringTest = 'email' | 'username' | 'passwordStrength' | 'phoneNumber' | 'ipAddress' | 'url';
type SchemaOption = string | number | boolean | null | undefined;
type SchemaTypes = string | number | boolean | unknown[] | object | null | undefined | unknown;
type ValueTypes = 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'image';
interface ValueCheck {
    run: ((value: string) => boolean) | ((value: string) => Promise<boolean>);
    response: string;
}
interface BaseValueSchema {
    description?: string;
    required?: boolean;
    structure?: string;
    defaultValue?: SchemaTypes;
    options?: SchemaOption[];
    checks?: ValueCheck[];
    type?: ValueTypes;
}
interface ArrayContains {
    type: ValueTypes;
    min?: number;
    max?: number;
}
interface ArrayValue<T> extends BaseValueSchema {
    type: 'array';
    min?: number;
    max?: number;
    unique?: boolean;
    contains?: ArrayContains;
    items?: T | T[];
}
interface BooleanValue extends BaseValueSchema {
    type: 'boolean';
}
interface ImageValue extends BaseValueSchema {
    type: 'image';
}
interface NumberValue extends BaseValueSchema {
    type: 'number';
    min?: number;
    max?: number;
}
interface IntegerValue extends BaseValueSchema {
    type: 'integer';
    min?: number;
    max?: number;
}
interface ObjectValue<T> extends BaseValueSchema {
    type: 'object';
    properties?: T | unknown;
}
interface StringValue extends BaseValueSchema {
    type: 'string';
    min?: number;
    max?: number;
    options?: string[];
    test?: StringTest;
}
type ValueSchema = ArrayValue<ValueSchema> | BooleanValue | ImageValue | NumberValue | IntegerValue | ObjectValue<Record<string, ValueSchema>> | StringValue;
type Schema = Record<string, ValueSchema>;

interface ExportedValue<T> {
    type: string;
    min?: number;
    max?: number;
    options?: string[];
    test?: string;
    items?: T;
    properties?: T;
}
/**
 * The base value builder class.
 * This class is not used for any value types, but is used to provide a base for all value builders.
 */
declare class BaseValueBuilder implements BaseValueSchema {
    name: string;
    description: string;
    required: boolean;
    checks: ValueCheck[];
    structure?: string;
    defaultValue?: SchemaTypes;
    /**
     * Sets the name of the value.
     */
    constructor();
    /**
     * Sets the name of the value.
     * @param name The name of the value.
     * @returns The base value builder.
     */
    setName(name: string): this;
    /**
     * Sets the description of the value.
     * @param description The description of the value.
     * @returns The base value builder.
     */
    setDescription(description: string): this;
    /**
     * Sets whether the value is required.
     * @param required Whether the value is required.
     * @returns The base value builder.
     */
    setRequired(required: boolean): this;
    /**
     * Add a custom function that returns a boolean to test the value against.
     * @param check The checks of the value.
     * @returns The base value builder.
     */
    addCheck(check: ValueCheck): this;
    /**
     * Sets the structure of the value.
     * @param structure The structure of the value.
     * @returns The base value builder.
     */
    setStructure(structure: string): this;
}

/**
 * The array value builder class.
 */
declare class ArrayValueBuilder extends BaseValueBuilder implements ArrayValue<ValueSchema> {
    type: "array";
    min?: number;
    max?: number;
    unique?: boolean;
    contains?: ArrayContains;
    items?: ValueSchema | ValueSchema[];
    /**
     * Creates an instance of the array value builder class.
     */
    constructor();
    /**
     * Sets the min of the value.
     * @param min The min of the value.
     * @returns The string value builder.
     */
    setMin(min: number): this;
    /**
     * Sets the max of the value.
     * @param max The max of the value.
     * @returns The string value builder.
     */
    setMax(max: number): this;
    /**
     * Sets whether the value is unique.
     * @param unique Whether the value is unique.
     * @returns The string value builder.
     */
    setUnique(unique: boolean): this;
    /**
     * Set only one type that the array needs to contain.
     * @param contains The type that the array needs to contain.
     * @param min The minimum amount of times the type needs to be in the array.
     * @param max The maximum amount of times the type needs to be in the array.
     * @returns The string value builder.
     */
    setContains(contains: ValueTypes, min?: number, max?: number): this;
    /**
     * Sets the items that the array needs to contain.
     * @param items The items that the array needs to contain.
     * @returns The string value builder.
     */
    setItems(items: ValueSchema | ValueSchema[]): this;
    /**
     * Sets the default value of the array.
     * @param defaultValue The default value of the array.
     * @returns The array value builder.
     */
    setDefault(defaultValue: unknown[]): this;
    /**
     * Exports the array value.
     * @returns The array value.
     */
    export(): unknown;
}

/**
 * The boolean value builder class.
 */
declare class BooleanValueBuilder extends BaseValueBuilder implements BooleanValue {
    type: "boolean";
    /**
     * Creates an instance of the boolean value builder class.
     */
    constructor();
    /**
     * Sets the default value of the value.
     * @param defaultValue The default value of the value.
     * @returns The boolean value builder.
     */
    setDefault(defaultValue: boolean): this;
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

/**
 * The image value builder class.
 */
declare class ImageValueBuilder extends BaseValueBuilder implements ImageValue {
    type: "image";
    /**
     * Creates an instance of the image value builder class.
     */
    constructor();
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

/**
 * The integer value builder class.
 */
declare class IntegerValueBuilder extends BaseValueBuilder implements IntegerValue {
    type: "integer";
    min?: number;
    max?: number;
    /**
     * Creates an instance of the integer value builder class.
     */
    constructor();
    /**
     * Sets the minimun value the integer can be.
     * @param min The min of the value.
     * @returns The integer value builder.
     */
    setMin(min: number): this;
    /**
     * Sets the maximum value the integer can be.
     * @param max The max of the value.
     * @returns The integer value builder.
     */
    setMax(max: number): this;
    /**
     * Sets the default value of the value.
     * @param defaultValue The default value of the value.
     * @returns The integer value builder.
     */
    setDefault(defaultValue: number): this;
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

/**
 * The number value builder class.
 */
declare class NumberValueBuilder extends BaseValueBuilder implements NumberValue {
    type: "number";
    min?: number;
    max?: number;
    /**
     * Creates an instance of the number value builder class.
     */
    constructor();
    /**
     * Sets the minimum value the number can be.
     * @param min The min of the value.
     * @returns The number value builder.
     */
    setMin(min: number): this;
    /**
     * Sets the maximum value the number can be.
     * @param max The max of the value.
     * @returns The number value builder.
     */
    setMax(max: number): this;
    /**
     * Sets the default value of the value.
     * @param defaultValue The default value of the value.
     * @returns The number value builder.
     */
    setDefault(defaultValue: number): this;
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

/**
 * The object value builder class.
 */
declare class ObjectValueBuilder<T> extends BaseValueBuilder implements ObjectValue<T> {
    type: "object";
    properties: Schema;
    /**
     * Creates an instance of the object value builder class.
     */
    constructor();
    /**
     * Sets the properties of the value.
     * @param properties The properties of the value.
     * @returns The value builder.
     */
    setProperties(properties: Schema): this;
    /**
     * Sets the default value of the value.
     * @param defaultValue The default value of the value.
     * @returns The object value builder.
     */
    setDefault(defaultValue: object): this;
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

/**
 * The string value builder class.
 */
declare class StringValueBuilder extends BaseValueBuilder implements StringValue {
    type: "string";
    min?: number;
    max?: number;
    options?: string[];
    test?: StringTest;
    /**
     * Creates an instance of the string value builder class.
     */
    constructor();
    /**
     * Sets the min of the value.
     * @param min The min of the value.
     * @returns The string value builder.
     */
    setMin(min: number): Omit<this, 'setMin'>;
    /**
     * Sets the max of the value.
     * @param max The max of the value.
     * @returns The string value builder.
     */
    setMax(max: number): this;
    /**
     * Set an array of string values which the value must be one of.
     * @param options An array of string options.
     * @returns The string value builder.
     */
    setOptions(options: string[]): this;
    /**
     * Sets the test regex for the string to be tested against.
     * @param test The test of the value.
     * @returns The string value builder.
     */
    setTest(test: StringTest): this;
    /**
     * Sets the default value of the value.
     * @param defaultValue The default value of the value.
     * @returns The string value builder.
     */
    setDefault(defaultValue: string): this;
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

type ExportedSchema = Record<string, ExportedValue<ExportedSchema>>;
type ValueBuilders = ArrayValueBuilder | StringValueBuilder | NumberValueBuilder | IntegerValueBuilder | BooleanValueBuilder | ObjectValueBuilder<ValueBuilders> | ImageValueBuilder;
type BuildersSchema = Record<string, ValueBuilders>;
/**
 * The Schema Builder class.
 */
declare class SchemaBuilder {
    schema: BuildersSchema;
    /**
     * Creates a new schema.
     */
    constructor();
    /**
     * Adds a array value to the schema.
     * @param callback The callback to build the array value.
     * @returns The schema builder.
     */
    addArray(callback: (value: ArrayValueBuilder) => void): this;
    /**
     * Adds a string value to the schema.
     * @param callback The callback to build the string value.
     * @returns The schema builder.
     */
    addString(callback: (value: StringValueBuilder) => void): this;
    /**
     * Adds a number value to the schema.
     * @param callback The callback to build the number value.
     * @returns The schema builder.
     */
    addNumber(callback: (value: NumberValueBuilder) => void): this;
    /**
     * Adds a integer value to the schema.
     * @param callback The callback to build the integer value.
     * @returns The schema builder.
     */
    addInteger(callback: (value: IntegerValueBuilder) => void): this;
    /**
     * Adds a boolean value to the schema.
     * @param callback The callback to build the boolean value.
     * @returns The schema builder.
     */
    addBoolean(callback: (value: BooleanValueBuilder) => void): this;
    /**
     * Adds a object value to the schema.
     * @param callback The callback to build the object value.
     * @returns The schema builder.
     */
    addObject(callback: (value: ObjectValueBuilder<ValueBuilders>) => void): this;
    /**
     * Adds a image value to the schema.
     * @param callback The callback to build the image value.
     * @returns The schema builder.
     */
    addImage(callback: (value: ImageValueBuilder) => void): this;
    /**
     * Validate an object against a schema.
     * @param data The object data to validate.
     * @param schema The schema to validate against.
     * @param properties Whether to validate the schema properties or not.
     * @returns A string if the validation fails, false otherwise.
     */
    private validateBase;
    /**
     * Run the validation function, and if the response object is provided, send a response if the validation fails.
     * @param data The object data to validate.
     * @param options The options to use when validating.
     * @param options.res The response object.
     * @returns A JSON response meaning it's invalid, or null if it's valid.
     */
    validate(data: Record<string, unknown>, options?: {
        res?: Response;
    }): Promise<Response | null | string>;
    /**
     * Export the schema.
     * @returns The exported schema.
     */
    export(): ExportedSchema;
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
declare class EndpointBuilder {
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
     * @param options.disabled The disabled state of the endpoint.
     * @param options.name The name of the endpoint.
     * @param options.description The description of the endpoint.
     * @param options.path The path of the endpoint.
     * @param options.method The method of the endpoint.
     */
    constructor({ disabled, name, description, path, method, }: {
        disabled?: boolean;
        name: string;
        description: string;
        path: PathString;
        method: RequestMethod;
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
    export(): Readonly<ExportedEndpoint>;
}

interface ExportedRoute {
    name: string;
    description: string;
    path: PathString;
    endpoints: ExportedEndpoint[];
}
/**
 * The route builder class.
 */
declare class RouteBuilder extends BaseAppBuilder {
    raw: Router;
    private path;
    private name;
    private description;
    private endpoints;
    /**
     * Creates a new route.
     * @param options The options for the route.
     * @param options.path The path of the route.
     * @param options.name The name of the route.
     * @param options.description The description of the route.
     */
    constructor({ name, description, path, }: {
        name: string;
        description: string;
        path: PathString;
    });
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
     * Exports the route.
     * @returns The exported route.
     */
    export(): Readonly<ExportedRoute>;
}

interface ExportedRouter {
    name: string;
    path: PathString;
    routes: ExportedRoute[];
}
/**
 * The router builder class.
 */
declare class RouterBuilder extends BaseAppBuilder {
    private path;
    private name;
    private routes;
    /**
     * Creates a new router builder.
     * @param params The router parameters.
     * @param params.path The path of the router.
     * @param params.name The name of the router.
     */
    constructor({ path, name }: {
        path: PathString;
        name: string;
    });
    /**
     * Uses a router.
     * @param route The router to use.
     * @returns The router builder.
     */
    addRoute(route: RouteBuilder): this;
    /**
     * Exports the routes and endpoints data.
     * @returns The exported data.
     */
    export(): Readonly<ExportedRouter>;
    /**
     * Returns the router values.
     * @returns The router values.
     */
    values(): Readonly<{
        raw: Router;
        ratelimit?: Partial<RateLimit>;
        path: `/${string}`;
        defaultCategory: string;
        routes: RouteBuilder[];
        middlewares: Middleware[];
    }>;
}

interface ExportedVersion {
    version: number;
    rateLimit?: Partial<RateLimit>;
    routers: ExportedRouter[];
}
/**
 * The version builder class.
 */
declare class VersionBuilder extends BaseAppBuilder<'app'> {
    private version;
    private routers;
    /**
     * Creates a new version builder.
     * @param config The configuration of the API.
     * @param config.version The version of the API.
     */
    constructor({ version }: {
        version: number;
    });
    /**
     * Adds a router to the API.
     * @param options The options of the rate limit.
     * @param showInDocs Whether to show the rate limit in the docs.
     * @returns The API builder.
     */
    setRateLimit(options: Partial<Options>, showInDocs?: boolean): this;
    /**
     * Adds a router to the API.
     * @param router The router to add.
     * @returns The API builder.
     */
    addRouter(router: RouterBuilder): this;
    /**
     * Adds a router to the API.
     * @returns The API data.
     */
    export(): Readonly<ExportedVersion>;
    /**
     * Adds a router to the API.
     * @returns The API data.
     */
    values(): Readonly<{
        path: string;
        raw: Router;
        version: number;
    }>;
}

type ExportedApi = Config & {
    baseUrl: string;
    port: number;
    structures: StructureBuilder[];
    rateLimit?: Partial<RateLimit>;
    versions: ExportedVersion[];
};
/**
 * The ApiBuilder class is used to build the API.
 */
declare class ApiBuilder extends BaseAppBuilder<'app'> {
    private port;
    private versions;
    private baseUrl;
    private structures;
    /**
     * The constructor of the ApiBuilder class.
     * @param config The configuration of the API.
     * @param config.baseUrl The base URL of the API.
     * @param config.port The port of the API.
     * @param config.structures The structures of the API.
     */
    constructor({ baseUrl, port, structures, }: {
        baseUrl: string;
        port: number;
        structures?: StructureBuilder[];
    });
    /**
     * Adds a version to the API.
     * @param version The version to add.
     * @returns The API builder.
     */
    addVersion(version: VersionBuilder): this;
    /**
     * Initializes the API.
     * @param callback The callback to run when the API is initialized.
     * @returns The server.
     */
    startServer(callback?: () => void): Server;
    /**
     * Loads the configuration of the API.
     * @returns The configuration of the API.
     */
    private static loadConfig;
    /**
     * Adds a router to the API.
     * @returns The API data.
     */
    export(): Promise<Readonly<ExportedApi>>;
}

export { ApiBuilder, Config, EndpointBuilder, RouteBuilder, RouterBuilder, SchemaBuilder, StructureBuilder, VersionBuilder };
