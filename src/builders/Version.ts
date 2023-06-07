import { Router } from 'express';
import rateLimit, { Options } from 'express-rate-limit';

import { ExportedVersion } from '@typings/exports';
import PackageError from '@utils/PackageError';
import BaseApp from './Base/BaseApp';
import GroupBuilder from './Group';
import SchemaBuilder from './Schema';

/**
 * The version builder class.
 */
export default class VersionBuilder extends BaseApp<'app'> {
  private version: number;
  private groups: GroupBuilder[];

  /**
   * Creates a new version builder.
   * @param config The configuration of the API.
   * @param config.version The version of the API.
   */
  public constructor({ version }: { version: number }) {
    super('app');

    const constructorSchema = new SchemaBuilder().addNumber({
      name: 'version',
      required: true,
      min: 1,
      max: 10_000,
    });

    constructorSchema.validate({ version }).then((result) => {
      if (typeof result === 'string') throw new PackageError(result);
    });

    this.groups = [];
    this.version = version;
  }

  /**
   * Sets the global rate limit for the version.
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
   * Adds a group to the API.
   * @param group The group to add.
   * @returns The API builder.
   */
  public addGroup(group: GroupBuilder): this {
    this.groups.push(group);
    const groupValues = group.values();
    this.raw.use(`v${this.version}`, groupValues.raw);
    return this;
  }

  /**
   * Adds a group to the API.
   * @returns The API data.
   */
  public export(): Readonly<ExportedVersion> {
    return {
      version: this.version,
      rateLimit: this.ratelimit,
      groups: this.groups.map((group) => group.export()),
    };
  }

  /**
   * Gets the version values.
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
    if (!this.groups.length) throw new PackageError('No groups provided');
    this.groups.forEach((group) => group.validate());
  }
}
