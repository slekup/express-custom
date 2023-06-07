"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const PackageError_1 = __importDefault(require("@utils/PackageError"));
const BaseApp_1 = __importDefault(require("./Base/BaseApp"));
const Schema_1 = __importDefault(require("./Schema"));
/**
 * The version builder class.
 */
class VersionBuilder extends BaseApp_1.default {
    version;
    groups;
    /**
     * Creates a new version builder.
     * @param config The configuration of the API.
     * @param config.version The version of the API.
     */
    constructor({ version }) {
        super('app');
        const constructorSchema = new Schema_1.default().addNumber({
            name: 'version',
            required: true,
            min: 1,
            max: 10_000,
        });
        constructorSchema.validate({ version }).then((result) => {
            if (typeof result === 'string')
                throw new PackageError_1.default(result);
        });
        this.groups = [];
        this.version = version;
    }
    /**
     * Sets the global rate limit for the version.
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
     * Adds a group to the API.
     * @param group The group to add.
     * @returns The API builder.
     */
    addGroup(group) {
        this.groups.push(group);
        const groupValues = group.values();
        this.raw.use(`v${this.version}`, groupValues.raw);
        return this;
    }
    /**
     * Adds a group to the API.
     * @returns The API data.
     */
    export() {
        return {
            version: this.version,
            rateLimit: this.ratelimit,
            groups: this.groups.map((group) => group.export()),
        };
    }
    /**
     * Gets the version values.
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
        if (!this.groups.length)
            throw new PackageError_1.default('No groups provided');
        this.groups.forEach((group) => group.validate());
    }
}
exports.default = VersionBuilder;
