import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { INumberValue } from '@typings/schema';

export type NumberValueOptions = BaseValueOptions & {
  min?: number;
  max?: number;
};

/**
 * The NumberValue class, used to create number values.
 */
export default class NumberValue extends BaseValue implements INumberValue {
  public type = 'number' as const;
  public min?: number;
  public max?: number;

  /**
   * Creates an instance of the NumberValue class.
   * @param options The options for the NumberValue class.
   */
  public constructor(options: NumberValueOptions) {
    super(options);
    if (options.min) this.min = options.min;
    if (options.max) this.max = options.max;
  }

  /**
   * Exports the NumberValue class properties.
   * @returns The NumberValue class properties.
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
