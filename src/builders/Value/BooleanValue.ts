import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { BooleanValue } from '@typings/schema';

export type BooleanValueOptions = BaseValueOptions;

/**
 * The boolean value builder class.
 */
export default class BooleanValueBuilder
  extends BaseValue
  implements BooleanValue
{
  public type = 'boolean' as const;

  /**
   * Creates an instance of the boolean value builder class.
   * @param options The options of the boolean value.
   */
  public constructor(options: BooleanValueOptions) {
    super(options);
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
