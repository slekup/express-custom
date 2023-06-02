<div align="center">

[![Express Custom Logo](https://i.imgur.com/TSBzoVB.png)](https://github.com/slekup/express-custom)

</div>

<div align="center">

<a href="https://www.npmjs.com/package/express-rate-limit" target="_blank">Demo (soon)</a> • <a href="https://www.npmjs.com/package/express-rate-limit" target="_blank">Documentation (soon)</a> • <a href="https://discord.gg/p5rxxQN7DT" target="_blank">Discord</a> • <a href="https://github.com/slekup/express-custom" target="_blank">GitHub</a>

</div>

---

<div align="center">

Enhance your express app with builders, Next.js documentation, schema validation, rate-limiting, error handling, and more with this easy-to-use library.

![npm version](https://img.shields.io/npm/v/express-custom.svg) ![npm downloads](https://img.shields.io/npm/dm/express-custom) ![npm size](https://img.shields.io/bundlephobia/min/express-custom)

</div>

---

Express custom is a library built on top of express that allows you to easily create and manage your express routes and endpoints. Using this format, you can generate a custom next.js documentation site for your API, export everything to a JSON file, and more.

Some additional features include schema validation, rate-limiting, and error handling.

> To use this library, your API must or will be versioned (v1/v2/etc) and your endpoints must or will be grouped by categories (routers) and sub-categories (routes). For example, you could have a category called "User Endpoints" and a sub-category called "User Authentication Endpoints".

## Installation

```bash
# Using npm
> npm install express-custom
# Using yarn or pnpm
> yarn/pnpm add express-custom
```

## Usage

### Importing

This library supports both typescript and javascript, with ES6 modules and CommonJS.

**This package has only been tested for Node 18+**

```ts
// ES6 modules
import { ApiBuilder } from 'express-custom';
// CommonJS
const { ApiBuilder } = require('express-custom');
```

### Create the API

The main class is the `ApiBuilder` class. This class is used to create your API and start the server.

```ts
const api = new ApiBuilder({
  baseUrl: 'https://example.com/api',
  port: 5000,
});

const server = api.startServer(() => {
  console.log('Server started on port 5000');
});
```

### Add a version to the API

To add a version to your API, use the `addVersion` function. This function takes a `VersionBuilder` object. The `VersionBuilder` class is used to create a version for your API. You can add multiple versions to your API.

The version number must be a number. The version number is used in the url to access the version. For example, if you have a version with the number 1, the url to access that version would be `https://example.com/api/v1`.

```ts
const v1 = new VersionBuilder({
  version: 1,
});

// Add routers, routes and endpoints to the version ...

api.addVersion(v1);
```

### Add a router to the version

To add a router to your API, use the `addRouter` function. This function takes a `RouterBuilder` object. The `RouterBuilder` class is used to create a router for your API. You can add multiple routers to your API.

The path is the path to the router. For example, if you have a router with the path `/user`, the url to access that router would be `https://example.com/api/v1/user`.

```ts
const userRouter = new RouterBuilder({
  name: 'User Endpoints',
  path: '/user',
});

// Add routes and endpoints to the router ...

v1.addRouter(userRouter);
```

### Add a route to the router

To add a route to your API, use the `addRoute` function. This function takes a `RouteBuilder` object. The `RouteBuilder` class is used to create a route for your API. You can add multiple routes to your API.

The path is the path to the route. For example, if you have a route with the path `/auth`, the url to access that route would be `https://example.com/api/v1/user/auth`.

```ts
const authRoute = new RouteBuilder({
  name: 'User Authentication Endpoints',
  description: 'Endpoints for user authentication',
  path: '/auth',
});

// Add endpoints to the route ...

userRouter.addRoute(authRoute);
```

### Add an endpoint to the route

To add an endpoint to your API, use the `addEndpoint` function. This function takes an `EndpointBuilder` object. The `EndpointBuilder` class is used to create an endpoint for your API. You can add multiple endpoints to your API.

The path is the path to the endpoint. For example, if you have an endpoint with the path `/login`, the url to access that endpoint would be `https://example.com/api/v1/user/auth/login`.

```ts
const loginEndpoint = new EndpointBuilder({
  name: 'Login',
  description: 'Login to your account',
  path: '/login',
  method: 'POST',
}).setController((req, res) => {
  res.json({ user: req.user });
});

authRoute.addEndpoint(loginEndpoint);
```

## Generate a Next.js Documentation Site

This will build a static next.js site to the specified output folder in your project directory.

```bash
> npx gensite
```

## Export the API to a JSON File

This will export the API to a `api.json` file in the specified output folder in your project directory.

```bash
> npx export-api
```

## MDX Documentation

You can create MDX files to document further details about your API. These files will be rendered and displayed on the next.js documentation site.

If you make the MDX files in sub-directories, the names of the sub-directories will be used as the category names, otherwise the category name for all the MDX files will default to the name of the `customDir` folder.

> Custom documentation stays the same for every API version.

## Configuration

Create a express-custom.json file in your project directory or add an "express-custom" section to your package.json file to configure the library.

**Example `express-custom.json`:**

```json
{
  "file": "src/index.ts",
  "name": "My API",
  "description": "My API description",
  "logo": "https://example.com/logo.png",
  "output": "docs",
  "customDir": "welcome",
  "theme": "default",
  "socials": {
    "github": "https://github.com/slekup/express-custom"
  }
}
```

### `file` (required)

> `string`

The file the API instance is exported from.

This must be a relative path to the file from the project directory. The default export of this file must be an instance of the `ApiBuilder` class.

### `name`

> `string`

The name of the API.

This will be used as the title of the next.js documentation site. Defaults to `API Documentation`.

### `description`

> `string`

The description of your API.

### `logo`

> `string`

The logo of your API. This will be used as the logo of the next.js documentation site. This must be a url to an image.

Defaults to the Express Custom logo.

### `output`

> `string`

The output directory for the next.js documentation site.

Defaults to `docs`.

### `customDir`

> `string`

An optional directory containing mdx documentation. See [MDX Documentation](#mdx-documentation).

### `theme`

> `string`

The theme for the next.js documentation site.

Available themes: `default`, `dark`.

Defaults to `default` (light theme).

### `codeTheme`

> `string`

The codeblock theme for the next.js documentation site.

The site uses highlight.js for code highlighting. See [highlight.js demo](https://highlightjs.org/static/demo/) for available themes.

Defaults to `base16/framer`.

### `socials`

> `object`

Social links for the next.js documentation site.

Available socials: `discord`, `github`, `instagram`, `facebook`, `linkedin`, `youtube`, `twitter`, `email`.

## Issues and Contributing

If you have any issues or would like to contribute, please [open an issue](https://github.com/slekup/express-custom/issues/new) or pull request.

## License

Copyright © [slekup](https://github.com/slekup)
