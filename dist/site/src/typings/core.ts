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
  type: SchemaTypes;
  options?: SchemaOption[];
  enum?: unknown[];
  items?: SchemaItems;
  min?: number;
  max?: number;
  checks?: SchemaCheck[];
  properties?: T;
  schema?: `{${string}}`;
}

export type Schema = Record<string, BaseSchema<Schema>>;

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

interface RateLimit {
  statusCode?: number;
  window?: number;
  max?: number;
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
  rateLimit?: RateLimit;
}

export interface Route {
  category?: string;
  name: string;
  description: string;
  path: string;
  endpoints: Endpoint[];
  rateLimit?: RateLimit;
}

interface Router {
  name: string;
  path: string;
  rateLimit?: RateLimit;
  routes: Route[];
}

interface Version {
  version: number;
  rateLimit?: RateLimit;
  routers: Router[];
}

interface Socials {
  discord: string;
  github: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  email: string;
  [key: string]: string | undefined;
}

export interface IApiData {
  name: string;
  description: string;
  baseUrl: string;
  port: number;
  logo?: string;
  structures?: Structure[];
  rateLimit?: RateLimit;
  custom?: boolean;
  socials?: Socials;
  versions: Version[];
}
