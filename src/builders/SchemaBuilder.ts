//  Disable the no-param-reassign rule as it is needed to assign default values to undefined parameters.
/* eslint-disable no-param-reassign */

import { Response } from 'express';

import { Schema } from '@typings/schema';
import {
  validateEmail,
  validateImage,
  validateIpv4Address,
  validatePath,
  validatePhoneNumber,
  validateUrl,
  validateUsername,
  valiedatePassword,
} from '@utils/validate';
import { ExportedValue } from './Base/BaseValueBuilder';
import {
  ArrayValueBuilder,
  BooleanValueBuilder,
  ImageValueBuilder,
  IntegerValueBuilder,
  NumberValueBuilder,
  ObjectValueBuilder,
  StringValueBuilder,
} from './Value';

export type ExportedSchema = Record<string, ExportedValue<ExportedSchema>>;

type ValueBuilders =
  | ArrayValueBuilder
  | StringValueBuilder
  | NumberValueBuilder
  | IntegerValueBuilder
  | BooleanValueBuilder
  | ObjectValueBuilder<ValueBuilders>
  | ImageValueBuilder;

export type BuildersSchema = Record<string, ValueBuilders>;

/**
 * The Schema Builder class.
 */
export default class SchemaBuilder {
  public schema: BuildersSchema;

  /**
   * Creates a new schema.
   */
  public constructor() {
    this.schema = {};
  }

