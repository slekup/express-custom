import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

export { Config } from './typings/exports';

export * from './builders';

export default express;
