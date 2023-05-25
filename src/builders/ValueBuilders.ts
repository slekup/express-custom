import {
  BaseSchema,
  Schema,
  SchemaCheck,
  SchemaItems,
  SchemaOption,
  SchemaTest,
  SchemaTypes,
} from '@utils/index';

/**
 * The value builder class.
 */
export default class ValueBuilder implements BaseSchema {
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
