import { StructureField, StructureType } from '@typings/core';
import { ExportedStructure } from '@typings/exports';
import { Schema } from 'builder-validation';

export interface StructureOptions extends Record<string, unknown> {
  name: string;
  type: StructureType;
  fields: StructureField[];
}

/**
 * The StructureBuilder class, used to build a example structures for object schemas and value options.
 */
export default class Structure {
  private name: string;
  private type: StructureType;
  private fields: StructureField[];

  /**
   * Creates a new instance of the StructureBuilder class.
   * @param options The options for the StructureBuilder class.
   * @param options.name The name of the structure.
   * @param options.type The type of the structure.
   * @param options.fields The fields of the structure.
   */
  public constructor(options: StructureOptions) {
    const constructorSchema = new Schema()
      .addString({
        name: 'name',
        required: true,
      })
      .addString({
        name: 'type',
        required: true,
        options: ['schema', 'option'],
      })
      .addArray({
        name: 'fields',
        required: true,
      });

    // Test the the constructor against the schema.
    constructorSchema.validate(options).then((result) => {
      if (typeof result === 'string')
        throw new Error(`Structure (${options.name}): ${result}`);
    });

    // Assign the properties to the instance.
    this.name = options.name;
    this.type = options.type;
    this.fields = options.fields;
  }

  /**
   * Exports the structure as a JSON object.
   * @returns The exported structure as a JSON object.
   */
  public export(): ExportedStructure {
    return {
      name: this.name,
      type: this.type,
      fields: this.fields,
    };
  }
}
