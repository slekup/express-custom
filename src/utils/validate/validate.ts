import { Response } from 'express';

import * as tests from './tests';

export enum SchemaTest {
  Email = 'email',
  Username = 'username',
  PasswordStrength = 'passwordStrength',
  PhoneNumber = 'phoneNumber',
  IPAddress = 'ipAddress',
  URL = 'url',
}

export type SchemaOption = string | number | boolean | null | undefined;

type SchemaBaseTypes = 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'image';
export type SchemaTypes = SchemaBaseTypes | 'string';

export interface SchemaItems {
  type: SchemaTypes;
  enum: unknown[];
}

export interface SchemaCheck {
  run: ((value: string) => boolean) | ((value: string) => Promise<boolean>);
  response: string;
}

export interface BaseSchema<T = unknown> {
  description: string;
  required: boolean;
  options?: SchemaOption[];
  enum?: unknown[];
  items?: SchemaItems;
  min?: number;
  max?: number;
  checks?: SchemaCheck[];
  properties?: T;
  schema?: `{${string}}`;
}

interface SchemaWithTest<T> extends BaseSchema<T> {
  type: 'string';
  test?: SchemaTest;
}

interface SchemaWithoutTest<T> extends BaseSchema<T> {
  type: SchemaBaseTypes;
}

export type Schema = Record<string, SchemaWithTest<Schema> | SchemaWithoutTest<Schema>>;

export type SchemaProperty = SchemaWithTest<Schema> | SchemaWithoutTest<Schema>;

/**
 * Validate an object against a schema.
 * @param data The object data to validate.
 * @param schema The schema to validate against.
 * @returns A string if the validation fails, false otherwise.
 */
