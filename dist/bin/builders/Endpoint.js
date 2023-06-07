"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@utils/index");
const wrapper_middleware_1 = require("@utils/middleware/wrapper.middleware");
const Schema_1 = __importDefault(require("./Schema"));
/**
 * The endpoint builder class.
 */
class EndpointBuilder {
    disabled;
    name;
    description;
    path;
    method;
    notes;
    paramSchema;
    querySchema;
    bodySchema;
    responses;
    controller;
    ratelimit;
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
    constructor(options) {
        this.disabled = options.disabled ?? false;
        this.name = options.name;
        this.description = options.description;
        this.path = options.path;
        this.method = options.method;
        this.controller = (0, wrapper_middleware_1.initController)(options.controller);
        this.notes = options.notes ?? [];
        this.responses = options.responses ?? [];
        const constructorSchema = new Schema_1.default()
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
                throw new index_1.PackageError(`Endpoint (${options.name || options.path}): ${result}`);
        });
    }
    /**
     * Sets the notes of the endpoint.
     * @param notes The notes of the endpoint.
     * @returns The endpoint builder.
     */
    setNotes(notes) {
        this.notes = notes;
        return this;
    }
    /**
     * Sets the schema to validate the provided request parameters against.
     * @param callback The callback to build the schema.
     * @returns The endpoint builder.
     */
    setParamSchema(callback) {
        const schema = new Schema_1.default();
        callback(schema);
        this.paramSchema = schema;
        return this;
    }
    /**
     * Sets the schema to validate the provided request queries against.
     * @param callback The callback to build the schema.
     * @returns The endpoint builder.
     */
    setQuerySchema(callback) {
        const schema = new Schema_1.default();
        callback(schema);
        this.querySchema = schema;
        return this;
    }
    /**
     * Sets the schema to validate the provided request body against.
     * @param callback The callback to build the schema.
     * @returns The endpoint builder.
     */
    setBodySchema(callback) {
        const schema = new Schema_1.default();
        callback(schema);
        this.bodySchema = schema;
        return this;
    }
    /**
     * Sets the responses of the endpoint.
     * @param responses The responses of the endpoint.
     * @returns The endpoint builder.
     */
    setResponses(responses) {
        this.responses = responses;
        return this;
    }
    /**
     * Sets the controler to run.
     * @param controller The controlller function to run.
     * @returns The endpoint builder.
     */
    setController(controller) {
        this.controller = (0, wrapper_middleware_1.initController)(controller);
        return this;
    }
    /**
     * Executes the endpoint function.
     * @param req The request.
     * @param res The response.
     * @param next The next function.
     */
    execute = (req, res, next) => {
        (async () => {
            try {
                // Validate the request
                if (this.paramSchema &&
                    (await this.paramSchema.validate(req.params, { res })))
                    return;
                if (this.querySchema &&
                    (await this.querySchema.validate(req.query, { res })))
                    return;
                if (this.bodySchema &&
                    (await this.bodySchema.validate(req.body, {
                        res,
                    })))
                    return;
                // Run the controller
                this.controller(req, res, next);
            }
            catch (error) {
                index_1.logger.error(error);
            }
        })();
    };
    /**
     * Exports the endpoint.
     * @returns The exported endpoint.
     */
    export() {
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
exports.default = EndpointBuilder;
