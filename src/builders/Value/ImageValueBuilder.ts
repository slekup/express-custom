import BaseValueBuilder from '@builders/Base/BaseValueBuilder';
import { ImageValue } from '@typings/schema';

/**
 * The image value builder class.
 */
export default class ImageValueBuilder
  extends BaseValueBuilder
  implements ImageValue
{
  public type = 'image' as const;

  /**
   * Creates an instance of the image value builder class.
   */
  public constructor() {
    super();
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
