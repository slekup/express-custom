import BaseValue from '@builders/Base/BaseValue';
/**
 * The image value builder class.
 */
export default class ImageValueBuilder extends BaseValue {
    type = 'image';
    /**
     * Creates an instance of the image value builder class.
     * @param options The options of the image value.
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
//# sourceMappingURL=ImageValue.js.map