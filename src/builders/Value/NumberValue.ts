import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { NumberValue } from '@typings/schema';

export type NumberValueOptions = BaseValueOptions & {
  min?: number;
  max?: number;
};

/**
 * The number value builder class.
 */
export default class NumberValueBuilder
  extends BaseValue
  implements NumberValue
{
  public type = 'number' as const;
  public min?: number;
  public max?: number;

  /**
   * Creates an instance of the number value builder class.
   * @param options The options of the number value.
   */
  public constructor(options: NumberValueOptions) {
    super(options);
    this.min = options.min;
    this.max = options.max;
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
