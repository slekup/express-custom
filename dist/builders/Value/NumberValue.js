import BaseValue from '@builders/Base/BaseValue';
/**
 * The number value builder class.
 */
export default class NumberValueBuilder extends BaseValue {
    type = 'number';
    min;
    max;
    /**
     * Creates an instance of the number value builder class.
     * @param options The options of the number value.
     */
    constructor(options) {
        super(options);
        if (options.min)
            this.min = options.min;
        if (options.max)
            this.max = options.max;
    }
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export() {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            required: this.required,
            structure: this.structure,
        };
    }
}
//# sourceMappingURL=NumberValue.js.map