import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { ArrayContains, IArrayValue, ValueSchema } from '@typings/schema';

export type ArrayValueOptions = BaseValueOptions & {
  min?: number;
  max?: number;
  unique?: boolean;
  contains?: ArrayContains;
  items?: ValueSchema | ValueSchema[];
};

/**
 * The ArrayValue class, used to create array values.
 */
export default class ArrayValue
  extends BaseValue
  implements IArrayValue<ValueSchema>
{
  public type = 'array' as const;
  public min?: number;
  public max?: number;
  public unique?: boolean;
  public contains?: ArrayContains;
  public items?: ValueSchema | ValueSchema[];

  /**
   * Creates an instance of the ArrayValue class.
   * @param options The options for the ArrayValue class.
   * @param options.min The minimum amount of items in the array.
   * @param options.max The maximum amount of items in the array.
   * @param options.unique Whether the array is unique.
   * @param options.contains The type that the array needs to contain.
   * @param options.items The items of the array to be matched.
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
    if (min) this.min = min;
    if (max) this.max = max;
    this.unique = unique ?? false;
    if (contains) this.contains = contains;
    if (items) this.items = items;
  }

  /**
   * Exports the ArrayValue class properties.
   * @returns The ArrayValue class properties.
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
