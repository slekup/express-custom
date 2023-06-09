import { Schema as BaseSchema } from 'builder-validation';
import { Response } from 'express';

/**
 * The Schema class, used to validate data.
 */
export default class Schema extends BaseSchema {
  /**
   * The schema to use when validating.
   */
  public constructor() {
    super();
  }

  /**
   * Run the validation function, and if the response object is provided, send a response if the validation fails.
   * @param data The object data to validate.
   * @param options The options to use when validating.
   * @param options.res The response object.
   * @returns A JSON response meaning it's invalid, or null if it's valid.
   */
  public async validateData(
    data: Record<string, unknown>,
    options?: { res?: Response }
  ): Promise<Response | null | string> {
    const result = await this.validateBase(data, this.schema);
    if (typeof result !== 'string') return null;
    if (options?.res)
      return options.res.status(400).json({ status: 400, message: result });
    return result;
  }
}
