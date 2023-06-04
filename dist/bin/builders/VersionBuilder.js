"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const BaseAppBuilder_1 = __importDefault(require("./Base/BaseAppBuilder"));
const SchemaBuilder_1 = __importDefault(require("./SchemaBuilder"));
/**
 * The version builder class.
 */
class VersionBuilder extends BaseAppBuilder_1.default {
    version;
    routers;
    /**
     * Creates a new version builder.
     * @param config The configuration of the API.
     * @param config.version The version of the API.
     */
    constructor({ version }) {
        super('app');
        const constructorSchema = new SchemaBuilder_1.default().addNumber((option) => option.setName('version').setRequired(true).setMin(1).setMax(10_000));
        constructorSchema.validate({ version }).then((result) => {
            if (typeof result === 'string')
                throw new Error(result);
        });
        this.routers = [];
        this.version = version;
    }
    /**
     * Adds a router to the API.
     * @param options The options of the rate limit.
     * @param showInDocs Whether to show the rate limit in the docs.
     * @returns The API builder.
     */
    setRateLimit(options, showInDocs) {
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
        this.raw.use(`v${this.version}`, (0, express_rate_limit_1.default)(options));
        return this;
    }
    /**
     * Adds a router to the API.
     * @param router The router to add.
     * @returns The API builder.
     */
    addRouter(router) {
        this.routers.push(router);
        const routerValues = router.values();
        this.raw.use(`v${this.version}`, routerValues.raw);
        return this;
    }
    /**
     * Adds a router to the API.
     * @returns The API data.
     */
    export() {
        return {
            version: this.version,
            rateLimit: this.ratelimit,
            routers: this.routers.map((router) => router.export()),
        };
    }
    /**
     * Adds a router to the API.
     * @returns The API data.
     */
    values() {
        return {
            path: `/v${this.version}`,
            raw: this.raw,
            version: this.version,
        };
    }
    /**
     * Validates the version builder.
     */
    validate() {
        if (!this.routers.length)
            throw new Error('No routers provided');
        this.routers.forEach((router) => router.validate());
    }
}
exports.default = VersionBuilder;
