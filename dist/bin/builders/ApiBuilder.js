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
const middleware_1 = require("@utils/middleware");
const logger_1 = __importStar(require("../bin/utils/logger"));
const BaseAppBuilder_1 = __importDefault(require("./Base/BaseAppBuilder"));
const SchemaBuilder_1 = __importDefault(require("./SchemaBuilder"));
/**
 * The ApiBuilder class is used to build the API.
 */
class ApiBuilder extends BaseAppBuilder_1.default {
    port;
    versions;
    baseUrl;
    structures;
    /**
     * The constructor of the ApiBuilder class.
     * @param config The configuration of the API.
     * @param config.baseUrl The base URL of the API.
     * @param config.port The port of the API.
     * @param config.structures The structures of the API.
     */
    constructor({ baseUrl, port, structures, }) {
        super('app');
        this.versions = [];
        this.baseUrl = baseUrl;
        this.port = port;
        this.structures = structures ?? [];
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
     * Initializes the API.
     * @param callback The callback to run when the API is initialized.
     * @returns The server.
     */
    startServer(callback) {
        this.raw.get('/', (req, res) => res.json({
            message: 'Welcome to Slekup API',
            versions: this.versions.map((version) => ({
                version: `v${version.values().version}`,
                url: `${this.baseUrl}/v${version.values().version}`,
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
    static loadConfig = async () => {
        let config = {};
        const configPath = path_1.default.join(process.cwd(), 'express-custom.json');
        try {
            const configFile = await fs_1.default.promises.readFile(configPath, 'utf-8');
            try {
                config = JSON.parse(configFile.toString());
            }
            catch (error) {
                logger_1.default.error(`${logger_1.cli.err} Failed to parse config.json file (invalid JSON).`);
                throw new Error(error);
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
                        throw new Error('Invalid JSON');
                    }
                    config = configFile;
                }
                catch (error) {
                    logger_1.default.error(`${logger_1.cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                    throw new Error(error);
                }
            }
            catch (error) {
                // Failed to read package.json
                logger_1.default.error(`${logger_1.cli.err} Failed to load express-custom config from package.json`);
                throw new Error(error);
            }
        }
        const fileExtRegex = /\.ts$|\.js$/;
        const configSchema = new SchemaBuilder_1.default()
            .addString((option) => option
            .setName('file')
            .setRequired(true)
            .setMax(256)
            .addCheck({
            /**
             * Checks if the value ends with .ts or .js.
             * @param value The value to check.
             * @returns Whether the value passes the check.
             */
            run: (value) => fileExtRegex.test(value),
            response: 'The file must be a JavaScript or TypeScript file (.js or .ts).',
        }))
            .addString((value) => value.setName('output').setDefault('docs').setMax(256))
            .addString((option) => option.setName('name').setDefault('My API'))
            .addString((option) => option.setName('description').setDefault('Made with Express Custom'))
            .addString((option) => option.setName('logo').setDefault('/logo.png'))
            .addString((option) => option.setName('customDir').setMax(256))
            .addString((option) => option.setName('theme').setDefault('default'))
            .addString((option) => option.setName('codeTheme').setDefault('framer'))
            .addObject((option) => option
            .setName('socials')
            .setDefault({})
            .setProperties({
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
        }));
        const result = await configSchema.validate(config);
        if (typeof result === 'string') {
            logger_1.default.error(`${logger_1.cli.err} Validation error while processing express-config.json`);
            logger_1.default.error(`${logger_1.cli.err} Error: ${result}`);
            process.exit(1);
        }
        const validatedConfig = config;
        return validatedConfig;
    };
    /**
     * Adds a router to the API.
     * @returns The API data.
     */
    async export() {
        if (!this.baseUrl)
            throw new Error('The base URL of the API is not set.');
        if (!this.port)
            throw new Error('The port of the API is not set.');
        logger_1.default.info('Running export');
        const config = await ApiBuilder.loadConfig();
        return {
            ...config,
            baseUrl: this.baseUrl,
            port: this.port,
            structures: this.structures,
            rateLimit: this.ratelimit,
            versions: this.versions.map((version) => version.export()),
        };
    }
}
exports.default = ApiBuilder;
