import BaseValue from '@builders/Base/BaseValue';
/**
 * The object value builder class.
 */
export default class ObjectValueBuilder extends BaseValue {
    type = 'object';
    properties;
    /**
     * Creates an instance of the object value builder class.
     * @param options The options of the object value builder class.
     */
    constructor(options) {
        super(options);
        this.properties = {};
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
//# sourceMappingURL=ObjectValue.js.map