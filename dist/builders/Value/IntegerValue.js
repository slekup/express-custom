import BaseValue from '@builders/Base/BaseValue';
/**
 * The InetgerValue class, used to create integer values.
 */
export default class IntegerValue extends BaseValue {
    type = 'integer';
    min;
    max;
    /**
     * Creates an instance of the IntegerValue class.
     * @param options The options for the IntegerValue class.
     */
    constructor(options) {
        super(options);
        if (options.min)
            this.min = options.min;
        if (options.max)
            this.max = options.max;
    }
    /**
     * Exports the IntegerValue class properties.
     * @returns The IntegerValue class properties.
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