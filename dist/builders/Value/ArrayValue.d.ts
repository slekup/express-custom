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
export default class ArrayValueBuilder extends BaseValue implements ArrayValue<ValueSchema> {
    type: "array";
    min?: number;
    max?: number;
    unique?: boolean;
    contains?: ArrayContains;
    items?: ValueSchema | ValueSchema[];
    /**
     * Creates an instance of the array value builder class.
     * @param options The options of the array value.
     * @param options.min The minimum amount of items in the array value.
     * @param options.max The maximum amount of items in the array value.
     * @param options.unique Whether the array value is unique.
     * @param options.contains The type that the array value needs to contain.
     * @param options.items The items of the array value.
     */
    constructor({ min, max, unique, contains, items, ...options }: ArrayValueOptions);
    /**
     * Exports the array value.
     * @returns The array value.
     */
    export(): unknown;
}
//# sourceMappingURL=ArrayValue.d.ts.map