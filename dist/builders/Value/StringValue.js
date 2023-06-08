import BaseValue from '@builders/Base/BaseValue';
/**
 * The StringValue class, used to create string values.
 */
export default class StringValue extends BaseValue {
    type = 'string';
    min;
    max;
    options;
    test;
    /**
     * Creates an instance of the StringValue class.
     * @param options The options for the StringValue class.
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
     * Exports the StringValue class properties.
     * @returns The StringValue class properties.
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