const validateBase = async (data: Record<string, unknown>, schema: Schema): Promise<string | boolean> => {
  // Check if the data is an object
  if (typeof data !== 'object') return 'The data provided must be an object.';

  const schemaFields = Object.entries(schema);

  // Check if all required fields have been provided
  for (const [key, value] of schemaFields) {
    if (value.required && !data[key]) return `The field "${key}" has not been provided.`;
  }

  // Check if all provided fields are the correct type
  for (const [key, value] of schemaFields) {
    if (typeof data[key] !== value.type) return `The field "${key}" must be of type ${value.type}.`;
  }

  // Check if all provided fields are valid
  for (const [key, value] of schemaFields) {
    // Check if the schema value is included in the schema options
    if (value.options && !value.options.includes(data[key] as string | number))
      return `The field "${key}" is not a valid option.`;

    // Number validation
    if (value.type === 'number') {
      // If both min and max are provided, check if the schema value is within the range
      if (
        value.min &&
        value.max &&
        typeof data[key] === 'number' &&
        ((data[key] as number) < value.min || (data[key] as number) > value.max)
      )
        return `The field "${key}" must be between ${value.min} and ${value.max}.`;

      // Check if the schema value is above the minimum required value
      if (value.min && typeof data[key] === 'number' && (data[key] as number) < value.min)
        return `The field "${key}" must be at least ${value.min}.`;

      // Check if the schema value is below the maximum required value
      if (value.max && typeof data[key] === 'number' && (data[key] as number) > value.max)
        return `The field "${key}" must be less than ${value.max}.`;
    }

    // Integer validation
    if (value.type === 'integer') {
      // If both min and max are provided, check if the schema value is within the range
      if (
        value.min &&
        value.max &&
        typeof data[key] === 'number' &&
        ((data[key] as number) < value.min || (data[key] as number) > value.max)
      )
        return `The field "${key}" must be between ${value.min} and ${value.max}.`;

      // Check if the schema value is above the minimum required value
      if (value.min && typeof data[key] === 'number' && (data[key] as number) < value.min)
        return `The field "${key}" must be at least ${value.min}.`;

      // Check if the schema value is below the maximum required value
      if (value.max && typeof data[key] === 'number' && (data[key] as number) > value.max)
        return `The field "${key}" must be less than ${value.max}.`;

      // Check if the schema value is an integer
      if (typeof data[key] !== 'number' || !Number.isInteger(data[key] as number))
        return `The field "${key}" must be an integer.`;
    }

    // String validation
    if (value.type === 'string') {
      const req = value;
      const testVal = data[key] as string;

      // If both min and max are provided, check if the schema value is within the range
      if (value.min && value.max && (testVal.length < value.min || testVal.length > value.max))
        return `The field "${key}" must be between ${value.min} and ${value.max} characters.`;

      // Check if the schema value has the minimum required length
      if (value.min && testVal.length < value.min)
        return `The field "${key}" must be at least ${value.min} characters.`;

      // Check if the schema value has the maximum required length
      if (value.max && testVal.length > value.max)
        return `The field "${key}" must be less than ${value.max} characters.`;

      // Test if email is valid
      if (req.test === SchemaTest.Email && !tests.email(testVal))
        return `The field "${key}" must be a valid email address.`;

      // Test if username is valid
      if (req.test === SchemaTest.Username && !tests.username(testVal))
        return `The field "${key}" must be a valid username.`;

      // Test if password is valid
      if (req.test === SchemaTest.PasswordStrength && !tests.password(testVal))
        return `The field "${key}" is too weak to be a valid password.`;

      // Test if phone number is valid
      if (req.test === SchemaTest.PhoneNumber && !tests.phone(testVal))
        return `The field "${key}" must be a valid phone number.`;

      // Test if IPv4 address is valid
      if (req.test === SchemaTest.IPAddress && !tests.ipv4Address(testVal))
        return `The field "${key}" must be a valid IPv4 address.`;

      // Test if a url is valid
      if (req.test === SchemaTest.URL && !tests.url(testVal)) return `The field "${key}" must be a valid IPv4 address.`;

      // Test if the schema value is a string
      if (typeof data[key] !== 'string') return `The field "${key}" must be a string.`;
    }

    // Check if the schema value passes all checks
    if (value.checks) {
      for (const check of value.checks) {
        const passedCheck = await check.run(key);
        if (!passedCheck) return `${check.response}.`;
      }
    }

    // Boolean validation
    if (value.type === 'boolean') {
      // TODO: Check this works
      // Check if the schema value is a boolean
      if (typeof data[key] !== 'boolean') return `The field "${key}" must be a boolean.`;
    }

    // Object validation
    if (value.type === 'object') {
      // TODO: Check this works
      // Check if the schema value is an object
      if (typeof data[key] !== 'object') return `The field "${key}" must be an object.`;

      // Check if the schema value has the correct properties
      if (value.properties) {
        const result = await validateBase(data[key] as Record<string, unknown>, value.properties);
        if (result) return result;
      }
    }

    // Array validation
    if (value.type === 'array') {
      // TODO: Check this works
      // Check if the schema value is an array
      if (!Array.isArray(data[key])) return `The field "${key}" must be an array.`;

      // Check if the schema value has the correct items
      if (value.items) {
        for (const item of data[key] as unknown[]) {
          if (typeof item !== value.items.type) return `The field "${key}" must be an array of ${value.items.type}.`;
          if (!value.items.enum.includes(item)) return `The field "${key}" must be an array of valid options.`;
        }
      }
    }

    // Image validation
    if (value.type === 'image') {
      // TODO: Check this works
      // Check if the schema value is a string
      if (typeof data[key] !== 'string') return `The field "${key}" must be a string.`;

      // Check if the schema value is a valid image
      if (!tests.image(data[key] as string)) return `The field "${key}" must be a valid image.`;
    }
  }

  return false;
};

/**
 * Run the validation function, and if the response object is provided, send a response if the validation fails.
 * @param data The object data to validate.
 * @param schema The schema to validate against.
 * @param res The response object.
 * @returns A JSON response meaning it's invalid, or null if it's valid.
 */
const validate = async (data: Record<string, unknown>, schema: Schema, res: Response): Promise<Response | null> => {
  const result = await validateBase(data, schema);
  if (result) return res.status(400).json({ status: 400, message: result });
  return null;
};

export default validate;
