import { Router } from 'express';
import rateLimit, { Options } from 'express-rate-limit';

import { ExportedVersion } from '@typings/exports';
import ExpressCustomError from '@utils/ExpressCustomError';
import BaseApp from './Base/BaseApp';
import Group from './Group';
import Schema from './Schema';

/**
 * The Version class, used to create a version of the API.
 */
export default class Version extends BaseApp<'app'> {
  private version: number;
  private groups: Group[];

  /**
   * Creates a new instance of the Version class.
   * @param options The options for the Version class.
   * @param options.version The version number of the API.
   */
  public constructor({ version }: { version: number }) {
    super('app');

    // The constructor schema.
    const constructorSchema = new Schema().addNumber({
      name: 'version',
      required: true,
      min: 1,
      max: 10_000,
    });

    // Test the the constructor against the schema.
    constructorSchema.validate({ version }).then((result) => {
      if (typeof result === 'string') throw new ExpressCustomError(result);
    });

    // Assign the options to the instance.
    this.groups = [];
    this.version = version;
  }

  /**
   * Sets the global rate limit for the version.
   * @param options The options of the rate limit.
   * @returns The current Version instance.
   */
  public override setRateLimit(options: Partial<Options>): this {
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
   * Adds a group to the version.
   * @param group An instance of the Group class.
   * @returns The current Version instance.
   */
  public addGroup(group: Group): this {
    this.groups.push(group);
    const groupValues = group.values();
    this.raw.use(`v${this.version}`, groupValues.raw);
    return this;
  }

  /**
   * Exports the version as a JSON object.
   * @returns The Version instance properties as a JSON object.
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
   * @returns The Version instance values.
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
   * Validates the current instance of the Version class.
   * @throws Throws an error if the validation fails.
   */
  public validate(): void {
    if (!this.groups.length) throw new ExpressCustomError('No groups provided');
    this.groups.forEach((group) => group.validate());
  }
}
