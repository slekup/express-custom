import BaseValue from '@builders/Base/BaseValue';
/**
 * The boolean value builder class.
 */
export default class BooleanValueBuilder extends BaseValue {
    type = 'boolean';
    /**
     * Creates an instance of the boolean value builder class.
     * @param options The options of the boolean value.
     */
    constructor(options) {
        super(options);
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
//# sourceMappingURL=BooleanValue.js.map