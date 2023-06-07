import BaseValue from '@builders/Base/BaseValue';
/**
 * The string value builder class.
 */
export default class StringValueBuilder extends BaseValue {
    type = 'string';
    min;
    max;
    options;
    test;
    /**
     * Creates an instance of the string value builder class.
     * @param options The options of the string value.
     */
    constructor(options) {
        super(options);
        if (options.min)
            this.min = options.min;
        if (options.max)
            this.max = options.max;
        if (options.options)
            this.options = options.options;
        if (options.test)
            this.test = options.test;
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
//# sourceMappingURL=StringValue.js.map