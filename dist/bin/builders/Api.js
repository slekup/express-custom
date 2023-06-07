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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ExpressCustomError_1 = __importDefault(require("@utils/ExpressCustomError"));
const middleware_1 = require("@utils/middleware");
const logger_1 = __importStar(require("../bin/utils/logger"));
const BaseApp_1 = __importDefault(require("./Base/BaseApp"));
const Schema_1 = __importDefault(require("./Schema"));
/**
 * The ApiBuilder class is used to build the API.
 */
class Api extends BaseApp_1.default {
    port;
    versions;
    groups;
    url;
    structures;
    config;
    /**
     * The constructor of the ApiBuilder class.
     * @param options The configuration of the API.
     * @param options.url The base URL of the API.
     * @param options.port The port of the API.
     * @param options.structures The structures of the API.
     */
    constructor(options) {
        super('app');
        const constructorSchema = new Schema_1.default()
            .addString({
            name: 'url',
            required: true,
            min: 1,
            max: 100,
        })
            .addNumber({
            name: 'port',
            required: true,
            min: 0,
            max: 65536,
        });
        constructorSchema.validate(options).then((result) => {
            if (typeof result === 'string')
                throw new ExpressCustomError_1.default(`Api: ${result}`);
        });
        this.versions = [];
        this.groups = [];
        this.url = options.url;
        this.port = options.port;
        this.structures = options.structures ?? [];
        this.config = undefined;
    }
    /**
     * Adds a version to the API.
     * @param version The version to add.
     * @returns The API builder.
     */
    addVersion(version) {
        this.versions.push(version);
        const versionValues = version.values();
        this.raw.use(versionValues.path, versionValues.raw);
        return this;
    }
    /**
     * Adds a group directly to the API without a version.
     * @param group An instance of the GroupBuilder class.
     * @returns The API builder.
     */
    addGroup(group) {
        this.groups.push(group);
        const groupValues = group.values();
        this.raw.use(groupValues.path, groupValues.raw);
        return this;
    }
    /**
     * Initializes the API.
     * @param callback The callback to run when the API is initialized.
     * @returns The server.
     */
    start(callback) {
        this.validate();
        this.raw.get('/', (__, res) => res.json({
            message: `Welcome to ${this.config?.name ?? 'the API'}`,
            versions: this.versions.map((version) => ({
                version: `v${version.values().version}`,
                url: `${this.url}/v${version.values().version}`,
            })),
        }));
        this.raw.use(middleware_1.errorMiddleware.notFound);
        this.raw.use(middleware_1.errorMiddleware.errorHandler);
        const server = this.raw.listen(this.port, callback);
        return server;
    }
    /**
     * Loads the configuration of the API.
     * @returns The configuration of the API.
     */
    async loadConfig() {
        let config = {};
        const configPath = path_1.default.join(process.cwd(), 'express-custom.json');
        try {
            const configFile = await fs_1.default.promises.readFile(configPath, 'utf-8');
            try {
                config = JSON.parse(configFile.toString());
            }
            catch (error) {
                logger_1.default.error(`${logger_1.cli.err} Failed to parse config.json file (invalid JSON).`);
                throw new ExpressCustomError_1.default(error);
            }
        }
        catch (error) {
            logger_1.default.error(`${logger_1.cli.err} No express-custom.json found, trying package.json`);
            try {
                // Read package.json
                const packageJSON = await fs_1.default.promises.readFile(path_1.default.join(process.cwd(), 'package.json'));
                // Parse the JSON
                try {
                    const configFile = JSON.parse(packageJSON.toString())['express-custom'];
                    if (typeof configFile !== 'object') {
                        logger_1.default.error(`${logger_1.cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                        throw new ExpressCustomError_1.default('Invalid JSON');
                    }
                    config = configFile;
                }
                catch (error) {
                    logger_1.default.error(`${logger_1.cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                    throw new ExpressCustomError_1.default(error);
                }
            }
            catch (error) {
                // Failed to read package.json
                logger_1.default.error(`${logger_1.cli.err} Failed to load express-custom config from package.json`);
                throw new ExpressCustomError_1.default(error);
            }
        }
        const fileExtRegex = /\.ts$|\.js$/;
        const configSchema = new Schema_1.default()
            .addString({
            name: 'file',
            required: true,
            max: 256,
            checks: [
                [
                    (value) => fileExtRegex.test(value),
                    'The file must be a JavaScript or TypeScript file (.js or .ts).',
                ],
            ],
        })
            .addString({
            name: 'output',
            max: 256,
            defaultValue: 'docs',
        })
            .addString({
            name: 'name',
            defaultValue: 'My API',
        })
            .addString({
            name: 'description',
            defaultValue: 'Made with Express Custom',
        })
            .addString({
            name: 'logo',
            defaultValue: '/logo.png',
        })
            .addString({
            name: 'customDir',
            max: 256,
        })
            .addString({
            name: 'theme',
            defaultValue: 'default',
        })
            .addString({
            name: 'codeTheme',
            defaultValue: 'framer',
        })
            .addObject({
            name: 'socials',
            defaultValue: {},
            properties: {
                discord: {
                    type: 'string',
                },
                github: {
                    type: 'string',
                },
                instagram: {
                    type: 'string',
                },
                facebook: {
                    type: 'string',
                },
                linkedin: {
                    type: 'string',
                },
                youtube: {
                    type: 'string',
                },
                twitter: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
            },
        });
        const result = await configSchema.validate(config);
        if (typeof result === 'string') {
            logger_1.default.error(`${logger_1.cli.err} Validation error while processing express-config.json`);
            logger_1.default.error(`${logger_1.cli.err} Error: ${result}`);
            process.exit(1);
        }
        const validatedConfig = config;
        this.config = validatedConfig;
        return validatedConfig;
    }
    /**
     * Gets the configuration of the API.
     * @returns The configuration of the API.
     */
    async getConfig() {
        if (this.config)
            return this.config;
        const config = await this.loadConfig();
        return config;
    }
    /**
     * Validates the API instance.
     */
    validate() {
        if (this.versions.length === 0 && this.groups.length === 0)
            throw new ExpressCustomError_1.default('No versions or groups provided to the API');
        this.versions.forEach((version) => version.validate());
        this.groups.forEach((group) => group.validate());
    }
    /**
     * Adds a group to the API.
     * @returns The API data.
     */
    async export() {
        if (!this.url)
            throw new ExpressCustomError_1.default('The base URL of the API is not set.');
        if (!this.port)
            throw new ExpressCustomError_1.default('The port of the API is not set.');
        const config = await this.loadConfig();
        return {
            ...config,
            url: this.url,
            port: this.port,
            structures: this.structures.map((structure) => structure.export()),
            rateLimit: this.ratelimit,
            versions: this.versions.map((version) => version.export()),
            groups: this.groups.map((group) => group.export()),
        };
    }
}
exports.default = Api;
