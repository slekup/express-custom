import BaseValueBuilder from '@builders/Base/BaseValueBuilder';
import {
  ArrayContains,
  ArrayValue,
  ValueSchema,
  ValueTypes,
} from '@typings/schema';

/**
 * The array value builder class.
 */
export default class ArrayValueBuilder
  extends BaseValueBuilder
  implements ArrayValue<ValueSchema>
{
  public type = 'array' as const;
  public min?: number;
  public max?: number;
  public unique?: boolean;
  public contains?: ArrayContains;
  public items?: ValueSchema | ValueSchema[];

  /**
   * Creates an instance of the array value builder class.
   */
  public constructor() {
    super();
  }

  /**
   * Sets the min of the value.
   * @param min The min of the value.
   * @returns The string value builder.
   */
  public setMin(min: number): this {
    this.min = min;
    return this;
  }

  /**
   * Sets the max of the value.
   * @param max The max of the value.
   * @returns The string value builder.
   */
  public setMax(max: number): this {
    this.max = max;
    return this;
  }

  /**
   * Sets whether the value is unique.
   * @param unique Whether the value is unique.
   * @returns The string value builder.
   */
  public setUnique(unique: boolean): this {
    this.unique = unique;
    return this;
  }

  /**
   * Set only one type that the array needs to contain.
   * @param contains The type that the array needs to contain.
   * @param min The minimum amount of times the type needs to be in the array.
   * @param max The maximum amount of times the type needs to be in the array.
   * @returns The string value builder.
   */
  public setContains(contains: ValueTypes, min?: number, max?: number): this {
    this.contains = {
      type: contains,
      ...(min ? { min } : {}),
      ...(max ? { max } : {}),
    };
    return this;
  }

  /**
   * Sets the items that the array needs to contain.
   * @param items The items that the array needs to contain.
   * @returns The string value builder.
   */
  public setItems(items: ValueSchema | ValueSchema[]): this {
    this.items = items;
    return this;
  }

  /**
   * Sets the default value of the array.
   * @param defaultValue The default value of the array.
   * @returns The array value builder.
   */
  public setDefault(defaultValue: unknown[]): this {
    this.defaultValue = defaultValue;
    return this;
  }

  /**
   * Exports the array value.
   * @returns The array value.
   */
  public export(): unknown {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      required: this.required,
      structure: this.structure,
      max: this.max,
      min: this.min,
      unique: this.unique,
    };
  }
}
