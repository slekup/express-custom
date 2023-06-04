"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
/**
 * Base app builder class.
 */
class BaseAppBuilder {
    raw;
    ratelimit;
    middlewares;
    /**
     * Creates an instance of the base app builder class.
     * Router is the default type, so only pass 'app' to create an express app.
     * @param type The type of the builder.
     */
    constructor(type = 'router') {
        if (type === 'app') {
            this.raw = (0, express_1.default)();
        }
        else {
            this.raw = (0, express_1.Router)();
        }
        this.middlewares = [];
    }
    /**
     * Adds a router to the API.
     * @param options The options of the rate limit.
     * @param showInDocs Whether to show the rate limit in the docs.
     * @returns The API builder.
     */
    setRateLimit(options, showInDocs) {
        if (this.ratelimit)
            throw new Error('Rate limit already set.');
        // If showInDocs is undefined, it will default to true.
        if (showInDocs || showInDocs === undefined)
            this.ratelimit = {
                statusCode: options.statusCode ?? 429,
                ...(typeof options.windowMs === 'number'
                    ? { window: options.windowMs }
                    : {}),
                ...(typeof options.max === 'number' ? { max: options.max } : {}),
            };
        // Use the express-rate-limit middleware.
        this.raw.use((0, express_rate_limit_1.rateLimit)(options));
        return this;
    }
    /**
     * Adds a middleware to the route. Add it before adding the route.
     * @param middleware The middleware to add to the route.
     * @returns The router builder.
     */
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
        this.raw.use(middleware);
        return this;
    }
}
exports.default = BaseAppBuilder;
