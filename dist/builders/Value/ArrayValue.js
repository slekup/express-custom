import BaseValue from '@builders/Base/BaseValue';
/**
 * The array value builder class.
 */
export default class ArrayValueBuilder extends BaseValue {
    type = 'array';
    min;
    max;
    unique;
    contains;
    items;
    /**
     * Creates an instance of the array value builder class.
     * @param options The options of the array value.
     * @param options.min The minimum amount of items in the array value.
     * @param options.max The maximum amount of items in the array value.
     * @param options.unique Whether the array value is unique.
     * @param options.contains The type that the array value needs to contain.
     * @param options.items The items of the array value.
     */
    constructor({ min, max, unique, contains, items, ...options }) {
        super(options);
        if (min)
            this.min = min;
        if (max)
            this.max = max;
        this.unique = unique ?? false;
        if (contains)
            this.contains = contains;
        if (items)
            this.items = items;
    }
    /**
     * Exports the array value.
     * @returns The array value.
     */
    export() {
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
//# sourceMappingURL=ArrayValue.js.map