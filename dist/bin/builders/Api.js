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
const index_1 = require("@utils/index");
const middleware_1 = require("@utils/middleware");
const logger_1 = __importStar(require("../bin/utils/logger"));
const BaseApp_1 = __importDefault(require("./Base/BaseApp"));
const Schema_1 = __importDefault(require("./Schema"));
/**
 * The ApiBuilder class, used to build an API.
 */
class Api extends BaseApp_1.default {
    port;
    versions;
    groups;
    url;
    structures;
    config;
    /**
     * Creates a new instance of the ApiBuilder class.
     * @param options The ApiBuilder class options.
     * @param options.url The Base URL of the API to as the root (reference) for the API.
     * @param options.port The port the API will listen on when running the start() method.
     * @param options.structures The structures used in the API endpoint schemas.
     */
    constructor(options) {
        super('app');
        // The constructor schema.
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
        // Validate the constructor against the schema.
        constructorSchema.validate(options).then((result) => {
            if (typeof result === 'string')
                throw new index_1.ExpressCustomError(`Api: ${result}`);
        });
        // Assign the options to the class.
        this.versions = [];
        this.groups = [];
        this.url = options.url;
        this.port = options.port;
        this.structures = options.structures ?? [];
    }
    /**
     * Adds a version to the API.
     * @param version An instance of the Version class.
     * @returns The current Api instance.
     */
    addVersion(version) {
        this.versions.push(version);
        const versionValues = version.values();
        this.raw.use(versionValues.path, versionValues.raw);
        return this;
    }
    /**
     * Adds a group directly to the API without a version.
     * @param group An instance of the Group class.
     * @returns The current Api instance.
     */
    addGroup(group) {
        this.groups.push(group);
        const groupValues = group.values();
        this.raw.use(groupValues.path, groupValues.raw);
        return this;
    }
    /**
     * Starts the API server.
     * @param callback The callback function to run when the API is initialized. Can be async.
     * @returns The HTTP server (http.Server).
     */
    start(callback) {
        // Validate the API and all of its children before starting the server.
        this.validate();
        // Set the root route to display basic API information.
        this.raw.get('/', (__, res) => res.json({
            message: `API Root`,
            versions: this.versions.map((version) => {
                const versionValues = version.values();
                return {
                    version: `v${versionValues.version}`,
                    url: `${this.url}/v${versionValues.version}`,
                };
            }),
        }));
        // Set the 404 and error handler middleware.
        this.raw.use(middleware_1.errorMiddleware.notFound);
        this.raw.use(middleware_1.errorMiddleware.errorHandler);
        // Start the API server.
        const server = this.raw.listen(this.port, callback);
        return server;
    }
    /**
     * Loads the configuration of the API from express-custom.json or package.json > "express-custom".
     * @returns The configuration of the API.
     */
    async loadConfig() {
        let config = {};
        // Get the path to the config file.
        const configPath = path_1.default.join(process.cwd(), 'express-custom.json');
        try {
            // Read the config file.
            const configFile = await fs_1.default.promises.readFile(configPath, 'utf-8');
            try {
                // Parse the JSON
                config = JSON.parse(configFile.toString());
            }
            catch (error) {
                logger_1.default.error(`${logger_1.cli.error} Failed to parse config.json file (invalid JSON).`);
                throw new index_1.ExpressCustomError(error);
            }
        }
        catch (error) {
            // Log an warning if the config file doesn't exist.
            logger_1.default.warn(`${logger_1.cli.warning} No express-custom.json found, trying package.json`);
            try {
                // Read the package.json file.
                const packageJSON = await fs_1.default.promises.readFile(path_1.default.join(process.cwd(), 'package.json'));
                try {
                    // Parse the JSON and get the "express-custom" block.
                    const configFile = JSON.parse(packageJSON.toString())['express-custom'];
                    // Check if the "express-custom" block exists and is an object.
                    if (typeof configFile !== 'object') {
                        logger_1.default.error(`${logger_1.cli.error} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                        throw new index_1.ExpressCustomError('Invalid JSON');
                    }
                    // Set the config to the "express-custom" block.
                    config = configFile;
                }
                catch (error) {
                    // Throw an error if the "express-custom" block doesn't exist.
                    logger_1.default.error(`${logger_1.cli.error} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                    throw new index_1.ExpressCustomError(error);
                }
            }
            catch (error) {
                // Throw an error if the package.json file doesn't exist.
                logger_1.default.error(`${logger_1.cli.error} Failed to load express-custom config from package.json`);
                throw new index_1.ExpressCustomError(error);
            }
        }
        // Regex to check if the file is a JavaScript or TypeScript file.
        const fileExtRegex = /\.ts$|\.js$/;
        // Create the config schema.
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
        // Test the config against the schema.
        const result = await configSchema.validate(config);
        // If the result is a string, the config is invalid, log the error and exit the process.
        if (typeof result === 'string') {
            logger_1.default.error(`${logger_1.cli.error} Validation error while processing express-config.json`);
            logger_1.default.error(`${logger_1.cli.error} Error: ${result}`);
            process.exit(1);
        }
        // Get the validated config and assign it to the API instance.
        const validatedConfig = config;
        this.config = validatedConfig;
        return validatedConfig;
    }
    /**
     * Gets the configuration of the API.
     * @returns The configuration of the API.
     */
    async getConfig() {
        // If the config is already loaded, return it.
        if (this.config)
            return this.config;
        // Otherwise, load the config and return it.
        const config = await this.loadConfig();
        return config;
    }
    /**
     * Validates the API instance and all of it's children instances.
     * @throws An error if the API instance or any of it's children instances are invalid.
     */
    validate() {
        if (this.versions.length === 0 && this.groups.length === 0)
            throw new index_1.ExpressCustomError('No versions or groups provided to the API');
        this.versions.forEach((version) => version.validate());
        this.groups.forEach((group) => group.validate());
    }
    /**
     * Exports the Api class properties to a JSON object.
     * @returns The exported API as a JSON object.
     */
    async export() {
        // Get the config.
        const config = await this.getConfig();
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
