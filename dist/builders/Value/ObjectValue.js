import BaseValue from '@builders/Base/BaseValue';
/**
 * The ObjectValue class, used to create object values.
 */
export default class ObjectValue extends BaseValue {
    type = 'object';
    properties;
    /**
     * Creates an instance of the ObjectValue class.
     * @param options The options for the ObjectValue class.
     */
    constructor(options) {
        super(options);
        this.properties = {};
    }
    /**
     * Exports the ObjectValue class properties.
     * @returns The ObjectValue class properties.
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
//# sourceMappingURL=ObjectValue.js.map