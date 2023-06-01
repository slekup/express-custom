import BaseValueBuilder from '@builders/Base/BaseValueBuilder';
import { BooleanValue } from '@typings/schema';

/**
 * The boolean value builder class.
 */
export default class BooleanValueBuilder
  extends BaseValueBuilder
  implements BooleanValue
{
  public type = 'boolean' as const;

  /**
   * Creates an instance of the boolean value builder class.
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
