import { Server } from 'http';

import { RateLimit } from '@typings/core';
import { errorMiddleware } from '@utils/middleware';
import BaseAppBuilder from './Base/BaseAppBuilder';
import { structures } from './StructureBuilder';
import VersionBuilder, { ExportedVersion } from './VersionBuilder';

interface ExportedApi {
  name: string;
  description: string;
  baseUrl: string;
  port: number;
  logo?: string;
  structures: Record<string, unknown>;
  rateLimit?: Partial<RateLimit>;
  versions: ExportedVersion[];
}

/**
 * The ApiBuilder class is used to build the API.
 */
export default class ApiBuilder extends BaseAppBuilder<'app'> {
  private port: number;
  private versions: VersionBuilder[];
  private name: string;
  private description: string;
  private baseUrl: string;
  private logo?: string;

  /**
   * The constructor of the ApiBuilder class.
   * @param config The configuration of the API.
   * @param config.name The name of the API.
   * @param config.description The description of the API.
   * @param config.baseUrl The base URL of the API.
   * @param config.port The port of the API.
   * @param config.logo The logo of the API.
   */
  public constructor({
    name,
    description,
    baseUrl,
    port,
    logo,
  }: {
    name: string;
    description: string;
    baseUrl: string;
    port: number;
    logo?: string;
  }) {
    super('app');
    this.versions = [];
    this.name = name;
    this.description = description;
    this.baseUrl = baseUrl;
    this.port = port;
    this.logo = logo ?? undefined;
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
   * Sets the name of the API.
   * @param name The name of the API.
   * @returns The API builder.
   */
  public setName(name: string): this {
    this.name = name;
    return this;
  }

  /**
   * Sets the description of the API.
   * @param description The description for the API.
   * @returns The API builder.
   */
  public setDescription(description: string): this {
    this.description = description;
    return this;
  }

  /**
   * Sets the base URL of the API.
   * @param url The base URL of the API.
   * @returns The API builder.
   */
  public setBaseUrl(url: string): this {
    this.baseUrl = url;
    return this;
  }

  /**
   * Sets the logo of the API.
   * @param logo The logo of the API.
   * @returns The API builder.
   */
  public setLogo(logo: string): this {
    this.logo = logo;
    return this;
  }

  /**
   * Initializes the API.
   * @param callback The callback to run when the API is initialized.
   * @returns The server.
   */
  public startServer(callback?: () => void): Server {
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
   * Adds a router to the API.
   * @returns The API data.
   */
  public export(): Readonly<ExportedApi> {
    if (!this.name) throw new Error('The name of the API is not set.');
    if (!this.description)
      throw new Error('The description of the API is not set.');
    if (!this.baseUrl) throw new Error('The base URL of the API is not set.');
    if (!this.port) throw new Error('The port of the API is not set.');

    return {
      name: this.name,
      description: this.description,
      baseUrl: this.baseUrl,
      port: this.port,
      ...(this.logo && { logo: this.logo }),
      structures,
      rateLimit: this.ratelimit,
      versions: this.versions.map((version) => version.export()),
    };
  }
}
