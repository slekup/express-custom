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
export default class ArrayValue extends BaseValue implements IArrayValue<ValueSchema> {
    type: "array";
    min?: number;
    max?: number;
    unique?: boolean;
    contains?: ArrayContains;
    items?: ValueSchema | ValueSchema[];
    /**
     * Creates an instance of the ArrayValue class.
     * @param options The options for the ArrayValue class.
     * @param options.min The minimum amount of items in the array.
     * @param options.max The maximum amount of items in the array.
     * @param options.unique Whether the array is unique.
     * @param options.contains The type that the array needs to contain.
     * @param options.items The items of the array to be matched.
     */
    constructor({ min, max, unique, contains, items, ...options }: ArrayValueOptions);
    /**
     * Exports the ArrayValue class properties.
     * @returns The ArrayValue class properties.
     */
    export(): unknown;
}
//# sourceMappingURL=ArrayValue.d.ts.map