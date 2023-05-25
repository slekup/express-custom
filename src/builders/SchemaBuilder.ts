import { BaseSchema, Schema, SchemaCheck, SchemaItems, SchemaOption, SchemaTest, SchemaTypes } from '@utils/index';

/**
 * The value builder class.
 */
class ValueBuilder implements BaseSchema {
  public name: string;
  public type: SchemaTypes;
  public typeSchema?: `{${string}}`;
  public description: string;
  public required: boolean;
  public options?: SchemaOption[];
  public enum?: unknown[];
  public items?: SchemaItems;
  public min?: number;
  public max?: number;
  public checks?: SchemaCheck[];
  public properties?: Schema;
  public test?: SchemaTest;

  /**
   * Sets the name of the value.
   * @param type The type of the value.
   */
  public constructor(type: SchemaTypes) {
    this.name = 'Name not provided';
    this.type = type;
    this.description = 'Description not provided';
    this.required = true; // Default to true
  }

  /**
   * Sets the type of the value.
   * @param name The name of the value.
   * @returns The value builder.
   */
  public setName(name: string): this {
    this.name = name;
    return this;
  }

  /**
   * Sets the type schema of the value.
   * @param typeSchema The type schema of the value.
   * @returns The value builder.
   */
  public setTypeSchema(typeSchema: `{${string}}`): this {
    this.typeSchema = typeSchema;
    return this;
  }

  /**
   * Sets the description of the value.
   * @param description The description of the value.
   * @returns The value builder.
   */
  public setDescription(description: string): this {
    this.description = description;
    return this;
  }

  /**
   * Sets whether the value is required.
   * @param required Whether the value is required.
   * @returns The value builder.
   */
  public setRequired(required: boolean): this {
    this.required = required;
    return this;
  }

  /**
   * Sets the options of the value.
   * @param options The options of the value.
   * @returns The value builder.
   */
  public setOptions(options: SchemaOption[]): this {
    this.options = options;
    return this;
  }

  /**
   * Sets the enum of the value.
   * @param enumValue The enum of the value.
   * @returns The value builder.
   */
  public setEnum(enumValue: unknown[]): this {
    this.enum = enumValue;
    return this;
  }

  /**
   * Sets the items of the value.
   * @param items The items of the value.
   * @returns The value builder.
   */
  public setItems(items: SchemaItems): this {
    this.items = items;
    return this;
  }

  /**
   * Sets the min of the value.
   * @param min The min of the value.
   * @returns The value builder.
   */
  public setMin(min: number): this {
    this.min = min;
    return this;
  }

  /**
   * Sets the max of the value.
   * @param max The max of the value.
   * @returns The value builder.
   */
  public setMax(max: number): this {
    this.max = max;
    return this;
  }

  /**
   * Sets the checks of the value.
   * @param checks The checks of the value.
   * @returns The value builder.
   */
  public setChecks(checks: SchemaCheck[]): this {
    this.checks = checks;
    return this;
  }

  /**
   * Sets the properties of the value.
   * @param properties The properties of the value.
   * @returns The value builder.
   */
  public setProperties(properties: Schema): this {
    this.properties = properties;
    return this;
  }

  /**
   * Sets the test of the value.
   * @param test The test of the value.
   * @returns The value builder.
   */
  public setTest(test: SchemaTest): this {
    this.test = test;
    return this;
  }
}

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
  public addStringValue = (callback: (value: ValueBuilder) => void): this => {
    const value = new ValueBuilder('string');
    callback(value);
    this.schema[value.name] = value;
    return this;
  };

  /**
   * Adds a number value to the schema.
   * @param callback The callback to build the number value.
   * @returns The schema builder.
   */
  public addNumberValue = (callback: (value: ValueBuilder) => void): this => {
    const value = new ValueBuilder('number');
    callback(value);
    this.schema[value.name] = value;
    return this;
  };

  /**
   * Adds a integer value to the schema.
   * @param callback The callback to build the integer value.
   * @returns The schema builder.
   */
  public addIntegerValue = (callback: (value: ValueBuilder) => void): this => {
    const value = new ValueBuilder('integer');
    callback(value);
    this.schema[value.name] = value;
    return this;
  };

  /**
   * Adds a boolean value to the schema.
   * @param callback The callback to build the boolean value.
   * @returns The schema builder.
   */
  public addBooleanValue = (callback: (value: ValueBuilder) => void): this => {
    const value = new ValueBuilder('boolean');
    callback(value);
    this.schema[value.name] = value;
    return this;
  };

  /**
   * Adds a object value to the schema.
   * @param callback The callback to build the object value.
   * @returns The schema builder.
   */
  public addObjectValue = (callback: (value: ValueBuilder) => void): this => {
    const value = new ValueBuilder('object');
    callback(value);
    this.schema[value.name] = value;
    return this;
  };

  /**
   * Adds a array value to the schema.
   * @param callback The callback to build the array value.
   * @returns The schema builder.
   */
  public addArrayValue = (callback: (value: ValueBuilder) => void): this => {
    const value = new ValueBuilder('array');
    callback(value);
    this.schema[value.name] = value;
    return this;
  };

  /**
   * Adds a image value to the schema.
   * @param callback The callback to build the image value.
   * @returns The schema builder.
   */
  public addImageValue = (callback: (value: ValueBuilder) => void): this => {
    const value = new ValueBuilder('image');
    callback(value);
    this.schema[value.name] = value;
    return this;
  };
}
