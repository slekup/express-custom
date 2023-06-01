import BaseValueBuilder from '@builders/Base/BaseValueBuilder';
import { StringTest, StringValue } from '@typings/schema';

/**
 * The string value builder class.
 */
export default class StringValueBuilder
  extends BaseValueBuilder
  implements StringValue
{
  public type = 'string' as const;
  public min?: number;
  public max?: number;
  public options?: string[];
  public test?: StringTest;

  /**
   * Creates an instance of the string value builder class.
   */
  public constructor() {
    super();
  }

  /**
   * Sets the min of the value.
   * @param min The min of the value.
   * @returns The string value builder.
   */
  public setMin(min: number): Omit<this, 'setMin'> {
    this.min = min;
    return this;
  }

  /**
   * Sets the max of the value.
   * @param max The max of the value.
   * @returns The string value builder.
   */
  public setMax(max: number): this {
    this.max = max;
    return this;
  }

  /**
   * Set an array of string values which the value must be one of.
   * @param options An array of string options.
   * @returns The string value builder.
   */
  public setOptions(options: string[]): this {
    this.options = options;
    return this;
  }

  /**
   * Sets the test regex for the string to be tested against.
   * @param test The test of the value.
   * @returns The string value builder.
   */
  public setTest(test: StringTest): this {
    this.test = test;
    return this;
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
