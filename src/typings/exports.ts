import { ExportedSchema } from 'builder-validation';

import {
  EndpointNote,
  EndpointResponse,
  PathString,
  RateLimit,
  RequestMethod,
  StructureField,
  StructureType,
} from './core';

type Themes =
  | 'default'
  | 'dark'
  | 'facebook'
  | 'slack'
  | 'stack-overflow'
  | 'raspberry'
  | 'brave'
  | 'terminal'
  | 'high-contrast-light'
  | 'high-contrast-dark';

interface Socials {
  discord: string;
  github: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  email: string;
}

export interface Config {
  file: string;
  name: string;
  description: string;
  logo: string;
  output: string;
  customDir?: string;
  hide: {
    rateLimits: boolean;
  };
  theme: Themes;
  socials: Socials;
}

export interface ExportedEndpoint {
  name: string;
  description: string;
  path: string;
  method: RequestMethod;
  notes: EndpointNote[];
  params: ExportedSchema;
  queries: ExportedSchema;
  body: ExportedSchema;
  responses: EndpointResponse[];
}

export interface ExportedRoute {
  name: string;
  description: string;
  path: PathString;
  endpoints: ExportedEndpoint[];
}

export interface ExportedGroup {
  name: string;
  path: PathString;
  routes: ExportedRoute[];
}

export interface ExportedVersion {
  version: number;
  rateLimit?: Partial<RateLimit> | undefined;
  groups: ExportedGroup[];
}

export interface ExportedStructure {
  name: string;
  type: StructureType;
  fields: StructureField[];
}

export type ExportedApi = Config & {
  url: string;
  port: number;
  structures: ExportedStructure[];
  rateLimit?: Partial<RateLimit> | undefined;
  versions: ExportedVersion[];
  groups: ExportedGroup[];
};
