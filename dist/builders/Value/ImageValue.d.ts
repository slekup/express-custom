import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { ImageValue } from '@typings/schema';
export type ImageValueOptions = BaseValueOptions;
/**
 * The image value builder class.
 */
export default class ImageValueBuilder extends BaseValue implements ImageValue {
    type: "image";
    /**
     * Creates an instance of the image value builder class.
     * @param options The options of the image value.
     */
    constructor(options: ImageValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}
