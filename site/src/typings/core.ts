type SchemaOption = string | number | boolean | null | undefined;

type SchemaTypes =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'image';

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

export type Schema = BaseSchema<Schema>;

type StatusCode =
  | 200
  | 201
  | 204
  | 301
  | 400
  | 401
  | 403
  | 404
  | 405
  | 409
  | 500
  | 501;

export interface EndpointResponse {
  status: StatusCode;
  message: string;
  [key: string]: unknown;
}

interface Note {
  type: 'INFO' | 'WARNING' | 'DANGER' | 'SUCCESS';
  text: string;
}

type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PATCH'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'TRACE'
  | 'CONNECT';

interface Endpoint {
  name: string;
  description: string;
  path: string;
  method: RequestMethod;
  notes: Note[];
  params: Schema;
  queries: Schema;
  body: Schema;
  responses: EndpointResponse[];
}

export interface Route {
  category?: string;
  name: string;
  description: string;
  path: string;
  endpoints: Endpoint[];
}

export interface CustomDocs {
  docs: {
    title: string;
    excerpt: string;
    content: string;
  }[];
}

export interface StructureField {
  name: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  schema?: string;
  option?: string;
}

export interface Structure {
  name: string;
  type: 'schema' | 'option';
  fields: StructureField[];
}

export interface ApiData {
  structures?: Structure[];
  custom?: CustomDocs;
  router: {
    name: string;
    routes: Route[];
  };
}
