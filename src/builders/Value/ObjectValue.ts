import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IObjectValue, ISchema } from '@typings/schema';

export type ObjectValueOptions = BaseValueOptions & {
  properties: ISchema;
};

/**
 * The ObjectValue class, used to create object values.
 */
export default class ObjectValue<T>
  extends BaseValue
  implements IObjectValue<T>
{
  public type = 'object' as const;
  public properties: ISchema;

  /**
   * Creates an instance of the ObjectValue class.
   * @param options The options for the ObjectValue class.
   */
  public constructor(options: ObjectValueOptions) {
    super(options);
    this.properties = {};
  }

  /**
   * Exports the ObjectValue class properties.
   * @returns The ObjectValue class properties.
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
