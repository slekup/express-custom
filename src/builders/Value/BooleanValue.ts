import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IBooleanValue } from '@typings/schema';

export type BooleanValueOptions = BaseValueOptions;

/**
 * The BooleanValue class, used to create boolean values.
 */
export default class BooleanValue extends BaseValue implements IBooleanValue {
  public type = 'boolean' as const;

  /**
   * Creates an instance of the BooleanValue class.
   * @param options The options for the BooleanValue class.
   */
  public constructor(options: BooleanValueOptions) {
    super(options);
  }

  /**
   * Exports the BooleanValue class properties.
   * @returns The BooleanValue class properties.
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
