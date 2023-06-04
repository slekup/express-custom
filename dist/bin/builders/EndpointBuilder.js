"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@utils/index");
const middleware_1 = require("@utils/middleware");
const SchemaBuilder_1 = __importDefault(require("./SchemaBuilder"));
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
     * @param options.disabled The disabled state of the endpoint.
     * @param options.name The name of the endpoint.
     * @param options.description The description of the endpoint.
     * @param options.path The path of the endpoint.
     * @param options.method The method of the endpoint.
     */
    constructor({ disabled, name, description, path, method, }) {
        const constructorSchema = new SchemaBuilder_1.default()
            .addBoolean((option) => option.setName('disabled').setRequired(false).setDefault(false))
            .addString((option) => option.setName('name').setRequired(true).setMin(1).setMax(50))
            .addString((option) => option.setName('description').setRequired(true).setMin(1).setMax(100))
            .addString((option) => option
            .setName('path')
            .setRequired(true)
            .setMin(1)
            .setMax(100)
            .setTest('path'))
            .addString((option) => option
            .setName('method')
            .setRequired(true)
            .setMin(1)
            .setMax(100)
            .setOptions(['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']));
        constructorSchema
            .validate({ disabled, name, description, path, method })
            .then((result) => {
            if (typeof result === 'string')
                throw new Error(`Endpoint (${name || path}): ${result}`);
        });
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
        const schema = new SchemaBuilder_1.default();
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
        const schema = new SchemaBuilder_1.default();
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
        const schema = new SchemaBuilder_1.default();
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
        this.controller = (0, middleware_1.withErrorHandling)(controller);
        return this;
    }
    /**
     * Executes the endpoint function.
     * @param req The request.
     * @param res The response.
     * @param next The next function.
     */
    execute(req, res, next) {
        (async () => {
            try {
                if (!this.paramSchema && !this.querySchema && !this.bodySchema)
                    return res
                        .status(500)
                        .json({ status: 500, message: 'Schema not set for endpoint.' });
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
                // Return the execution of the controller
                return this.controller(req, res, next);
            }
            catch (error) {
                index_1.logger.error(error);
            }
        })();
    }
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
