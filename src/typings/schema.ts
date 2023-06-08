export type StringTest =
  | 'email'
  | 'username'
  | 'passwordStrength'
  | 'phoneNumber'
  | 'ipAddress'
  | 'url'
  | 'path';

export type SchemaOption = string | number | boolean | null | undefined;

export type SchemaTypes =
  | string
  | number
  | boolean
  | unknown[]
  | object
  | null
  | undefined
  | unknown;

export type ValueTypes =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'image';

export type ValueCheck = [
  ((value: string) => boolean) | ((value: string) => Promise<boolean>),
  string
];

export type StructureType = `{${string}}` | `[${string}]`;

export interface BaseValueSchema {
  description?: string;
  required?: boolean;
  structure?: string;
  defaultValue?: SchemaTypes;
  options?: SchemaOption[];
  checks?: ValueCheck[];
  type?: ValueTypes;
}

export interface ArrayContains {
  type: ValueTypes;
  min?: number;
  max?: number;
}

export interface IArrayValue<T> extends BaseValueSchema {
  type: 'array';
  min?: number;
  max?: number;
  unique?: boolean;
  contains?: ArrayContains;
  items?: T | T[];
}

export interface IBooleanValue extends BaseValueSchema {
  type: 'boolean';
}

export interface IImageValue extends BaseValueSchema {
  type: 'image';
}

export interface INumberValue extends BaseValueSchema {
  type: 'number';
  min?: number;
  max?: number;
}

export interface IIntegerValue extends BaseValueSchema {
  type: 'integer';
  min?: number;
  max?: number;
}

export interface IObjectValue<T> extends BaseValueSchema {
  type: 'object';
  properties?: T | unknown;
}

export interface IStringValue extends BaseValueSchema {
  type: 'string';
  min?: number;
  max?: number;
  options?: string[];
  test?: StringTest;
}

export type ValueSchema =
  | IArrayValue<ValueSchema>
  | IBooleanValue
  | IImageValue
  | INumberValue
  | IIntegerValue
  | IObjectValue<Record<string, ValueSchema>>
  | IStringValue;

export type ISchema = Record<string, ValueSchema>;
