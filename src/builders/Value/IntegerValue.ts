import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IIntegerValue } from '@typings/schema';

export type IntegerValueOptions = BaseValueOptions & {
  min?: number;
  max?: number;
};

/**
 * The InetgerValue class, used to create integer values.
 */
export default class IntegerValue extends BaseValue implements IIntegerValue {
  public type = 'integer' as const;
  public min?: number;
  public max?: number;

  /**
   * Creates an instance of the IntegerValue class.
   * @param options The options for the IntegerValue class.
   */
  public constructor(options: IntegerValueOptions) {
    super(options);
    if (options.min) this.min = options.min;
    if (options.max) this.max = options.max;
  }

  /**
   * Exports the IntegerValue class properties.
   * @returns The IntegerValue class properties.
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