  /**
   * Adds a array value to the schema.
   * @param callback The callback to build the array value.
   * @returns The schema builder.
   */
  public addArray(callback: (value: ArrayValueBuilder) => void): this {
    const value = new ArrayValueBuilder();
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a string value to the schema.
   * @param callback The callback to build the string value.
   * @returns The schema builder.
   */
  public addString(callback: (value: StringValueBuilder) => void): this {
    const value = new StringValueBuilder();
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a number value to the schema.
   * @param callback The callback to build the number value.
   * @returns The schema builder.
   */
  public addNumber(callback: (value: NumberValueBuilder) => void): this {
    const value = new NumberValueBuilder();
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a integer value to the schema.
   * @param callback The callback to build the integer value.
   * @returns The schema builder.
   */
  public addInteger(callback: (value: IntegerValueBuilder) => void): this {
    const value = new IntegerValueBuilder();
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a boolean value to the schema.
   * @param callback The callback to build the boolean value.
   * @returns The schema builder.
   */
  public addBoolean(callback: (value: BooleanValueBuilder) => void): this {
    const value = new BooleanValueBuilder();
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a object value to the schema.
   * @param callback The callback to build the object value.
   * @returns The schema builder.
   */
  public addObject(
    callback: (value: ObjectValueBuilder<ValueBuilders>) => void
  ): this {
    const value = new ObjectValueBuilder<ValueBuilders>();
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a image value to the schema.
   * @param callback The callback to build the image value.
   * @returns The schema builder.
   */
  public addImage(callback: (value: ImageValueBuilder) => void): this {
    const value = new ImageValueBuilder();
    callback(value);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Validate an object against a schema.
   * @param data The object data to validate.
   * @param schema The schema to validate against.
   * @param properties Whether to validate the schema properties or not.
   * @returns A string if the validation fails, false otherwise.
   */
  private async validateBase<T = 'schema'>(
    data: Record<string, unknown>,
    schema:
      | (T extends 'schema' ? BuildersSchema : never)
      | (T extends 'properties' ? Schema : never),
    properties?: boolean
  ): Promise<string | boolean> {
    // Check if the data is an object
    if (typeof data !== 'object') return 'The data provided must be an object.';

    const schemaFields = properties
      ? Object.entries(schema as Schema)
      : Object.entries(schema as BuildersSchema);

    for (const [key, value] of schemaFields) {
      // Check if all required fields have been provided.
      // If the field has a default value as the required value is not provided, set the field to the default value.
      if (value.required) {
        if (!data[key] && value.defaultValue) {
          data[key] = value.defaultValue;
          break;
        } else if (!data[key]) {
          return `The field "${key}" has not been provided.`;
        }
      }

      // For non required fields, if the value is not provided, set the field to the default value if it exists.
      if (!data[key] && value.defaultValue) {
        data[key] = value.defaultValue;
        return false;
      } else if (!data[key]) {
        return false;
      }
    }

    // Check if all provided fields are the correct type
    for (const [key, value] of schemaFields) {
      if (typeof data[key] !== value.type)
        return `The field "${key}" must be of type ${value.type}.`;
    }

    // Check if all provided fields are valid
    for (const [key, value] of schemaFields) {
      // Number validation
      if (value.type === 'number') {
        // If both min and max are provided, check if the schema value is within the range
        if (
          value.min &&
          value.max &&
          typeof data[key] === 'number' &&
          ((data[key] as number) < value.min ||
            (data[key] as number) > value.max)
        )
          return `The field "${key}" must be between ${value.min} and ${value.max}.`;

        // Check if the schema value is above the minimum required value
        if (
          value.min &&
          typeof data[key] === 'number' &&
          (data[key] as number) < value.min
        )
          return `The field "${key}" must be at least ${value.min}.`;

        // Check if the schema value is below the maximum required value
        if (
          value.max &&
          typeof data[key] === 'number' &&
          (data[key] as number) > value.max
        )
          return `The field "${key}" must be less than ${value.max}.`;
      }

      // Integer validation
      if (value.type === 'integer') {
        // If both min and max are provided, check if the schema value is within the range
        if (
          value.min &&
          value.max &&
          typeof data[key] === 'number' &&
          ((data[key] as number) < value.min ||
            (data[key] as number) > value.max)
        )
          return `The field "${key}" must be between ${value.min} and ${value.max}.`;

        // Check if the schema value is above the minimum required value
        if (
          value.min &&
          typeof data[key] === 'number' &&
          (data[key] as number) < value.min
        )
          return `The field "${key}" must be at least ${value.min}.`;

        // Check if the schema value is below the maximum required value
        if (
          value.max &&
          typeof data[key] === 'number' &&
          (data[key] as number) > value.max
        )
          return `The field "${key}" must be less than ${value.max}.`;

        // Check if the schema value is an integer
        if (
          typeof data[key] !== 'number' ||
          !Number.isInteger(data[key] as number)
        )
          return `The field "${key}" must be an integer.`;
      }

      // String validation
      if (value.type === 'string') {
        const req = value;
        const testVal = data[key] as string;

        // Check if the schema value is included in the schema options
        if (value.options && !value.options.includes(data[key] as string))
          return `The field "${key}" is not a valid option.`;

        // If both min and max are provided, check if the schema value is within the range
        if (
          value.min &&
          value.max &&
          (testVal.length < value.min || testVal.length > value.max)
        )
          return `The field "${key}" must be between ${value.min} and ${value.max} characters.`;

        // Check if the schema value has the minimum required length
        if (value.min && testVal.length < value.min)
          return `The field "${key}" must be at least ${value.min} characters.`;

        // Check if the schema value has the maximum required length
        if (value.max && testVal.length > value.max)
          return `The field "${key}" must be less than ${value.max} characters.`;

        // Test if email is valid
        if (req.test === 'email' && !validateEmail(testVal))
          return `The field "${key}" must be a valid email address.`;

        // Test if username is valid
        if (req.test === 'username' && !validateUsername(testVal))
          return `The field "${key}" must be a valid username.`;

        // Test if password is valid
        if (req.test === 'passwordStrength' && !valiedatePassword(testVal))
          return `The field "${key}" is too weak to be a valid password.`;

        // Test if phone number is valid
        if (req.test === 'phoneNumber' && !validatePhoneNumber(testVal))
          return `The field "${key}" must be a valid phone number.`;

        // Test if IPv4 address is valid
        if (req.test === 'ipAddress' && !validateIpv4Address(testVal))
          return `The field "${key}" must be a valid IPv4 address.`;

        // Test if a url is valid
        if (req.test === 'url' && !validateUrl(testVal))
          return `The field "${key}" must be a valid IPv4 address.`;

        // Test if a path is valid
        if (req.test === 'path' && !validatePath(testVal))
          return `The field "${key}" must be a valid path.`;

        // Test if the schema value is a string
        if (typeof data[key] !== 'string')
          return `The field "${key}" must be a string.`;
      }

      // Check if the schema value passes all checks
      if (value.checks)
        for (const check of value.checks) {
          const passedCheck = await check.run(key);
          if (!passedCheck) return `${check.response}.`;
        }

      // Boolean validation
      if (value.type === 'boolean') {
        // TODO: Check this works
        // Check if the schema value is a boolean
        if (typeof data[key] !== 'boolean')
          return `The field "${key}" must be a boolean.`;
      }

      // Object validation
      if (value.type === 'object') {
        // TODO: Check this works
        // Check if the schema value is an object
        if (typeof data[key] !== 'object')
          return `The field "${key}" must be an object.`;

        // Check if the schema value has the correct properties
        if (value.properties && Object.keys(value.properties).length > 0) {
          const result = await this.validateBase<'properties'>(
            data[key] as Record<string, unknown>,
            value.properties as Schema,
            true
          );
          if (result) return result;
        }
      }

      // Array validation
      if (value.type === 'array') {
        // TODO: Check this works
        // Check if the schema value is an array
        if (!Array.isArray(data[key]))
          return `The field "${key}" must be an array.`;

        // TODO: Check if the schema value has the correct items
        /* if (value.items) {
          for (const item of data[key] as unknown[]) {
            if (typeof item !== value.items.type)
              return `The field "${key}" must be an array of ${value.items.type}.`;
            if (!value.items.options.includes(item))
              return `The field "${key}" must be an array of valid options.`;
          }
        } */
      }

      // Image validation
      if (value.type === 'image') {
        // TODO: Check this works
        // Check if the schema value is a string
        if (typeof data[key] !== 'string')
          return `The field "${key}" must be a string.`;

        // Check if the schema value is a valid image
        if (!validateImage(data[key] as string))
          return `The field "${key}" must be a valid image.`;
      }
    }

    return false;
  }

  /**
   * Run the validation function, and if the response object is provided, send a response if the validation fails.
   * @param data The object data to validate.
   * @param options The options to use when validating.
   * @param options.res The response object.
   * @returns A JSON response meaning it's invalid, or null if it's valid.
   */
  public async validate(
    data: Record<string, unknown>,
    options?: { res?: Response }
  ): Promise<Response | null | string> {
    const result = await this.validateBase(data, this.schema);
    if (typeof result !== 'string') return null;
    if (options?.res)
      return options.res.status(400).json({ status: 400, message: result });
    return result;
  }

  /**
   * Export the schema.
   * @returns The exported schema.
   */
  public export(): ExportedSchema {
    const exportSchema: Record<string, ExportedValue<ExportedSchema>> = {};

    Object.entries(this.schema).forEach(([key, value]) => {
      const exportedValue = value.export() as ExportedValue<ExportedSchema>;
      exportSchema[key] = exportedValue;
    });

    return exportSchema;
  }
}
