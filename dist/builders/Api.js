import fs from 'fs';
import path from 'path';
import ExpressCustomError from '@utils/ExpressCustomError';
import { errorMiddleware } from '@utils/middleware';
import logger, { cli } from '../bin/utils/logger';
import BaseApp from './Base/BaseApp';
import SchemaBuilder from './Schema';
/**
 * The ApiBuilder class is used to build the API.
 */
export default class Api extends BaseApp {
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
        const constructorSchema = new SchemaBuilder()
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
                throw new ExpressCustomError(`Api: ${result}`);
        });
        this.versions = [];
        this.groups = [];
        this.url = options.url;
        this.port = options.port;
        this.structures = options.structures ?? [];
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
        this.raw.use(errorMiddleware.notFound);
        this.raw.use(errorMiddleware.errorHandler);
        const server = this.raw.listen(this.port, callback);
        return server;
    }
    /**
     * Loads the configuration of the API.
     * @returns The configuration of the API.
     */
    async loadConfig() {
        let config = {};
        const configPath = path.join(process.cwd(), 'express-custom.json');
        try {
            const configFile = await fs.promises.readFile(configPath, 'utf-8');
            try {
                config = JSON.parse(configFile.toString());
            }
            catch (error) {
                logger.error(`${cli.err} Failed to parse config.json file (invalid JSON).`);
                throw new ExpressCustomError(error);
            }
        }
        catch (error) {
            logger.error(`${cli.err} No express-custom.json found, trying package.json`);
            try {
                // Read package.json
                const packageJSON = await fs.promises.readFile(path.join(process.cwd(), 'package.json'));
                // Parse the JSON
                try {
                    const configFile = JSON.parse(packageJSON.toString())['express-custom'];
                    if (typeof configFile !== 'object') {
                        logger.error(`${cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                        throw new ExpressCustomError('Invalid JSON');
                    }
                    config = configFile;
                }
                catch (error) {
                    logger.error(`${cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                    throw new ExpressCustomError(error);
                }
            }
            catch (error) {
                // Failed to read package.json
                logger.error(`${cli.err} Failed to load express-custom config from package.json`);
                throw new ExpressCustomError(error);
            }
        }
        const fileExtRegex = /\.ts$|\.js$/;
        const configSchema = new SchemaBuilder()
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
            logger.error(`${cli.err} Validation error while processing express-config.json`);
            logger.error(`${cli.err} Error: ${result}`);
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
            throw new ExpressCustomError('No versions or groups provided to the API');
        this.versions.forEach((version) => version.validate());
        this.groups.forEach((group) => group.validate());
    }
    /**
     * Adds a group to the API.
     * @returns The API data.
     */
    async export() {
        if (!this.url)
            throw new ExpressCustomError('The base URL of the API is not set.');
        if (!this.port)
            throw new ExpressCustomError('The port of the API is not set.');
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
//# sourceMappingURL=Api.js.map