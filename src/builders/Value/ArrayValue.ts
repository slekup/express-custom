import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { ArrayContains, ArrayValue, ValueSchema } from '@typings/schema';

export type ArrayValueOptions = BaseValueOptions & {
  min?: number;
  max?: number;
  unique?: boolean;
  contains?: ArrayContains;
  items?: ValueSchema | ValueSchema[];
};

/**
 * The array value builder class.
 */
export default class ArrayValueBuilder
  extends BaseValue
  implements ArrayValue<ValueSchema>
{
  public type = 'array' as const;
  public min?: number;
  public max?: number;
  public unique: boolean;
  public contains?: ArrayContains;
  public items?: ValueSchema | ValueSchema[];

  /**
   * Creates an instance of the array value builder class.
   * @param options The options of the array value.
   * @param options.min The minimum amount of items in the array value.
   * @param options.max The maximum amount of items in the array value.
   * @param options.unique Whether the array value is unique.
   * @param options.contains The type that the array value needs to contain.
   * @param options.items The items of the array value.
   */
  public constructor({
    min,
    max,
    unique,
    contains,
    items,
    ...options
  }: ArrayValueOptions) {
    super(options);
    this.min = min;
    this.max = max;
    this.unique = unique ?? false;
    this.contains = contains;
    this.items = items;
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
