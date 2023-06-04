import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

export * from './builders';
export { default as Config } from './typings/config';

export default express;
