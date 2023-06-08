import express, { Request, Response, NextFunction, Express, Router } from 'express';
export { default } from 'express';
import { Server } from 'http';
import { Options } from 'express-rate-limit';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type PathString = `/${string}`;
interface RateLimit {
    statusCode: number;
    window: number;
    max: number;
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
type ControllerType = (req: Request, res: Response) => Promise<unknown> | unknown;
type StructureType = 'schema' | 'option';
interface StructureField {
    name: string;
    description: string;
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
    required?: boolean;
    structure?: string;
    option?: string;
}

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
    hide: {
        rateLimits: boolean;
    };
    theme: Themes;
    socials: Socials;
}
interface ExportedValue<T> {
    type: string;
    min?: number;
    max?: number;
    options?: string[];
    test?: string;
    items?: T;
    properties?: T;
}
type ExportedSchema = Record<string, ExportedValue<ExportedSchema>>;
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
interface ExportedRoute {
    name: string;
    description: string;
    path: PathString;
    endpoints: ExportedEndpoint[];
}
interface ExportedGroup {
    name: string;
    path: PathString;
    routes: ExportedRoute[];
}
interface ExportedVersion {
    version: number;
    rateLimit?: Partial<RateLimit> | undefined;
    groups: ExportedGroup[];
}
interface ExportedStructure {
    name: string;
    type: StructureType;
    fields: StructureField[];
}
type ExportedApi = Config & {
    url: string;
    port: number;
    structures: ExportedStructure[];
    rateLimit?: Partial<RateLimit> | undefined;
    versions: ExportedVersion[];
    groups: ExportedGroup[];
};

/**
 * The BaseApp class, used to build on top of an express app or router.
 */
declare class BaseApp<T extends 'router' | 'app'> {
    raw: (T extends 'app' ? Express : never) | (T extends 'router' ? Router : never);
    protected ratelimit?: Partial<RateLimit>;
    protected middlewares: Middleware[];
    /**
     * Creates an instance of the BaseApp class.
     * Pass 'app' to create an express app, and 'router' for an express router.
     * @param type The type of the base app - 'app' or 'router'.
     */
    constructor(type?: T);
    /**
     * Sets the rate limit for the base app or router.
     * @param options The rate limit options provided by the express-rate-limit package.
     * @returns The BaseApp class.
     */
    setRateLimit(options: Partial<Options>): this;
    /**
     * Adds a middleware to the route. Add it before adding the route.
     * @param middleware The middleware to add to the route.
     * @returns The BaseApp class.
     */
    addMiddleware(middleware: Middleware): this;
}

type StringTest = 'email' | 'username' | 'passwordStrength' | 'phoneNumber' | 'ipAddress' | 'url' | 'path';
type SchemaOption = string | number | boolean | null | undefined;
type SchemaTypes = string | number | boolean | unknown[] | object | null | undefined | unknown;
type ValueTypes = 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'image';
type ValueCheck = [
    ((value: string) => boolean) | ((value: string) => Promise<boolean>),
    string
];
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

interface BaseValueOptions {
    name: string;
    description?: string;
    required?: boolean;
    checks?: ValueCheck[];
    structure?: string;
    defaultValue?: SchemaTypes;
}
/**
 * The BaseValue class. Used as a foundation for all value builders.
 */
declare class BaseValue implements BaseValueSchema {
    name: string;
    description?: string;
    required: boolean;
    checks: ValueCheck[];
    structure?: string;
    defaultValue?: SchemaTypes;
    /**
     * Creates a new instance of the BaseValue class.
     * @param options The options of the value.
     * @param options.name The name of the value.
     * @param options.description The description of the value.
     * @param options.required Whether the value is required.
     * @param options.checks The checks of the value.
     */
    constructor(options: BaseValueOptions);
    /**
     * Validates the value.
     */
    validate(): void;
}

type ArrayValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
    unique?: boolean;
    contains?: ArrayContains;
    items?: ValueSchema | ValueSchema[];
};
/**
 * The array value builder class.
 */
