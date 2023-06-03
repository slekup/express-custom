"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAppBuilder_1 = __importDefault(require("./Base/BaseAppBuilder"));
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
}
exports.default = RouterBuilder;
