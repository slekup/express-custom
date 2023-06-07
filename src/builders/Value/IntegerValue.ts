import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IntegerValue } from '@typings/schema';

export type IntegerValueOptions = BaseValueOptions & {
  min?: number;
  max?: number;
};

/**
 * The integer value builder class.
 */
export default class IntegerValueBuilder
  extends BaseValue
  implements IntegerValue
{
  public type = 'integer' as const;
  public min?: number;
  public max?: number;

  /**
   * Creates an instance of the integer value builder class.
   * @param options The options of the integer value.
   */
  public constructor(options: IntegerValueOptions) {
    super(options);
    if (options.min) this.min = options.min;
    if (options.max) this.max = options.max;
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
