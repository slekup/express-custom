import fs from 'fs';
import { Server } from 'http';
import path from 'path';

import Config from '@typings/config';
import { RateLimit } from '@typings/core';
import { errorMiddleware } from '@utils/middleware';
import logger, { cli } from '../bin/utils/logger';
import BaseAppBuilder from './Base/BaseAppBuilder';
import RouterBuilder, { ExportedRouter } from './RouterBuilder';
import SchemaBuilder from './SchemaBuilder';
import StructureBuilder from './StructureBuilder';
import VersionBuilder, { ExportedVersion } from './VersionBuilder';

export type ExportedApi = Config & {
  baseUrl: string;
  port: number;
  structures: StructureBuilder[];
  rateLimit?: Partial<RateLimit>;
  versions: ExportedVersion[];
  routers: ExportedRouter[];
};

/**
 * The ApiBuilder class is used to build the API.
 */
export default class ApiBuilder extends BaseAppBuilder<'app'> {
  private port: number;
  private versions: VersionBuilder[];
  private routers: RouterBuilder[];
  private baseUrl: string;
  private structures: StructureBuilder[];
  private config?: Config;

  /**
   * The constructor of the ApiBuilder class.
   * @param options The configuration of the API.
   * @param options.baseUrl The base URL of the API.
   * @param options.port The port of the API.
   * @param options.structures The structures of the API.
   */
  public constructor({
    baseUrl,
    port,
    structures,
  }: {
    baseUrl: string;
    port: number;
    structures?: StructureBuilder[];
  }) {
    super('app');

    const constructorSchema = new SchemaBuilder()
      .addString((option) =>
        option.setName('baseUrl').setRequired(true).setMin(1).setMax(100)
      )
      .addNumber((option) =>
        option.setName('port').setMin(0).setMax(65536).setRequired(true)
      );

    constructorSchema.validate({ baseUrl, port }).then((result) => {
      if (typeof result === 'string') throw new Error(result);
    });

    this.versions = [];
    this.routers = [];
    this.baseUrl = baseUrl;
    this.port = port;
    this.structures = structures ?? [];
    this.config = undefined;
  }

  /**
   * Adds a version to the API.
   * @param version The version to add.
   * @returns The API builder.
   */
  public addVersion(version: VersionBuilder): this {
    this.versions.push(version);
    const versionValues = version.values();
    this.raw.use(versionValues.path, versionValues.raw);
    return this;
  }

  /**
   * Adds a router directly to the API.
   * @param router An instance of the RouterBuilder class.
   * @returns The API builder.
   */
  public addRouter(router: RouterBuilder): this {
    this.routers.push(router);
    const routerValues = router.values();
    this.raw.use(routerValues.path, routerValues.raw);
    return this;
  }

  /**
   * Initializes the API.
   * @param callback The callback to run when the API is initialized.
   * @returns The server.
   */
  public startServer(callback?: () => void): Server {
    this.validate();

    this.raw.get('/', (req, res) =>
      res.json({
        message: 'Welcome to Slekup API',
        versions: this.versions.map((version) => ({
          version: `v${version.values().version}`,
          url: `${this.baseUrl}/v${version.values().version}`,
        })),
      })
    );

    this.raw.use(errorMiddleware.notFound);
    this.raw.use(errorMiddleware.errorHandler);

    const server = this.raw.listen(this.port, callback);

    return server;
  }

  /**
   * Loads the configuration of the API.
   * @returns The configuration of the API.
   */
  private async loadConfig(): Promise<Readonly<Config>> {
    let config: Partial<Config> = {};
    const configPath = path.join(process.cwd(), 'express-custom.json');

    try {
      const configFile = await fs.promises.readFile(configPath, 'utf-8');
      try {
        config = JSON.parse(configFile.toString()) as Partial<Config>;
      } catch (error) {
        logger.error(
          `${cli.err} Failed to parse config.json file (invalid JSON).`
        );
        throw new Error(error as string);
      }
    } catch (error) {
      logger.error(
        `${cli.err} No express-custom.json found, trying package.json`
      );

      try {
        // Read package.json
        const packageJSON = await fs.promises.readFile(
          path.join(process.cwd(), 'package.json')
        );

        // Parse the JSON
        try {
          const configFile = (
            JSON.parse(packageJSON.toString()) as {
              'express-custom'?: Partial<Config>;
            }
          )['express-custom'];

          if (typeof configFile !== 'object') {
            logger.error(
              `${cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`
            );
            throw new Error('Invalid JSON');
          }

          config = configFile;
        } catch (error) {
          logger.error(
            `${cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`
          );
          throw new Error(error as string);
        }
      } catch (error) {
        // Failed to read package.json
        logger.error(
          `${cli.err} Failed to load express-custom config from package.json`
        );
        throw new Error(error as string);
      }
    }

    const fileExtRegex = /\.ts$|\.js$/;

    const configSchema = new SchemaBuilder()
      .addString((option) =>
        option
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
            response:
              'The file must be a JavaScript or TypeScript file (.js or .ts).',
          })
      )
      .addString((value) =>
        value.setName('output').setDefault('docs').setMax(256)
      )
      .addString((option) => option.setName('name').setDefault('My API'))
      .addString((option) =>
        option.setName('description').setDefault('Made with Express Custom')
      )
      .addString((option) => option.setName('logo').setDefault('/logo.png'))
      .addString((option) => option.setName('customDir').setMax(256))
      .addString((option) => option.setName('theme').setDefault('default'))
      .addString((option) => option.setName('codeTheme').setDefault('framer'))
      .addObject((option) =>
        option
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
          })
      );

    const result = await configSchema.validate(config);

    if (typeof result === 'string') {
      logger.error(
        `${cli.err} Validation error while processing express-config.json`
      );
      logger.error(`${cli.err} Error: ${result}`);
      process.exit(1);
    }

    const validatedConfig = config as Config;

    this.config = validatedConfig;

    return validatedConfig;
  }

  /**
   * Gets the configuration of the API.
   * @returns The configuration of the API.
   */
  public async getConfig(): Promise<Readonly<Config>> {
    if (this.config) return this.config;
    const config = await this.loadConfig();
    return config;
  }

  /**
   * Validates the API instance.
   */
  private async validate(): Promise<void> {
    if (this.versions.length === 0 || this.routers.length === 0)
      throw new Error('No versions or routers provided to the API');

    await this.loadConfig();
  }

  /**
   * Adds a router to the API.
   * @returns The API data.
   */
  public async export(): Promise<Readonly<ExportedApi>> {
    if (!this.baseUrl) throw new Error('The base URL of the API is not set.');
    if (!this.port) throw new Error('The port of the API is not set.');

    const config = await this.loadConfig();

    return {
      ...config,
      baseUrl: this.baseUrl,
      port: this.port,
      structures: this.structures,
      rateLimit: this.ratelimit,
      versions: this.versions.map((version) => version.export()),
      routers: this.routers.map((router) => router.export()),
    };
  }
}
