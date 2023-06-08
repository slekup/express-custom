import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IImageValue } from '@typings/schema';

export type ImageValueOptions = BaseValueOptions;

/**
 * The ImageValue class, used to create image values.
 */
export default class ImageValue extends BaseValue implements IImageValue {
  public type = 'image' as const;

  /**
   * Creates an instance of the ImageValue class.
   * @param options The options for the ImageValue class.
   */
  public constructor(options: ImageValueOptions) {
    super(options);
  }

  /**
   * Exports the ImageValue class properties.
   * @returns The ImageValue class properties.
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
