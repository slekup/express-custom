import { ExpressCustomError, logger } from '@utils/index';
import { initController } from '@utils/middleware/wrapper.middleware';
import Schema from './Schema';
/**
 * The Endpoint class, used to build an endpoint.
 */
export default class Endpoint {
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
    constructor(options) {
        // Create the schema for the constructor options.
        const constructorSchema = new Schema()
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
        // Test the options against the schema.
        constructorSchema.validate(options).then((result) => {
            if (typeof result === 'string')
                throw new ExpressCustomError(`Endpoint (${options.name || options.path}): ${result}`);
        });
        // Assign the options to the endpoint.
        this.disabled = options.disabled ?? false;
        this.name = options.name;
        this.description = options.description;
        this.path = options.path;
        this.method = options.method;
        this.controller = initController(options.controller);
        this.notes = options.notes ?? [];
        this.responses = options.responses ?? [];
    }
    /**
     * Sets the notes of the endpoint, for the documentation.
     * @param notes An array of note objects.
     * @returns The current Endpoint instance.
     */
    setNotes(notes) {
        this.notes = notes;
        return this;
    }
    /**
     * Sets the schema to validate the client's request parameters against.
     * @param callback The callback function to build the schema.
     * @returns The current Endpont instance.
     */
    setParamSchema(callback) {
        const schema = new Schema();
        callback(schema);
        this.paramSchema = schema;
        return this;
    }
    /**
     * Sets the schema to validate the client's request queries against.
     * @param callback The callback function to build the schema.
     * @returns The current Endpoint instance.
     */
    setQuerySchema(callback) {
        const schema = new Schema();
        callback(schema);
        this.querySchema = schema;
        return this;
    }
    /**
     * Sets the schema to validate the client's request body against.
     * @param callback The callback function to build the schema.
     * @returns The current Endpoint instance.
     */
    setBodySchema(callback) {
        const schema = new Schema();
        callback(schema);
        this.bodySchema = schema;
        return this;
    }
    /**
     * Sets the example responses of the endpoint, for the documentation.
     * @param responses An array of response objects.
     * @returns The current Endpoint instance.
     */
    setResponses(responses) {
        this.responses = responses;
        return this;
    }
    /**
     * Sets the controler for the endpoint.
     * @param controller The controlller function to run when the endpoint is called.
     * @returns The current Endpoint instance.
     */
    setController(controller) {
        this.controller = initController(controller);
        return this;
    }
    /**
     * Executes the endpoint controller function with error handling and validation.
     * @param req The express request object.
     * @param res The express response object.
     * @param next The express next function.
     */
    execute = (req, res, next) => {
        // Don't return, but run a self-executing async function to allow for async/await controller functions.
        (async () => {
            try {
                // Validate the request against the schemas.
                // If any of them fail, return because the response is handled by the validation function.
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
                // Run the controller function
                this.controller(req, res, next);
            }
            catch (error) {
                logger.error(error);
            }
        })();
    };
    /**
     * Exports the Endpoint instance properties to a JSON object.
     * @returns The exported endpoint as a JSON object.
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
//# sourceMappingURL=Endpoint.js.map