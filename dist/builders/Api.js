import fs from 'fs';
import path from 'path';
import ExpressCustomError from '@utils/ExpressCustomError';
import { errorMiddleware } from '@utils/middleware';
import logger, { cli } from '../bin/utils/logger';
import BaseApp from './Base/BaseApp';
import Schema from './Schema';
/**
 * The ApiBuilder class, used to build an API.
 */
export default class Api extends BaseApp {
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
        const constructorSchema = new Schema()
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
                throw new ExpressCustomError(`Api: ${result}`);
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
            message: `Welcome to ${this.config?.name ?? 'the API'}`,
            versions: this.versions.map((version) => ({
                version: `v${version.values().version}`,
                url: `${this.url}/v${version.values().version}`,
            })),
        }));
        // Set the 404 and error handler middleware.
        this.raw.use(errorMiddleware.notFound);
        this.raw.use(errorMiddleware.errorHandler);
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
        const configPath = path.join(process.cwd(), 'express-custom.json');
        try {
            // Read the config file.
            const configFile = await fs.promises.readFile(configPath, 'utf-8');
            try {
                // Parse the JSON
                config = JSON.parse(configFile.toString());
            }
            catch (error) {
                logger.error(`${cli.error} Failed to parse config.json file (invalid JSON).`);
                throw new ExpressCustomError(error);
            }
        }
        catch (error) {
            // Log an warning if the config file doesn't exist.
            logger.warn(`${cli.warning} No express-custom.json found, trying package.json`);
            try {
                // Read the package.json file.
                const packageJSON = await fs.promises.readFile(path.join(process.cwd(), 'package.json'));
                try {
                    // Parse the JSON and get the "express-custom" block.
                    const configFile = JSON.parse(packageJSON.toString())['express-custom'];
                    // Check if the "express-custom" block exists and is an object.
                    if (typeof configFile !== 'object') {
                        logger.error(`${cli.error} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                        throw new ExpressCustomError('Invalid JSON');
                    }
                    // Set the config to the "express-custom" block.
                    config = configFile;
                }
                catch (error) {
                    // Throw an error if the "express-custom" block doesn't exist.
                    logger.error(`${cli.error} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                    throw new ExpressCustomError(error);
                }
            }
            catch (error) {
                // Throw an error if the package.json file doesn't exist.
                logger.error(`${cli.error} Failed to load express-custom config from package.json`);
                throw new ExpressCustomError(error);
            }
        }
        // Regex to check if the file is a JavaScript or TypeScript file.
        const fileExtRegex = /\.ts$|\.js$/;
        // Create the config schema.
        const configSchema = new Schema()
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
            logger.error(`${cli.error} Validation error while processing express-config.json`);
            logger.error(`${cli.error} Error: ${result}`);
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
            throw new ExpressCustomError('No versions or groups provided to the API');
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
//# sourceMappingURL=Api.js.map