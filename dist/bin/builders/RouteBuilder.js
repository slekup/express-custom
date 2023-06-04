"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BaseAppBuilder_1 = __importDefault(require("./Base/BaseAppBuilder"));
const SchemaBuilder_1 = __importDefault(require("./SchemaBuilder"));
/**
 * The route builder class.
 */
class RouteBuilder extends BaseAppBuilder_1.default {
    raw = (0, express_1.Router)();
    path;
    name;
    description;
    endpoints = [];
    /**
     * Creates a new route.
     * @param options The options for the route.
     * @param options.path The path of the route.
     * @param options.name The name of the route.
     * @param options.description The description of the route.
     */
    constructor({ path, name, description, }) {
        super();
        const constructorSchema = new SchemaBuilder_1.default()
            .addString((option) => option
            .setName('path')
            .setRequired(true)
            .setMin(1)
            .setMax(100)
            .setTest('path'))
            .addString((option) => option.setName('name').setRequired(true).setMin(1).setMax(50))
            .addString((option) => option.setName('description').setRequired(true).setMin(1).setMax(1000));
        constructorSchema.validate({ name, description, path }).then((result) => {
            if (typeof result === 'string')
                throw new Error(`Route (${name || path}): ${result}`);
        });
        this.path = path;
        this.name = name;
        this.description = description;
    }
    /**
     * Adds an endpoint to the route.
     * @param endpoint The endpoint to add to the route.
     * @returns The router builder.
     */
    addEndpoint(endpoint) {
        this.endpoints.push(endpoint);
        // Replace multiple slashes with a single slash.
        const doubleSlashRegex = /\/+/g;
        const url = `${this.path}${endpoint.path}`.replaceAll(doubleSlashRegex, '/');
        switch (endpoint.method) {
            case 'GET':
                this.raw.get(url, endpoint.controller);
                break;
            case 'POST':
                this.raw.post(url, endpoint.controller);
                break;
            case 'PUT':
                this.raw.put(url, endpoint.controller);
                break;
            case 'PATCH':
                this.raw.patch(url, endpoint.controller);
                break;
            case 'DELETE':
                this.raw.delete(url, endpoint.controller);
                break;
            case 'OPTIONS':
                this.raw.options(url, endpoint.controller);
                break;
            default:
                throw new Error(`Invalid method ${String(endpoint.method)}`);
        }
        return this;
    }
    /**
     * Adds all endpoints from an endpoint file to the route.
     * @param endpointFile The endpoint file to add endpoints from.
     * @returns The route builder.
     */
    addEndpointFile(endpointFile) {
        for (const value of Object.values(endpointFile)) {
            this.addEndpoint(value);
        }
        return this;
    }
    /**
     * Validates the route.
     */
    validate() {
        if (this.endpoints.length === 0)
            throw new Error(`Route ${this.name} has no endpoints`);
    }
    /**
     * Exports the route.
     * @returns The exported route.
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
exports.default = RouteBuilder;
