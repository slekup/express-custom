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
const PackageError_1 = __importDefault(require("@utils/PackageError"));
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
                throw new PackageError_1.default(result);
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
                throw new PackageError_1.default(error);
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
                        throw new PackageError_1.default('Invalid JSON');
                    }
                    config = configFile;
                }
                catch (error) {
                    logger_1.default.error(`${logger_1.cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                    throw new PackageError_1.default(error);
                }
            }
            catch (error) {
                // Failed to read package.json
                logger_1.default.error(`${logger_1.cli.err} Failed to load express-custom config from package.json`);
                throw new PackageError_1.default(error);
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
            throw new PackageError_1.default('No versions or groups provided to the API');
        this.versions.forEach((version) => version.validate());
        this.groups.forEach((group) => group.validate());
    }
    /**
     * Adds a group to the API.
     * @returns The API data.
     */
    async export() {
        if (!this.baseUrl)
            throw new PackageError_1.default('The base URL of the API is not set.');
        if (!this.port)
            throw new PackageError_1.default('The port of the API is not set.');
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
exports.default = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2J1aWxkZXJzL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQW9CO0FBRXBCLGdEQUF3QjtBQUd4Qix1RUFBK0M7QUFDL0Msa0RBQW9EO0FBQ3BELDhEQUFrRDtBQUNsRCw2REFBcUM7QUFFckMsc0RBQXFDO0FBSXJDOztHQUVHO0FBQ0gsTUFBcUIsR0FBSSxTQUFRLGlCQUFjO0lBQ3JDLElBQUksQ0FBUztJQUNiLFFBQVEsQ0FBbUI7SUFDM0IsTUFBTSxDQUFpQjtJQUN2QixPQUFPLENBQVM7SUFDaEIsVUFBVSxDQUFxQjtJQUMvQixNQUFNLENBQVU7SUFFeEI7Ozs7OztPQU1HO0lBQ0gsWUFBbUIsT0FJbEI7UUFDQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFYixNQUFNLGlCQUFpQixHQUFHLElBQUksZ0JBQWEsRUFBRTthQUMxQyxTQUFTLENBQUM7WUFDVCxJQUFJLEVBQUUsS0FBSztZQUNYLFFBQVEsRUFBRSxJQUFJO1lBQ2QsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsR0FBRztTQUNULENBQUM7YUFDRCxTQUFTLENBQUM7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsS0FBSztTQUNYLENBQUMsQ0FBQztRQUVMLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNsRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7Z0JBQUUsTUFBTSxJQUFJLHNCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFB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QUFDO1NBQ25ELENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFuU0Qsc0JBbVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ2h0dHAnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IENvbmZpZywgRXhwb3J0ZWRBcGkgfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcbmltcG9ydCBQYWNrYWdlRXJyb3IgZnJvbSAnQHV0aWxzL1BhY2thZ2VFcnJvcic7XG5pbXBvcnQgeyBlcnJvck1pZGRsZXdhcmUgfSBmcm9tICdAdXRpbHMvbWlkZGxld2FyZSc7XG5pbXBvcnQgbG9nZ2VyLCB7IGNsaSB9IGZyb20gJy4uL2Jpbi91dGlscy9sb2dnZXInO1xuaW1wb3J0IEJhc2VBcHAgZnJvbSAnLi9CYXNlL0Jhc2VBcHAnO1xuaW1wb3J0IEdyb3VwQnVpbGRlciBmcm9tICcuL0dyb3VwJztcbmltcG9ydCBTY2hlbWFCdWlsZGVyIGZyb20gJy4vU2NoZW1hJztcbmltcG9ydCBTdHJ1Y3R1cmVCdWlsZGVyIGZyb20gJy4vU3RydWN0dXJlJztcbmltcG9ydCBWZXJzaW9uQnVpbGRlciBmcm9tICcuL1ZlcnNpb24nO1xuXG4vKipcbiAqIFRoZSBBcGlCdWlsZGVyIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIEFQSS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIGV4dGVuZHMgQmFzZUFwcDwnYXBwJz4ge1xuICBwcml2YXRlIHBvcnQ6IG51bWJlcjtcbiAgcHJpdmF0ZSB2ZXJzaW9uczogVmVyc2lvbkJ1aWxkZXJbXTtcbiAgcHJpdmF0ZSBncm91cHM6IEdyb3VwQnVpbGRlcltdO1xuICBwcml2YXRlIGJhc2VVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBzdHJ1Y3R1cmVzOiBTdHJ1Y3R1cmVCdWlsZGVyW107XG4gIHByaXZhdGUgY29uZmlnPzogQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3Igb2YgdGhlIEFwaUJ1aWxkZXIgY2xhc3MuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBBUEkuXG4gICAqIEBwYXJhbSBvcHRpb25zLnVybCBUaGUgYmFzZSBVUkwgb2YgdGhlIEFQSS5cbiAgICogQHBhcmFtIG9wdGlvbnMucG9ydCBUaGUgcG9ydCBvZiB0aGUgQVBJLlxuICAgKiBAcGFyYW0gb3B0aW9ucy5zdHJ1Y3R1cmVzIFRoZSBzdHJ1Y3R1cmVzIG9mIHRoZSBBUEkuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczoge1xuICAgIHVybDogc3RyaW5nO1xuICAgIHBvcnQ6IG51bWJlcjtcbiAgICBzdHJ1Y3R1cmVzPzogU3RydWN0dXJlQnVpbGRlcltdO1xuICB9KSB7XG4gICAgc3VwZXIoJ2FwcCcpO1xuXG4gICAgY29uc3QgY29uc3RydWN0b3JTY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ3VybCcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIG1heDogMTAwLFxuICAgICAgfSlcbiAgICAgIC5hZGROdW1iZXIoe1xuICAgICAgICBuYW1lOiAncG9ydCcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogNjU1MzYsXG4gICAgICB9KTtcblxuICAgIGNvbnN0cnVjdG9yU2NoZW1hLnZhbGlkYXRlKG9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgUGFja2FnZUVycm9yKHJlc3VsdCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnZlcnNpb25zID0gW107XG4gICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICB0aGlzLmJhc2VVcmwgPSBvcHRpb25zLnVybDtcbiAgICB0aGlzLnBvcnQgPSBvcHRpb25zLnBvcnQ7XG4gICAgdGhpcy5zdHJ1Y3R1cmVzID0gb3B0aW9ucy5zdHJ1Y3R1cmVzID8/IFtdO1xuICAgIHRoaXMuY29uZmlnID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB2ZXJzaW9uIHRvIHRoZSBBUEkuXG4gICAqIEBwYXJhbSB2ZXJzaW9uIFRoZSB2ZXJzaW9uIHRvIGFkZC5cbiAgICogQHJldHVybnMgVGhlIEFQSSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZFZlcnNpb24odmVyc2lvbjogVmVyc2lvbkJ1aWxkZXIpOiB0aGlzIHtcbiAgICB0aGlzLnZlcnNpb25zLnB1c2godmVyc2lvbik7XG4gICAgY29uc3QgdmVyc2lvblZhbHVlcyA9IHZlcnNpb24udmFsdWVzKCk7XG4gICAgdGhpcy5yYXcudXNlKHZlcnNpb25WYWx1ZXMucGF0aCwgdmVyc2lvblZhbHVlcy5yYXcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBncm91cCBkaXJlY3RseSB0byB0aGUgQVBJIHdpdGhvdXQgYSB2ZXJzaW9uLlxuICAgKiBAcGFyYW0gZ3JvdXAgQW4gaW5zdGFuY2Ugb2YgdGhlIEdyb3VwQnVpbGRlciBjbGFzcy5cbiAgICogQHJldHVybnMgVGhlIEFQSSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZEdyb3VwKGdyb3VwOiBHcm91cEJ1aWxkZXIpOiB0aGlzIHtcbiAgICB0aGlzLmdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICBjb25zdCBncm91cFZhbHVlcyA9IGdyb3VwLnZhbHVlcygpO1xuICAgIHRoaXMucmF3LnVzZShncm91cFZhbHVlcy5wYXRoLCBncm91cFZhbHVlcy5yYXcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBBUEkuXG4gICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcnVuIHdoZW4gdGhlIEFQSSBpcyBpbml0aWFsaXplZC5cbiAgICogQHJldHVybnMgVGhlIHNlcnZlci5cbiAgICovXG4gIHB1YmxpYyBzdGFydChjYWxsYmFjaz86ICgoKSA9PiB2b2lkKSB8ICgoKSA9PiBQcm9taXNlPHZvaWQ+KSk6IFNlcnZlciB7XG4gICAgdGhpcy52YWxpZGF0ZSgpO1xuXG4gICAgdGhpcy5yYXcuZ2V0KCcvJywgKF9fLCByZXMpID0+XG4gICAgICByZXMuanNvbih7XG4gICAgICAgIG1lc3NhZ2U6IGBXZWxjb21lIHRvICR7dGhpcy5jb25maWc/Lm5hbWUgPz8gJ3RoZSBBUEknfWAsXG4gICAgICAgIHZlcnNpb25zOiB0aGlzLnZlcnNpb25zLm1hcCgodmVyc2lvbikgPT4gKHtcbiAgICAgICAgICB2ZXJzaW9uOiBgdiR7dmVyc2lvbi52YWx1ZXMoKS52ZXJzaW9ufWAsXG4gICAgICAgICAgdXJsOiBgJHt0aGlzLmJhc2VVcmx9L3Yke3ZlcnNpb24udmFsdWVzKCkudmVyc2lvbn1gLFxuICAgICAgICB9KSksXG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnJhdy51c2UoZXJyb3JNaWRkbGV3YXJlLm5vdEZvdW5kKTtcbiAgICB0aGlzLnJhdy51c2UoZXJyb3JNaWRkbGV3YXJlLmVycm9ySGFuZGxlcik7XG5cbiAgICBjb25zdCBzZXJ2ZXIgPSB0aGlzLnJhdy5saXN0ZW4odGhpcy5wb3J0LCBjYWxsYmFjayk7XG5cbiAgICByZXR1cm4gc2VydmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIHRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBBUEkuXG4gICAqIEByZXR1cm5zIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBBUEkuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGxvYWRDb25maWcoKTogUHJvbWlzZTxSZWFkb25seTxDb25maWc+PiB7XG4gICAgbGV0IGNvbmZpZzogUGFydGlhbDxDb25maWc+ID0ge307XG4gICAgY29uc3QgY29uZmlnUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZXhwcmVzcy1jdXN0b20uanNvbicpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbmZpZ0ZpbGUgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShjb25maWdQYXRoLCAndXRmLTgnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnRmlsZS50b1N0cmluZygpKSBhcyBQYXJ0aWFsPENvbmZpZz47XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgICAgYCR7Y2xpLmVycn0gRmFpbGVkIHRvIHBhcnNlIGNvbmZpZy5qc29uIGZpbGUgKGludmFsaWQgSlNPTikuYFxuICAgICAgICApO1xuICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGVycm9yIGFzIHN0cmluZyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgYCR7Y2xpLmVycn0gTm8gZXhwcmVzcy1jdXN0b20uanNvbiBmb3VuZCwgdHJ5aW5nIHBhY2thZ2UuanNvbmBcbiAgICAgICk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFJlYWQgcGFja2FnZS5qc29uXG4gICAgICAgIGNvbnN0IHBhY2thZ2VKU09OID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoXG4gICAgICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwYWNrYWdlLmpzb24nKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFBhcnNlIHRoZSBKU09OXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29uZmlnRmlsZSA9IChcbiAgICAgICAgICAgIEpTT04ucGFyc2UocGFja2FnZUpTT04udG9TdHJpbmcoKSkgYXMge1xuICAgICAgICAgICAgICAnZXhwcmVzcy1jdXN0b20nPzogUGFydGlhbDxDb25maWc+O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIClbJ2V4cHJlc3MtY3VzdG9tJ107XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ0ZpbGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBwYXJzZSBleHByZXNzLWN1c3RvbS5qc29uIChpbnZhbGlkIEpTT04gb3Igbm8gXCJleHByZXNzLWN1c3RvbVwiIGJsb2NrKWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKCdJbnZhbGlkIEpTT04nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25maWcgPSBjb25maWdGaWxlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBwYXJzZSBleHByZXNzLWN1c3RvbS5qc29uIChpbnZhbGlkIEpTT04gb3Igbm8gXCJleHByZXNzLWN1c3RvbVwiIGJsb2NrKWBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoZXJyb3IgYXMgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gRmFpbGVkIHRvIHJlYWQgcGFja2FnZS5qc29uXG4gICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICBgJHtjbGkuZXJyfSBGYWlsZWQgdG8gbG9hZCBleHByZXNzLWN1c3RvbSBjb25maWcgZnJvbSBwYWNrYWdlLmpzb25gXG4gICAgICAgICk7XG4gICAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoZXJyb3IgYXMgc3RyaW5nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBmaWxlRXh0UmVnZXggPSAvXFwudHMkfFxcLmpzJC87XG5cbiAgICBjb25zdCBjb25maWdTY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWF4OiAyNTYsXG4gICAgICAgIGNoZWNrczogW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgICh2YWx1ZSkgPT4gZmlsZUV4dFJlZ2V4LnRlc3QodmFsdWUpLFxuICAgICAgICAgICAgJ1RoZSBmaWxlIG11c3QgYmUgYSBKYXZhU2NyaXB0IG9yIFR5cGVTY3JpcHQgZmlsZSAoLmpzIG9yIC50cykuJyxcbiAgICAgICAgICBdLFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgIC5hZGRTdHJpbmcoe1xuICAgICAgICBuYW1lOiAnb3V0cHV0JyxcbiAgICAgICAgbWF4OiAyNTYsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ2RvY3MnLFxuICAgICAgfSlcbiAgICAgIC5hZGRTdHJpbmcoe1xuICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ015IEFQSScsXG4gICAgICB9KVxuICAgICAgLmFkZFN0cmluZyh7XG4gICAgICAgIG5hbWU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ01hZGUgd2l0aCBFeHByZXNzIEN1c3RvbScsXG4gICAgICB9KVxuICAgICAgLmFkZFN0cmluZyh7XG4gICAgICAgIG5hbWU6ICdsb2dvJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnL2xvZ28ucG5nJyxcbiAgICAgIH0pXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ2N1c3RvbURpcicsXG4gICAgICAgIG1heDogMjU2LFxuICAgICAgfSlcbiAgICAgIC5hZGRTdHJpbmcoe1xuICAgICAgICBuYW1lOiAndGhlbWUnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICdkZWZhdWx0JyxcbiAgICAgIH0pXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ2NvZGVUaGVtZScsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ2ZyYW1lcicsXG4gICAgICB9KVxuICAgICAgLmFkZE9iamVjdCh7XG4gICAgICAgIG5hbWU6ICdzb2NpYWxzJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB7fSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGRpc2NvcmQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2l0aHViOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluc3RhZ3JhbToge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWNlYm9vazoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsaW5rZWRpbjoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB5b3V0dWJlOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHR3aXR0ZXI6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbmZpZ1NjaGVtYS52YWxpZGF0ZShjb25maWcpO1xuXG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgIGAke2NsaS5lcnJ9IFZhbGlkYXRpb24gZXJyb3Igd2hpbGUgcHJvY2Vzc2luZyBleHByZXNzLWNvbmZpZy5qc29uYFxuICAgICAgKTtcbiAgICAgIGxvZ2dlci5lcnJvcihgJHtjbGkuZXJyfSBFcnJvcjogJHtyZXN1bHR9YCk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdGVkQ29uZmlnID0gY29uZmlnIGFzIENvbmZpZztcblxuICAgIHRoaXMuY29uZmlnID0gdmFsaWRhdGVkQ29uZmlnO1xuXG4gICAgcmV0dXJuIHZhbGlkYXRlZENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBBUEkuXG4gICAqIEByZXR1cm5zIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBBUEkuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0Q29uZmlnKCk6IFByb21pc2U8UmVhZG9ubHk8Q29uZmlnPj4ge1xuICAgIGlmICh0aGlzLmNvbmZpZykgcmV0dXJuIHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IHRoaXMubG9hZENvbmZpZygpO1xuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoZSBBUEkgaW5zdGFuY2UuXG4gICAqL1xuICBwcml2YXRlIHZhbGlkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZlcnNpb25zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmdyb3Vwcy5sZW5ndGggPT09IDApXG4gICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKCdObyB2ZXJzaW9ucyBvciBncm91cHMgcHJvdmlkZWQgdG8gdGhlIEFQSScpO1xuXG4gICAgdGhpcy52ZXJzaW9ucy5mb3JFYWNoKCh2ZXJzaW9uKSA9PiB2ZXJzaW9uLnZhbGlkYXRlKCkpO1xuICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiBncm91cC52YWxpZGF0ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgZ3JvdXAgdG8gdGhlIEFQSS5cbiAgICogQHJldHVybnMgVGhlIEFQSSBkYXRhLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGV4cG9ydCgpOiBQcm9taXNlPFJlYWRvbmx5PEV4cG9ydGVkQXBpPj4ge1xuICAgIGlmICghdGhpcy5iYXNlVXJsKVxuICAgICAgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcignVGhlIGJhc2UgVVJMIG9mIHRoZSBBUEkgaXMgbm90IHNldC4nKTtcbiAgICBpZiAoIXRoaXMucG9ydCkgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcignVGhlIHBvcnQgb2YgdGhlIEFQSSBpcyBub3Qgc2V0LicpO1xuXG4gICAgY29uc3QgY29uZmlnID0gYXdhaXQgdGhpcy5sb2FkQ29uZmlnKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uY29uZmlnLFxuICAgICAgYmFzZVVybDogdGhpcy5iYXNlVXJsLFxuICAgICAgcG9ydDogdGhpcy5wb3J0LFxuICAgICAgc3RydWN0dXJlczogdGhpcy5zdHJ1Y3R1cmVzLm1hcCgoc3RydWN0dXJlKSA9PiBzdHJ1Y3R1cmUuZXhwb3J0KCkpLFxuICAgICAgcmF0ZUxpbWl0OiB0aGlzLnJhdGVsaW1pdCxcbiAgICAgIHZlcnNpb25zOiB0aGlzLnZlcnNpb25zLm1hcCgodmVyc2lvbikgPT4gdmVyc2lvbi5leHBvcnQoKSksXG4gICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLm1hcCgoZ3JvdXApID0+IGdyb3VwLmV4cG9ydCgpKSxcbiAgICB9O1xuICB9XG59XG4iXX0=