import { Schema } from '@utils/index';
import ValueBuilder from './ValueBuilders';

/**
 * The Schema Builder class.
 */
export default class SchemaBuilder {
  public schema: Schema;

  /**
   * Creates a new schema.
   */
  public constructor() {
    this.schema = {} as Schema;
  }

  /**
   * Adds a string value to the schema.
   * @param callback The callback to build the string value.
   * @returns The schema builder.
   */
  public addStringValue(callback: (value: ValueBuilder) => void): this {
    const value = new ValueBuilder('string');
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a number value to the schema.
   * @param callback The callback to build the number value.
   * @returns The schema builder.
   */
  public addNumberValue(callback: (value: ValueBuilder) => void): this {
    const value = new ValueBuilder('number');
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a integer value to the schema.
   * @param callback The callback to build the integer value.
   * @returns The schema builder.
   */
  public addIntegerValue(callback: (value: ValueBuilder) => void): this {
    const value = new ValueBuilder('integer');
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a boolean value to the schema.
   * @param callback The callback to build the boolean value.
   * @returns The schema builder.
   */
  public addBooleanValue(callback: (value: ValueBuilder) => void): this {
    const value = new ValueBuilder('boolean');
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a object value to the schema.
   * @param callback The callback to build the object value.
   * @returns The schema builder.
   */
  public addObjectValue(callback: (value: ValueBuilder) => void): this {
    const value = new ValueBuilder('object');
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a array value to the schema.
   * @param callback The callback to build the array value.
   * @returns The schema builder.
   */
  public addArrayValue(callback: (value: ValueBuilder) => void): this {
    const value = new ValueBuilder('array');
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a image value to the schema.
   * @param callback The callback to build the image value.
   * @returns The schema builder.
   */
  public addImageValue(callback: (value: ValueBuilder) => void): this {
    const value = new ValueBuilder('image');
    callback(value);
    this.schema[value.name] = value;
    return this;
  }
}
