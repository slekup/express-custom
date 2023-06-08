import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IStringValue, StringTest } from '@typings/schema';

export type StringValueOptions = BaseValueOptions & {
  min?: number;
  max?: number;
  options?: string[];
  test?: StringTest;
};

/**
 * The StringValue class, used to create string values.
 */
export default class StringValue extends BaseValue implements IStringValue {
  public type = 'string' as const;
  public min?: number;
  public max?: number;
  public options?: string[];
  public test?: StringTest;

  /**
   * Creates an instance of the StringValue class.
   * @param options The options for the StringValue class.
   */
  public constructor(options: StringValueOptions) {
    super(options);
    if (options.min) this.min = options.min;
    if (options.max) this.max = options.max;
    if (options.options) this.options = options.options;
    if (options.test) this.test = options.test;
  }

  /**
   * Exports the StringValue class properties.
   * @returns The StringValue class properties.
   */
  public export(): unknown {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      required: this.required,
      structure: this.structure,
    };
  }
}
