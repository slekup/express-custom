import bodyParser from 'body-parser';
import { Version } from 'express-custom';

import userGroup from './routes';

const version = new Version({
  version: 1,
});

version.addMiddleware(bodyParser.json());
version.addMiddleware(bodyParser.urlencoded());

version.addGroup(userGroup);

export default version;
