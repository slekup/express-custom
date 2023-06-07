import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

export { default as Api } from './builders/Api';
export { default as Endpoint } from './builders/Endpoint';
export { default as Group } from './builders/Group';
export { default as Route } from './builders/Route';
export { default as Schema } from './builders/Schema';
export { default as Structure } from './builders/Structure';
export { default as Version } from './builders/Version';

export { Config } from './typings/exports';

export default express;
