import BaseValue from '@builders/Base/BaseValue';
/**
 * The integer value builder class.
 */
export default class IntegerValueBuilder extends BaseValue {
    type = 'integer';
    min;
    max;
    /**
     * Creates an instance of the integer value builder class.
     * @param options The options of the integer value.
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
//# sourceMappingURL=IntegerValue.js.map