import { StructureField, StructureType } from '@typings/core';
import { ExportedStructure } from '@typings/exports';

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
  public constructor({
    name,
    type,
    fields,
  }: {
    name: string;
    type: StructureType;
    fields: StructureField[];
  }) {
    // Assign the properties to the instance.
    this.name = name;
    this.type = type;
    this.fields = fields;
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
