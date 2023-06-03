export type StringTest =
  | 'email'
  | 'username'
  | 'passwordStrength'
  | 'phoneNumber'
  | 'ipAddress'
  | 'url';

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

export interface ValueCheck {
  run: ((value: string) => boolean) | ((value: string) => Promise<boolean>);
  response: string;
}

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

export interface ArrayValue<T> extends BaseValueSchema {
  type: 'array';
  min?: number;
  max?: number;
  unique?: boolean;
  contains?: ArrayContains;
  items?: T | T[];
}

export interface BooleanValue extends BaseValueSchema {
  type: 'boolean';
}

export interface ImageValue extends BaseValueSchema {
  type: 'image';
}

export interface NumberValue extends BaseValueSchema {
  type: 'number';
  min?: number;
  max?: number;
}

export interface IntegerValue extends BaseValueSchema {
  type: 'integer';
  min?: number;
  max?: number;
}

export interface ObjectValue<T> extends BaseValueSchema {
  type: 'object';
  properties?: T | unknown;
}

export interface StringValue extends BaseValueSchema {
  type: 'string';
  min?: number;
  max?: number;
  options?: string[];
  test?: StringTest;
}

export type ValueSchema =
  | ArrayValue<ValueSchema>
  | BooleanValue
  | ImageValue
  | NumberValue
  | IntegerValue
  | ObjectValue<Record<string, ValueSchema>>
  | StringValue;

export type Schema = Record<string, ValueSchema>;
