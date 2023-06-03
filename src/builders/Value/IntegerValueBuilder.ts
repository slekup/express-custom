import BaseValueBuilder from '@builders/Base/BaseValueBuilder';
import { IntegerValue } from '@typings/schema';

/**
 * The integer value builder class.
 */
export default class IntegerValueBuilder
  extends BaseValueBuilder
  implements IntegerValue
{
  public type = 'integer' as const;
  public min?: number;
  public max?: number;

  /**
   * Creates an instance of the integer value builder class.
   */
  public constructor() {
    super();
  }

  /**
   * Sets the minimun value the integer can be.
   * @param min The min of the value.
   * @returns The integer value builder.
   */
  public setMin(min: number): this {
    this.min = min;
    return this;
  }

  /**
   * Sets the maximum value the integer can be.
   * @param max The max of the value.
   * @returns The integer value builder.
   */
  public setMax(max: number): this {
    this.max = max;
    return this;
  }

  /**
   * Sets the default value of the value.
   * @param defaultValue The default value of the value.
   * @returns The integer value builder.
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
