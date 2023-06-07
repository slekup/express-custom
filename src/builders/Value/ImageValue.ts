import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { ImageValue } from '@typings/schema';

export type ImageValueOptions = BaseValueOptions;

/**
 * The image value builder class.
 */
export default class ImageValueBuilder extends BaseValue implements ImageValue {
  public type = 'image' as const;

  /**
   * Creates an instance of the image value builder class.
   * @param options The options of the image value.
   */
  public constructor(options: ImageValueOptions) {
    super(options);
  }

  /**
   * Exports the value.
   * @returns The exported value.
   */
  public export(): unknown {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      required: this.required,
      structure: this.structure,
    };
  }
}
