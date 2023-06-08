import BaseValue from '@builders/Base/BaseValue';
/**
 * The ImageValue class, used to create image values.
 */
export default class ImageValue extends BaseValue {
    type = 'image';
    /**
     * Creates an instance of the ImageValue class.
     * @param options The options for the ImageValue class.
     */
    constructor(options) {
        super(options);
    }
    /**
     * Exports the ImageValue class properties.
     * @returns The ImageValue class properties.
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
//# sourceMappingURL=ImageValue.js.map