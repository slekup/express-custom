"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@utils/index");
const BaseApp_1 = __importDefault(require("./Base/BaseApp"));
const Schema_1 = __importDefault(require("./Schema"));
/**
 * The Route class, used to create a route with endpoints.
 */
class Route extends BaseApp_1.default {
    path;
    name;
    description;
    endpoints = [];
    /**
     * Creates a new instance of the Route class.
     * @param options The options for the route.
     * @param options.path The path of the route.
     * @param options.name The name of the route.
     * @param options.description The description of the route.
     */
    constructor({ path, name, description, }) {
        super();
        // Create the schema for the constructor options.
        const constructorSchema = new Schema_1.default()
            .addString({
            name: 'path',
            required: true,
            min: 1,
            max: 100,
            test: 'path',
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
        });
        // Test the the constructor against the schema.
        constructorSchema.validate({ name, description, path }).then((result) => {
            if (typeof result === 'string')
                throw new index_1.ExpressCustomError(`Route (${name || path}): ${result}`);
        });
        // Assign the options to the instance.
        this.path = path;
        this.name = name;
        this.description = description;
    }
    /**
     * Adds an endpoint to the route.
     * @param endpoint An instance of the Endpoint class.
     * @returns The current Route instance.
     */
    addEndpoint(endpoint) {
        // Add the endpoint to the route.
        this.endpoints.push(endpoint);
        // Replace multiple slashes with a single slash.
        const doubleSlashRegex = /\/+/g;
        // Create the url for the endpoint.
        const url = `${this.path}${endpoint.path}`.replaceAll(doubleSlashRegex, '/');
        // Add the endpoint to the router.
        switch (endpoint.method) {
            case 'GET':
                this.raw.get(url, endpoint.execute);
                break;
            case 'POST':
                this.raw.post(url, endpoint.execute);
                break;
            case 'PUT':
                this.raw.put(url, endpoint.execute);
                break;
            case 'PATCH':
                this.raw.patch(url, endpoint.execute);
                break;
            case 'DELETE':
                this.raw.delete(url, endpoint.execute);
                break;
            case 'OPTIONS':
                this.raw.options(url, endpoint.execute);
                break;
            default:
                throw new index_1.ExpressCustomError(`Invalid method ${String(endpoint.method)}`);
        }
        return this;
    }
    /**
     * Adds all endpoints from an endpoint file to the route.
     * @param endpointFile The endpoint file to add endpoints from.
     * @returns The current Route instance.
     */
    addEndpointFile(endpointFile) {
        for (const value of Object.values(endpointFile)) {
            this.addEndpoint(value);
        }
        return this;
    }
    /**
     * Validates the current Route instance.
     * @throws Throws an error if the route is invalid.
     */
    validate() {
        // If the route has no endpoints
        if (this.endpoints.length === 0)
            throw new index_1.ExpressCustomError(`Route ${this.name} has no endpoints`);
    }
    /**
     * Exports the route to a JSON object.
     * @returns The exported route as a JSON object.
     */
    export() {
        return {
            name: this.name,
            description: this.description,
            path: this.path,
            endpoints: this.endpoints.map((endpoint) => endpoint.export()),
        };
    }
}
exports.default = Route;
