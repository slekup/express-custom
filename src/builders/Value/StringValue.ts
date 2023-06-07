import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { StringTest, StringValue } from '@typings/schema';

export type StringValueOptions = BaseValueOptions & {
  min?: number;
  max?: number;
  options?: string[];
  test?: StringTest;
};

/**
 * The string value builder class.
 */
export default class StringValueBuilder
  extends BaseValue
  implements StringValue
{
  public type = 'string' as const;
  public min?: number;
  public max?: number;
  public options?: string[];
  public test?: StringTest;

  /**
   * Creates an instance of the string value builder class.
   * @param options The options of the string value.
   */
  public constructor(options: StringValueOptions) {
    super(options);
    if (options.min) this.min = options.min;
    if (options.max) this.max = options.max;
    if (options.options) this.options = options.options;
    if (options.test) this.test = options.test;
  }

  /**
   * Exports the value.
   * @returns The exported value.
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
