import { Route } from 'express-custom';

import { loginEndpoint } from '@v1/controllers/user.control';

const authRoute = new Route({
  name: 'User Authentication Endpoints',
  description: 'Endpoints for user authentication',
  path: '/auth',
});

authRoute.addEndpoint(loginEndpoint);

export default authRoute;
