import BaseValueBuilder from '@builders/Base/BaseValueBuilder';
import { ObjectValue, Schema } from '@typings/schema';

/**
 * The object value builder class.
 */
export default class ObjectValueBuilder<T>
  extends BaseValueBuilder
  implements ObjectValue<T>
{
  public type = 'object' as const;
  public properties: Schema;

  /**
   * Creates an instance of the object value builder class.
   */
  public constructor() {
    super();
    this.properties = {};
  }

  /**
   * Sets the properties of the value.
   * @param properties The properties of the value.
   * @returns The value builder.
   */
  public setProperties(properties: Schema): this {
    this.properties = properties;
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
