# Express Custom

Enhance your express app with builders, schema validation, next.js documentation, and more.

- Easily define express routes and endpoints with builders.
- Validate requests against schemas.
- Automatically generate documentation for your API with next.js.
- Export your routes and endpoints to JSON.
- Forget about error handling, it's all done for you.

## Table of Contents

- [Getting Started](#getting-started)
  - [Install](#install)
  - [Usage](#usage)
    - [Setup the router](#setup-the-router)
    - [Create the route](#create-the-route)
    - [Create the endpoint](#create-the-endpoint)

# Getting Started

## Install

```bash
npm install express-custom
```

## Usage

Use the `express-custom` function to create an express app just like you would with the `express` function.

```ts
// index.ts
import express from 'express-custom';
// or import express from 'express';
import router from './routes';

const app = express();

app.use(router.getRouter());

app.listen(5000);
```

### Setup the router

Initialize the router with a user route:

```ts
// routes/index.ts
import { RouterBuilder } from 'express-custom';

import userRoute from './user.ts';

const router = new RouterBuilder()
  .setDefaultCategory('Website Endpoints')
  .setPath('/')
  .addRoutes('User Endpoints', [userRoute]);

export default router;
```

### Create the route

```ts
// routes/user.ts
import { RouteBuilder } from 'express-custom';

import middleware from '../utils/middleware.ts';
import { getUser } from '../controllers/user/user.ts';

const route = new RouteBuilder()
  .setName('User')
  .setDescription('The user route')
  .setPath('/user')
  .addMiddleware(middleware)
  .addEndpoint(getUser);

export default route;
```

### Create the endpoint

Define the endpoint information and add a controller function to handle the request.

```ts
// controllers/user/user.ts
import { EndpointBuilder } from 'express-custom';

export const getUser = new EndpointBuilder()
  .setName('Get User')
  .setDescription('Get a user by id')
  .setPath('/:id')
  .setMethod('GET')
  .setParamSchema((schema) =>
    schema.addValue((value) =>
      value.setName('id').setDescription('The id of the user')
    )
  )
  .setController((req, res) => {
    res.json({ user: req.user });
  });
```

## Generate a Static Next.js Site

This will build and export a static next.js site to a new docs folder in your project directory.

```ts
await router.generateSite({
  apiUrl: 'https://example.com',
  outDir: './docs',
  title: 'My API',
  description: 'My API description',
  version: '1.0.0',
  logo: 'https://example.com/logo.png',
  customDocs: ['./custom-docs/custom.mdx'],
});
```

## Export the Routes and Endpoints to a JSON File

Export the routes and endpoints to a JSON file at the specified path.

```ts
import fs from 'fs';

// An array of the route and endpoint objects
const routesJSON = router.export();
fs.writeFileSync('./routes.json', JSON.stringify(routesJSON));

// An array of the urls for each endpoint
const routesList = router.exportList('./routes-list.json');
```

## Debugging

Set the environment variable `DEBUG_EXPRESS_CUSTOM` to true to see debug messages for express-custom.
