import BaseValue from '@builders/Base/BaseValue';
/**
 * The BooleanValue class, used to create boolean values.
 */
export default class BooleanValue extends BaseValue {
    type = 'boolean';
    /**
     * Creates an instance of the BooleanValue class.
     * @param options The options for the BooleanValue class.
     */
    constructor(options) {
        super(options);
    }
    /**
     * Exports the BooleanValue class properties.
     * @returns The BooleanValue class properties.
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
//# sourceMappingURL=BooleanValue.js.map