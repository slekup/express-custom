import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IImageValue } from '@typings/schema';
export type ImageValueOptions = BaseValueOptions;
/**
 * The ImageValue class, used to create image values.
 */
export default class ImageValue extends BaseValue implements IImageValue {
    type: "image";
    /**
     * Creates an instance of the ImageValue class.
     * @param options The options for the ImageValue class.
     */
    constructor(options: ImageValueOptions);
    /**
     * Exports the ImageValue class properties.
     * @returns The ImageValue class properties.
     */
    export(): unknown;
}
//# sourceMappingURL=ImageValue.d.ts.map