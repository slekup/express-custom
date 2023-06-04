"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAppBuilder_1 = __importDefault(require("./Base/BaseAppBuilder"));
const SchemaBuilder_1 = __importDefault(require("./SchemaBuilder"));
/**
 * The router builder class.
 */
class RouterBuilder extends BaseAppBuilder_1.default {
    path;
    name;
    routes;
    /**
     * Creates a new router builder.
     * @param params The router parameters.
     * @param params.path The path of the router.
     * @param params.name The name of the router.
     */
    constructor({ path, name }) {
        super();
        const constructorSchema = new SchemaBuilder_1.default()
            .addString((option) => option
            .setName('path')
            .setRequired(true)
            .setMin(1)
            .setMax(100)
            .setTest('path'))
            .addString((option) => option.setName('name').setRequired(true).setMin(1).setMax(50));
        constructorSchema.validate({ path, name }).then((result) => {
            if (typeof result === 'string')
                throw new Error(`Router (${name || path}): ${result}`);
        });
        this.path = path;
        this.name = name;
        this.routes = [];
    }
    /**
     * Uses a router.
     * @param route The router to use.
     * @returns The router builder.
     */
    addRoute(route) {
        this.routes.push(route);
        this.raw.use(this.path, route.raw);
        return this;
    }
    /**
     * Returns the router values.
     * @returns The router values.
     */
    values() {
        return {
            raw: this.raw,
            ratelimit: this.ratelimit,
            path: this.path,
            defaultCategory: this.name,
            routes: this.routes,
            middlewares: this.middlewares,
        };
    }
    /**
     * Validates the router.
     */
    validate() {
        if (!this.routes.length)
            throw new Error('No routes provided');
        this.routes.forEach((route) => route.validate());
    }
    /**
     * Exports the routes and endpoints data.
     * @returns The exported data.
     */
    export() {
        return {
            name: this.name,
            path: this.path,
            routes: this.routes.map((route) => route.export()),
        };
    }
}
exports.default = RouterBuilder;