declare class ArrayValueBuilder extends BaseValue implements ArrayValue<ValueSchema> {
    type: "array";
    min?: number;
    max?: number;
    unique?: boolean;
    contains?: ArrayContains;
    items?: ValueSchema | ValueSchema[];
    /**
     * Creates an instance of the array value builder class.
     * @param options The options of the array value.
     * @param options.min The minimum amount of items in the array value.
     * @param options.max The maximum amount of items in the array value.
     * @param options.unique Whether the array value is unique.
     * @param options.contains The type that the array value needs to contain.
     * @param options.items The items of the array value.
     */
    constructor({ min, max, unique, contains, items, ...options }: ArrayValueOptions);
    /**
     * Exports the array value.
     * @returns The array value.
     */
    export(): unknown;
}

type BooleanValueOptions = BaseValueOptions;
/**
 * The boolean value builder class.
 */
declare class BooleanValueBuilder extends BaseValue implements BooleanValue {
    type: "boolean";
    /**
     * Creates an instance of the boolean value builder class.
     * @param options The options of the boolean value.
     */
    constructor(options: BooleanValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

type ImageValueOptions = BaseValueOptions;
/**
 * The image value builder class.
 */
declare class ImageValueBuilder extends BaseValue implements ImageValue {
    type: "image";
    /**
     * Creates an instance of the image value builder class.
     * @param options The options of the image value.
     */
    constructor(options: ImageValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

type IntegerValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
};
/**
 * The integer value builder class.
 */
declare class IntegerValueBuilder extends BaseValue implements IntegerValue {
    type: "integer";
    min?: number;
    max?: number;
    /**
     * Creates an instance of the integer value builder class.
     * @param options The options of the integer value.
     */
    constructor(options: IntegerValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

type NumberValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
};
/**
 * The number value builder class.
 */
declare class NumberValueBuilder extends BaseValue implements NumberValue {
    type: "number";
    min?: number;
    max?: number;
    /**
     * Creates an instance of the number value builder class.
     * @param options The options of the number value.
     */
    constructor(options: NumberValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

type ObjectValueOptions = BaseValueOptions & {
    properties: Schema;
};
/**
 * The object value builder class.
 */
declare class ObjectValueBuilder<T> extends BaseValue implements ObjectValue<T> {
    type: "object";
    properties: Schema;
    /**
     * Creates an instance of the object value builder class.
     * @param options The options of the object value builder class.
     */
    constructor(options: ObjectValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

type StringValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
    options?: string[];
    test?: StringTest;
};
/**
 * The string value builder class.
 */
declare class StringValueBuilder extends BaseValue implements StringValue {
    type: "string";
    min?: number;
    max?: number;
    options?: string[];
    test?: StringTest;
    /**
     * Creates an instance of the string value builder class.
     * @param options The options of the string value.
     */
    constructor(options: StringValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}

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
     * @param options The options of the array value.
     * @returns The schema builder.
     */
    addArray(options: ArrayValueOptions): this;
    /**
     * Adds a string value to the schema.
     * @param options The options of the string value.
     * @returns The schema builder.
     */
    addString(options: StringValueOptions): this;
    /**
     * Adds a number value to the schema.
     * @param options The options of the number value.
     * @returns The schema builder.
     */
    addNumber(options: NumberValueOptions): this;
    /**
     * Adds a integer value to the schema.
     * @param options The options of the integer value.
     * @returns The schema builder.
     */
    addInteger(options: IntegerValueOptions): this;
    /**
     * Adds a boolean value to the schema.
     * @param options The options of the boolean value.
     * @returns The schema builder.
     */
    addBoolean(options: BooleanValueOptions): this;
    /**
     * Adds a object value to the schema.
     * @param options The options of the object value.
     * @returns The schema builder.
     */
    addObject(options: ObjectValueOptions): this;
    /**
     * Adds a image value to the schema.
     * @param options The options of the image value.
     * @returns The schema builder.
     */
    addImage(options: ImageValueOptions): this;
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

/**
 * The route builder class.
 */
declare class RouteBuilder extends BaseApp<'router'> {
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
    constructor({ path, name, description, }: {
        path: PathString;
        name: string;
        description: string;
    });
    /**
     * Adds an endpoint to the route.
     * @param endpoint The endpoint to add to the route.
     * @returns The route builder.
     */
    addEndpoint(endpoint: EndpointBuilder): this;
    /**
     * Adds all endpoints from an endpoint file to the route.
     * @param endpointFile The endpoint file to add endpoints from.
     * @returns The route builder.
     */
    addEndpointFile(endpointFile: Record<string, EndpointBuilder>): this;
    /**
     * Validates the route.
     */
    validate(): void;
    /**
     * Exports the route.
     * @returns The exported route.
     */
    export(): Readonly<ExportedRoute>;
}

/**
 * The group builder class, used to build a group of routes.
 */
declare class GroupBuilder extends BaseApp<'router'> {
    private path;
    private name;
    private routes;
    /**
     * Creates a new group builder.
     * @param params The group parameters.
     * @param params.path The path of the group.
     * @param params.name The name of the group.
     */
    constructor({ path, name }: {
        path: PathString;
        name: string;
    });
    /**
     * Uses a group.
     * @param route The group to use.
     * @returns The group builder.
     */
    addRoute(route: RouteBuilder): this;
    /**
     * Returns the group values.
     * @returns The group values.
     */
    values(): Readonly<{
        raw: Router;
        ratelimit?: Partial<RateLimit> | undefined;
        path: PathString;
        defaultCategory: string;
        routes: RouteBuilder[];
        middlewares: Middleware[];
    }>;
    /**
     * Validates the group.
     */
    validate(): void;
    /**
     * Exports the routes and endpoints data.
     * @returns The exported data.
     */
    export(): Readonly<ExportedGroup>;
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
    export(): ExportedStructure;
}

/**
 * The version builder class.
 */
declare class VersionBuilder extends BaseApp<'app'> {
    private version;
    private groups;
    /**
     * Creates a new version builder.
     * @param config The configuration of the API.
     * @param config.version The version of the API.
     */
    constructor({ version }: {
        version: number;
    });
    /**
     * Sets the global rate limit for the version.
     * @param options The options of the rate limit.
     * @returns The API builder.
     */
    setRateLimit(options: Partial<Options>): this;
    /**
     * Adds a group to the API.
     * @param group The group to add.
     * @returns The API builder.
     */
    addGroup(group: GroupBuilder): this;
    /**
     * Adds a group to the API.
     * @returns The API data.
     */
    export(): Readonly<ExportedVersion>;
    /**
     * Gets the version values.
     * @returns The API data.
     */
    values(): Readonly<{
        path: string;
        raw: Router;
        version: number;
    }>;
    /**
     * Validates the version builder.
     */
    validate(): void;
}

/**
 * The ApiBuilder class is used to build the API.
 */
declare class Api extends BaseApp<'app'> {
    private port;
    private versions;
    private groups;
    private url;
    private structures;
    private config?;
    /**
     * The constructor of the ApiBuilder class.
     * @param options The configuration of the API.
     * @param options.url The base URL of the API.
     * @param options.port The port of the API.
     * @param options.structures The structures of the API.
     */
    constructor(options: {
        url: string;
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
     * Adds a group directly to the API without a version.
     * @param group An instance of the GroupBuilder class.
     * @returns The API builder.
     */
    addGroup(group: GroupBuilder): this;
    /**
     * Initializes the API.
     * @param callback The callback to run when the API is initialized.
     * @returns The server.
     */
    start(callback?: (() => void) | (() => Promise<void>)): Server;
    /**
     * Loads the configuration of the API.
     * @returns The configuration of the API.
     */
    private loadConfig;
    /**
     * Gets the configuration of the API.
     * @returns The configuration of the API.
     */
    getConfig(): Promise<Readonly<Config>>;
    /**
     * Validates the API instance.
     */
    private validate;
    /**
     * Adds a group to the API.
     * @returns The API data.
     */
    export(): Promise<Readonly<ExportedApi>>;
}

export { Api, Config, EndpointBuilder as Endpoint, GroupBuilder as Group, RouteBuilder as Route, SchemaBuilder as Schema, StructureBuilder as Structure, VersionBuilder as Version };
