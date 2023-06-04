import { Router } from 'express';
import rateLimit, { Options } from 'express-rate-limit';

import { RateLimit } from '@typings/core';
import BaseAppBuilder from './Base/BaseAppBuilder';
import RouterBuilder, { ExportedRouter } from './RouterBuilder';
import SchemaBuilder from './SchemaBuilder';

export interface ExportedVersion {
  version: number;
  rateLimit?: Partial<RateLimit>;
  routers: ExportedRouter[];
}

/**
 * The version builder class.
 */
export default class VersionBuilder extends BaseAppBuilder<'app'> {
  private version: number;
  private routers: RouterBuilder[];

  /**
   * Creates a new version builder.
   * @param config The configuration of the API.
   * @param config.version The version of the API.
   */
  public constructor({ version }: { version: number }) {
    super('app');

    const constructorSchema = new SchemaBuilder().addNumber((option) =>
      option.setName('version').setRequired(true).setMin(1).setMax(10_000)
    );

    constructorSchema.validate({ version }).then((result) => {
      if (typeof result === 'string') throw new Error(result);
    });

    this.routers = [];
    this.version = version;
  }

  /**
   * Adds a router to the API.
   * @param options The options of the rate limit.
   * @param showInDocs Whether to show the rate limit in the docs.
   * @returns The API builder.
   */
  public setRateLimit(options: Partial<Options>, showInDocs?: boolean): this {
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
    this.raw.use(`v${this.version}`, rateLimit(options));

    return this;
  }

  /**
   * Adds a router to the API.
   * @param router The router to add.
   * @returns The API builder.
   */
  public addRouter(router: RouterBuilder): this {
    this.routers.push(router);
    const routerValues = router.values();
    this.raw.use(`v${this.version}`, routerValues.raw);
    return this;
  }

  /**
   * Adds a router to the API.
   * @returns The API data.
   */
  public export(): Readonly<ExportedVersion> {
    return {
      version: this.version,
      rateLimit: this.ratelimit,
      routers: this.routers.map((router) => router.export()),
    };
  }

  /**
   * Adds a router to the API.
   * @returns The API data.
   */
  public values(): Readonly<{
    path: string;
    raw: Router;
    version: number;
  }> {
    return {
      path: `/v${this.version}`,
      raw: this.raw,
      version: this.version,
    };
  }

  /**
   * Validates the version builder.
   */
  public validate(): void {
    if (!this.routers.length) throw new Error('No routers provided');
    this.routers.forEach((router) => router.validate());
  }
}
