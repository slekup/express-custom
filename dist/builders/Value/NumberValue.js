import BaseValue from '@builders/Base/BaseValue';
/**
 * The NumberValue class, used to create number values.
 */
export default class NumberValue extends BaseValue {
    type = 'number';
    min;
    max;
    /**
     * Creates an instance of the NumberValue class.
     * @param options The options for the NumberValue class.
     */
    constructor(options) {
        super(options);
        if (options.min)
            this.min = options.min;
        if (options.max)
            this.max = options.max;
    }
    /**
     * Exports the NumberValue class properties.
     * @returns The NumberValue class properties.
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