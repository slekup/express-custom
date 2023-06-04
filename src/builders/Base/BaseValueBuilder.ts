import { BaseValueSchema, SchemaTypes, ValueCheck } from '@typings/schema';

export interface ExportedValue<T> {
  type: string;
  min?: number;
  max?: number;
  options?: string[];
  test?: string;
  items?: T;
  properties?: T;
}

/**
 * The base value builder class.
 * This class is not used for any value types, but is used to provide a base for all value builders.
 */
export default class BaseValueBuilder implements BaseValueSchema {
  public name: string;
  public description: string;
  public required: boolean;
  public checks: ValueCheck[];
  public structure?: string;
  public defaultValue?: SchemaTypes;

  /**
   * Sets the name of the value.
   */
  public constructor() {
    this.name = 'Name not provided';
    this.description = 'Description not provided';
    this.required = false; // Default to false
    this.checks = [];
  }

  /**
   * Sets the name of the value.
   * @param name The name of the value.
   * @returns The base value builder.
   */
  public setName(name: string): this {
    this.name = name;
    return this;
  }

  /**
   * Sets the description of the value.
   * @param description The description of the value.
   * @returns The base value builder.
   */
  public setDescription(description: string): this {
    this.description = description;
    return this;
  }

  /**
   * Sets whether the value is required.
   * @param required Whether the value is required.
   * @returns The base value builder.
   */
  public setRequired(required: boolean): this {
    this.required = required;
    return this;
  }

  /**
   * Add a custom function that returns a boolean to test the value against.
   * @param check The checks of the value.
   * @returns The base value builder.
   */
  public addCheck(check: ValueCheck): this {
    this.checks.push(check);
    return this;
  }

  /**
   * Sets the structure of the value.
   * @param structure The structure of the value.
   * @returns The base value builder.
   */
  public setStructure(structure: string): this {
    this.structure = structure;
    return this;
  }
}
