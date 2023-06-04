import BaseValueBuilder from '@builders/Base/BaseValueBuilder';
import { NumberValue } from '@typings/schema';

/**
 * The number value builder class.
 */
export default class NumberValueBuilder
  extends BaseValueBuilder
  implements NumberValue
{
  public type = 'number' as const;
  public min?: number;
  public max?: number;

  /**
   * Creates an instance of the number value builder class.
   */
  public constructor() {
    super();
  }

  /**
   * Sets the minimum value the number can be.
   * @param min The min of the value.
   * @returns The number value builder.
   */
  public setMin(min: number): this {
    this.min = min;
    return this;
  }

  /**
   * Sets the maximum value the number can be.
   * @param max The max of the value.
   * @returns The number value builder.
   */
  public setMax(max: number): this {
    this.max = max;
    return this;
  }

  /**
   * Sets the default value of the value.
   * @param defaultValue The default value of the value.
   * @returns The number value builder.
   */
  public setDefault(defaultValue: number): this {
    this.defaultValue = defaultValue;
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
