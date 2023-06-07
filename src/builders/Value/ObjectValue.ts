import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { ObjectValue, Schema } from '@typings/schema';

export type ObjectValueOptions = BaseValueOptions & {
  properties: Schema;
};

/**
 * The object value builder class.
 */
export default class ObjectValueBuilder<T>
  extends BaseValue
  implements ObjectValue<T>
{
  public type = 'object' as const;
  public properties: Schema;

  /**
   * Creates an instance of the object value builder class.
   * @param options The options of the object value builder class.
   */
  public constructor(options: ObjectValueOptions) {
    super(options);
    this.properties = {};
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
