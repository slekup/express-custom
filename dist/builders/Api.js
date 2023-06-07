import fs from 'fs';
import path from 'path';
import PackageError from '@utils/PackageError';
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
    baseUrl;
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
                throw new PackageError(result);
        });
        this.versions = [];
        this.groups = [];
        this.baseUrl = options.url;
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
                url: `${this.baseUrl}/v${version.values().version}`,
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
                throw new PackageError(error);
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
                        throw new PackageError('Invalid JSON');
                    }
                    config = configFile;
                }
                catch (error) {
                    logger.error(`${cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                    throw new PackageError(error);
                }
            }
            catch (error) {
                // Failed to read package.json
                logger.error(`${cli.err} Failed to load express-custom config from package.json`);
                throw new PackageError(error);
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
            throw new PackageError('No versions or groups provided to the API');
        this.versions.forEach((version) => version.validate());
        this.groups.forEach((group) => group.validate());
    }
    /**
     * Adds a group to the API.
     * @returns The API data.
     */
    async export() {
        if (!this.baseUrl)
            throw new PackageError('The base URL of the API is not set.');
        if (!this.port)
            throw new PackageError('The port of the API is not set.');
        const config = await this.loadConfig();
        return {
            ...config,
            baseUrl: this.baseUrl,
            port: this.port,
            structures: this.structures.map((structure) => structure.export()),
            rateLimit: this.ratelimit,
            versions: this.versions.map((version) => version.export()),
            groups: this.groups.map((group) => group.export()),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2J1aWxkZXJzL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFcEIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBR3hCLE9BQU8sWUFBWSxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sT0FBTyxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sYUFBYSxNQUFNLFVBQVUsQ0FBQztBQUlyQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sR0FBSSxTQUFRLE9BQWM7SUFDckMsSUFBSSxDQUFTO0lBQ2IsUUFBUSxDQUFtQjtJQUMzQixNQUFNLENBQWlCO0lBQ3ZCLE9BQU8sQ0FBUztJQUNoQixVQUFVLENBQXFCO0lBQy9CLE1BQU0sQ0FBVTtJQUV4Qjs7Ozs7O09BTUc7SUFDSCxZQUFtQixPQUlsQjtRQUNDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUViLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxhQUFhLEVBQUU7YUFDMUMsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLEtBQUs7WUFDWCxRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLEdBQUc7U0FDVCxDQUFDO2FBQ0QsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLEtBQUs7U0FDWCxDQUFDLENBQUM7UUFFTCxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7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QUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxRCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNuRCxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSAnaHR0cCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnLCBFeHBvcnRlZEFwaSB9IGZyb20gJ0B0eXBpbmdzL2V4cG9ydHMnO1xyXG5pbXBvcnQgUGFja2FnZUVycm9yIGZyb20gJ0B1dGlscy9QYWNrYWdlRXJyb3InO1xyXG5pbXBvcnQgeyBlcnJvck1pZGRsZXdhcmUgfSBmcm9tICdAdXRpbHMvbWlkZGxld2FyZSc7XHJcbmltcG9ydCBsb2dnZXIsIHsgY2xpIH0gZnJvbSAnLi4vYmluL3V0aWxzL2xvZ2dlcic7XHJcbmltcG9ydCBCYXNlQXBwIGZyb20gJy4vQmFzZS9CYXNlQXBwJztcclxuaW1wb3J0IEdyb3VwQnVpbGRlciBmcm9tICcuL0dyb3VwJztcclxuaW1wb3J0IFNjaGVtYUJ1aWxkZXIgZnJvbSAnLi9TY2hlbWEnO1xyXG5pbXBvcnQgU3RydWN0dXJlQnVpbGRlciBmcm9tICcuL1N0cnVjdHVyZSc7XHJcbmltcG9ydCBWZXJzaW9uQnVpbGRlciBmcm9tICcuL1ZlcnNpb24nO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBBcGlCdWlsZGVyIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIEFQSS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSBleHRlbmRzIEJhc2VBcHA8J2FwcCc+IHtcclxuICBwcml2YXRlIHBvcnQ6IG51bWJlcjtcclxuICBwcml2YXRlIHZlcnNpb25zOiBWZXJzaW9uQnVpbGRlcltdO1xyXG4gIHByaXZhdGUgZ3JvdXBzOiBHcm91cEJ1aWxkZXJbXTtcclxuICBwcml2YXRlIGJhc2VVcmw6IHN0cmluZztcclxuICBwcml2YXRlIHN0cnVjdHVyZXM6IFN0cnVjdHVyZUJ1aWxkZXJbXTtcclxuICBwcml2YXRlIGNvbmZpZz86IENvbmZpZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBBcGlCdWlsZGVyIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBBUEkuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMudXJsIFRoZSBiYXNlIFVSTCBvZiB0aGUgQVBJLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLnBvcnQgVGhlIHBvcnQgb2YgdGhlIEFQSS5cclxuICAgKiBAcGFyYW0gb3B0aW9ucy5zdHJ1Y3R1cmVzIFRoZSBzdHJ1Y3R1cmVzIG9mIHRoZSBBUEkuXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IHtcclxuICAgIHVybDogc3RyaW5nO1xyXG4gICAgcG9ydDogbnVtYmVyO1xyXG4gICAgc3RydWN0dXJlcz86IFN0cnVjdHVyZUJ1aWxkZXJbXTtcclxuICB9KSB7XHJcbiAgICBzdXBlcignYXBwJyk7XHJcblxyXG4gICAgY29uc3QgY29uc3RydWN0b3JTY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpXHJcbiAgICAgIC5hZGRTdHJpbmcoe1xyXG4gICAgICAgIG5hbWU6ICd1cmwnLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAgICBtYXg6IDEwMCxcclxuICAgICAgfSlcclxuICAgICAgLmFkZE51bWJlcih7XHJcbiAgICAgICAgbmFtZTogJ3BvcnQnLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIG1pbjogMCxcclxuICAgICAgICBtYXg6IDY1NTM2LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvclNjaGVtYS52YWxpZGF0ZShvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgUGFja2FnZUVycm9yKHJlc3VsdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnZlcnNpb25zID0gW107XHJcbiAgICB0aGlzLmdyb3VwcyA9IFtdO1xyXG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy51cmw7XHJcbiAgICB0aGlzLnBvcnQgPSBvcHRpb25zLnBvcnQ7XHJcbiAgICB0aGlzLnN0cnVjdHVyZXMgPSBvcHRpb25zLnN0cnVjdHVyZXMgPz8gW107XHJcbiAgICB0aGlzLmNvbmZpZyA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSB2ZXJzaW9uIHRvIHRoZSBBUEkuXHJcbiAgICogQHBhcmFtIHZlcnNpb24gVGhlIHZlcnNpb24gdG8gYWRkLlxyXG4gICAqIEByZXR1cm5zIFRoZSBBUEkgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkVmVyc2lvbih2ZXJzaW9uOiBWZXJzaW9uQnVpbGRlcik6IHRoaXMge1xyXG4gICAgdGhpcy52ZXJzaW9ucy5wdXNoKHZlcnNpb24pO1xyXG4gICAgY29uc3QgdmVyc2lvblZhbHVlcyA9IHZlcnNpb24udmFsdWVzKCk7XHJcbiAgICB0aGlzLnJhdy51c2UodmVyc2lvblZhbHVlcy5wYXRoLCB2ZXJzaW9uVmFsdWVzLnJhdyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBncm91cCBkaXJlY3RseSB0byB0aGUgQVBJIHdpdGhvdXQgYSB2ZXJzaW9uLlxyXG4gICAqIEBwYXJhbSBncm91cCBBbiBpbnN0YW5jZSBvZiB0aGUgR3JvdXBCdWlsZGVyIGNsYXNzLlxyXG4gICAqIEByZXR1cm5zIFRoZSBBUEkgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkR3JvdXAoZ3JvdXA6IEdyb3VwQnVpbGRlcik6IHRoaXMge1xyXG4gICAgdGhpcy5ncm91cHMucHVzaChncm91cCk7XHJcbiAgICBjb25zdCBncm91cFZhbHVlcyA9IGdyb3VwLnZhbHVlcygpO1xyXG4gICAgdGhpcy5yYXcudXNlKGdyb3VwVmFsdWVzLnBhdGgsIGdyb3VwVmFsdWVzLnJhdyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVzIHRoZSBBUEkuXHJcbiAgICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBydW4gd2hlbiB0aGUgQVBJIGlzIGluaXRpYWxpemVkLlxyXG4gICAqIEByZXR1cm5zIFRoZSBzZXJ2ZXIuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXJ0KGNhbGxiYWNrPzogKCgpID0+IHZvaWQpIHwgKCgpID0+IFByb21pc2U8dm9pZD4pKTogU2VydmVyIHtcclxuICAgIHRoaXMudmFsaWRhdGUoKTtcclxuXHJcbiAgICB0aGlzLnJhdy5nZXQoJy8nLCAoX18sIHJlcykgPT5cclxuICAgICAgcmVzLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGBXZWxjb21lIHRvICR7dGhpcy5jb25maWc/Lm5hbWUgPz8gJ3RoZSBBUEknfWAsXHJcbiAgICAgICAgdmVyc2lvbnM6IHRoaXMudmVyc2lvbnMubWFwKCh2ZXJzaW9uKSA9PiAoe1xyXG4gICAgICAgICAgdmVyc2lvbjogYHYke3ZlcnNpb24udmFsdWVzKCkudmVyc2lvbn1gLFxyXG4gICAgICAgICAgdXJsOiBgJHt0aGlzLmJhc2VVcmx9L3Yke3ZlcnNpb24udmFsdWVzKCkudmVyc2lvbn1gLFxyXG4gICAgICAgIH0pKSxcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5yYXcudXNlKGVycm9yTWlkZGxld2FyZS5ub3RGb3VuZCk7XHJcbiAgICB0aGlzLnJhdy51c2UoZXJyb3JNaWRkbGV3YXJlLmVycm9ySGFuZGxlcik7XHJcblxyXG4gICAgY29uc3Qgc2VydmVyID0gdGhpcy5yYXcubGlzdGVuKHRoaXMucG9ydCwgY2FsbGJhY2spO1xyXG5cclxuICAgIHJldHVybiBzZXJ2ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2FkcyB0aGUgY29uZmlndXJhdGlvbiBvZiB0aGUgQVBJLlxyXG4gICAqIEByZXR1cm5zIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBBUEkuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyBsb2FkQ29uZmlnKCk6IFByb21pc2U8UmVhZG9ubHk8Q29uZmlnPj4ge1xyXG4gICAgbGV0IGNvbmZpZzogUGFydGlhbDxDb25maWc+ID0ge307XHJcbiAgICBjb25zdCBjb25maWdQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdleHByZXNzLWN1c3RvbS5qc29uJyk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY29uZmlnRmlsZSA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGNvbmZpZ1BhdGgsICd1dGYtOCcpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnRmlsZS50b1N0cmluZygpKSBhcyBQYXJ0aWFsPENvbmZpZz47XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFxyXG4gICAgICAgICAgYCR7Y2xpLmVycn0gRmFpbGVkIHRvIHBhcnNlIGNvbmZpZy5qc29uIGZpbGUgKGludmFsaWQgSlNPTikuYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcihlcnJvciBhcyBzdHJpbmcpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBsb2dnZXIuZXJyb3IoXHJcbiAgICAgICAgYCR7Y2xpLmVycn0gTm8gZXhwcmVzcy1jdXN0b20uanNvbiBmb3VuZCwgdHJ5aW5nIHBhY2thZ2UuanNvbmBcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gUmVhZCBwYWNrYWdlLmpzb25cclxuICAgICAgICBjb25zdCBwYWNrYWdlSlNPTiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKFxyXG4gICAgICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwYWNrYWdlLmpzb24nKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIFBhcnNlIHRoZSBKU09OXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGNvbmZpZ0ZpbGUgPSAoXHJcbiAgICAgICAgICAgIEpTT04ucGFyc2UocGFja2FnZUpTT04udG9TdHJpbmcoKSkgYXMge1xyXG4gICAgICAgICAgICAgICdleHByZXNzLWN1c3RvbSc/OiBQYXJ0aWFsPENvbmZpZz47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClbJ2V4cHJlc3MtY3VzdG9tJ107XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWdGaWxlICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoXHJcbiAgICAgICAgICAgICAgYCR7Y2xpLmVycn0gRmFpbGVkIHRvIHBhcnNlIGV4cHJlc3MtY3VzdG9tLmpzb24gKGludmFsaWQgSlNPTiBvciBubyBcImV4cHJlc3MtY3VzdG9tXCIgYmxvY2spYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKCdJbnZhbGlkIEpTT04nKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25maWcgPSBjb25maWdGaWxlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoXHJcbiAgICAgICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBwYXJzZSBleHByZXNzLWN1c3RvbS5qc29uIChpbnZhbGlkIEpTT04gb3Igbm8gXCJleHByZXNzLWN1c3RvbVwiIGJsb2NrKWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGVycm9yIGFzIHN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIC8vIEZhaWxlZCB0byByZWFkIHBhY2thZ2UuanNvblxyXG4gICAgICAgIGxvZ2dlci5lcnJvcihcclxuICAgICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBsb2FkIGV4cHJlc3MtY3VzdG9tIGNvbmZpZyBmcm9tIHBhY2thZ2UuanNvbmBcclxuICAgICAgICApO1xyXG4gICAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoZXJyb3IgYXMgc3RyaW5nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbGVFeHRSZWdleCA9IC9cXC50cyR8XFwuanMkLztcclxuXHJcbiAgICBjb25zdCBjb25maWdTY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpXHJcbiAgICAgIC5hZGRTdHJpbmcoe1xyXG4gICAgICAgIG5hbWU6ICdmaWxlJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICBtYXg6IDI1NixcclxuICAgICAgICBjaGVja3M6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgKHZhbHVlKSA9PiBmaWxlRXh0UmVnZXgudGVzdCh2YWx1ZSksXHJcbiAgICAgICAgICAgICdUaGUgZmlsZSBtdXN0IGJlIGEgSmF2YVNjcmlwdCBvciBUeXBlU2NyaXB0IGZpbGUgKC5qcyBvciAudHMpLicsXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC5hZGRTdHJpbmcoe1xyXG4gICAgICAgIG5hbWU6ICdvdXRwdXQnLFxyXG4gICAgICAgIG1heDogMjU2LFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ2RvY3MnLFxyXG4gICAgICB9KVxyXG4gICAgICAuYWRkU3RyaW5nKHtcclxuICAgICAgICBuYW1lOiAnbmFtZScsXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnTXkgQVBJJyxcclxuICAgICAgfSlcclxuICAgICAgLmFkZFN0cmluZyh7XHJcbiAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBkZWZhdWx0VmFsdWU6ICdNYWRlIHdpdGggRXhwcmVzcyBDdXN0b20nLFxyXG4gICAgICB9KVxyXG4gICAgICAuYWRkU3RyaW5nKHtcclxuICAgICAgICBuYW1lOiAnbG9nbycsXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnL2xvZ28ucG5nJyxcclxuICAgICAgfSlcclxuICAgICAgLmFkZFN0cmluZyh7XHJcbiAgICAgICAgbmFtZTogJ2N1c3RvbURpcicsXHJcbiAgICAgICAgbWF4OiAyNTYsXHJcbiAgICAgIH0pXHJcbiAgICAgIC5hZGRTdHJpbmcoe1xyXG4gICAgICAgIG5hbWU6ICd0aGVtZScsXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnZGVmYXVsdCcsXHJcbiAgICAgIH0pXHJcbiAgICAgIC5hZGRTdHJpbmcoe1xyXG4gICAgICAgIG5hbWU6ICdjb2RlVGhlbWUnLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ2ZyYW1lcicsXHJcbiAgICAgIH0pXHJcbiAgICAgIC5hZGRPYmplY3Qoe1xyXG4gICAgICAgIG5hbWU6ICdzb2NpYWxzJyxcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IHt9LFxyXG4gICAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAgIGRpc2NvcmQ6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ2l0aHViOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGluc3RhZ3JhbToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWNlYm9vazoge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBsaW5rZWRpbjoge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB5b3V0dWJlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHR3aXR0ZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZW1haWw6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbmZpZ1NjaGVtYS52YWxpZGF0ZShjb25maWcpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICBsb2dnZXIuZXJyb3IoXHJcbiAgICAgICAgYCR7Y2xpLmVycn0gVmFsaWRhdGlvbiBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIGV4cHJlc3MtY29uZmlnLmpzb25gXHJcbiAgICAgICk7XHJcbiAgICAgIGxvZ2dlci5lcnJvcihgJHtjbGkuZXJyfSBFcnJvcjogJHtyZXN1bHR9YCk7XHJcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWxpZGF0ZWRDb25maWcgPSBjb25maWcgYXMgQ29uZmlnO1xyXG5cclxuICAgIHRoaXMuY29uZmlnID0gdmFsaWRhdGVkQ29uZmlnO1xyXG5cclxuICAgIHJldHVybiB2YWxpZGF0ZWRDb25maWc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBBUEkuXHJcbiAgICogQHJldHVybnMgVGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIEFQSS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZ2V0Q29uZmlnKCk6IFByb21pc2U8UmVhZG9ubHk8Q29uZmlnPj4ge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnKSByZXR1cm4gdGhpcy5jb25maWc7XHJcbiAgICBjb25zdCBjb25maWcgPSBhd2FpdCB0aGlzLmxvYWRDb25maWcoKTtcclxuICAgIHJldHVybiBjb25maWc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0ZXMgdGhlIEFQSSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBwcml2YXRlIHZhbGlkYXRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudmVyc2lvbnMubGVuZ3RoID09PSAwICYmIHRoaXMuZ3JvdXBzLmxlbmd0aCA9PT0gMClcclxuICAgICAgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcignTm8gdmVyc2lvbnMgb3IgZ3JvdXBzIHByb3ZpZGVkIHRvIHRoZSBBUEknKTtcclxuXHJcbiAgICB0aGlzLnZlcnNpb25zLmZvckVhY2goKHZlcnNpb24pID0+IHZlcnNpb24udmFsaWRhdGUoKSk7XHJcbiAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4gZ3JvdXAudmFsaWRhdGUoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgZ3JvdXAgdG8gdGhlIEFQSS5cclxuICAgKiBAcmV0dXJucyBUaGUgQVBJIGRhdGEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGV4cG9ydCgpOiBQcm9taXNlPFJlYWRvbmx5PEV4cG9ydGVkQXBpPj4ge1xyXG4gICAgaWYgKCF0aGlzLmJhc2VVcmwpXHJcbiAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoJ1RoZSBiYXNlIFVSTCBvZiB0aGUgQVBJIGlzIG5vdCBzZXQuJyk7XHJcbiAgICBpZiAoIXRoaXMucG9ydCkgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcignVGhlIHBvcnQgb2YgdGhlIEFQSSBpcyBub3Qgc2V0LicpO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IHRoaXMubG9hZENvbmZpZygpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgYmFzZVVybDogdGhpcy5iYXNlVXJsLFxyXG4gICAgICBwb3J0OiB0aGlzLnBvcnQsXHJcbiAgICAgIHN0cnVjdHVyZXM6IHRoaXMuc3RydWN0dXJlcy5tYXAoKHN0cnVjdHVyZSkgPT4gc3RydWN0dXJlLmV4cG9ydCgpKSxcclxuICAgICAgcmF0ZUxpbWl0OiB0aGlzLnJhdGVsaW1pdCxcclxuICAgICAgdmVyc2lvbnM6IHRoaXMudmVyc2lvbnMubWFwKCh2ZXJzaW9uKSA9PiB2ZXJzaW9uLmV4cG9ydCgpKSxcclxuICAgICAgZ3JvdXBzOiB0aGlzLmdyb3Vwcy5tYXAoKGdyb3VwKSA9PiBncm91cC5leHBvcnQoKSksXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=