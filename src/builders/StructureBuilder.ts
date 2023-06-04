type StructureType = 'schema' | 'option';

interface StructureField {
  name: string;
  description: string;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  structure?: string;
  option?: string;
}

/**
 * The StructureBuilder class is used to build a example structures for object schemas and value options.
 */
export default class StructureBuilder {
  private name: string;
  private type: StructureType;
  private fields: StructureField[];

  /**
   * The name of the structure.
   * @param fields The fields of the structure.
   * @param fields.name The name of the field.
   * @param fields.type The type of the field.
   * @param fields.fields The fields of the field.
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
    this.name = name;
    this.type = type;
    this.fields = fields;
  }

  /**
   * Exports the structure.
   * @returns The exported structure.
   */
  public export(): {
    name: string;
    type: StructureType;
    fields: StructureField[];
  } {
    return {
      name: this.name,
      type: this.type,
      fields: this.fields,
    };
  }
}
