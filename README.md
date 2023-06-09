<div align="center">

[![Express Custom Logo](https://i.imgur.com/TSBzoVB.png)](https://github.com/slekup/express-custom)

</div>

<div align="center">

<a href="https://www.npmjs.com/package/express-rate-limit" target="_blank">Demo (soon)</a> • <a href="https://www.npmjs.com/package/express-rate-limit" target="_blank">Documentation (soon)</a> • <a href="https://github.com/slekup/express-custom-examples" target="_blank">Examples</a> • <a href="https://discord.gg/p5rxxQN7DT" target="_blank">Discord</a> • <a href="https://github.com/slekup/express-custom" target="_blank">GitHub</a>

</div>

---

<div align="center">

Enhance your express app with builders, Next.js documentation, schema validation, rate-limiting, error handling, and more with this easy-to-use library.

[![Discord Server](https://img.shields.io/discord/1028009131073880104?color=5865F2&logo=discord&logoColor=white)](https://discord.gg/p5rxxQN7DT)
![NPM Version](https://img.shields.io/npm/v/express-custom.svg) ![NPM Downloads](https://img.shields.io/npm/dt/express-custom) ![Test Status](https://github.com/slekup/express-custom/actions/workflows/tests.yml/badge.svg) ![NPM Size](https://img.shields.io/bundlephobia/min/express-custom)

</div>

---

Express custom is a library built on top of express that allows you to easily create and manage your express routes and endpoints. Using this format, you can generate a custom next.js documentation site for your API, export everything to a JSON file, and more.

Some additional features include schema validation, rate-limiting, and error handling.

> **Warning**
> This library is currently in beta. It is not recommended to use this library in production yet. There may be breaking changes in the future.

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
import { Api } from 'express-custom';
// CommonJS
const { Api } = require('express-custom');
```

### Create the API

The main class is the `Api` class. This class is used to create your API and start the server.

It's recommended that you run any functions such as `startServer` in a seperate main file, and import the API into that file. This is so your application does not run when you use the export commands.

```ts
const api = new Api({
  url: 'https://example.com/api',
  port: 5000,
});

// In the main file
const server = api.start(() => {
  console.log('Server started on port 5000');
});
```

### Add a version to the API

To add a version to your API, use the `addVersion` function. This function takes a `Version` object. The `Version` class is used to create a version for your API. You can add multiple versions to your API.

The version number must be a number. The version number is used in the url to access the version. For example, if you have a version with the number 1, the url to access that version would be `https://example.com/api/v1`.

```ts
const v1 = new Version({
  version: 1,
});

// Add groups, routes and endpoints to the version ...

api.addVersion(v1);
```

### Add a group to the version

To add a group to your API, use the `addGroup` function. This function takes a `Group` object. The `Group` class is used to create a group for your API. You can add multiple groups to your API.

The path is the path to the group. For example, if you have a group with the path `/user`, the url to access that group would be `https://example.com/api/v1/user`.

```ts
const userGroup = new Group({
  name: 'User Endpoints',
  path: '/user',
});

// Add routes and endpoints to the group ...

v1.addGroup(userGroup);
```

### Add a route to the group

To add a route to your API, use the `addRoute` function. This function takes a `Route` object. The `Route` class is used to create a route for your API. You can add multiple routes to your API.

The path is the path to the route. For example, if you have a route with the path `/auth`, the url to access that route would be `https://example.com/api/v1/user/auth`.

```ts
const authRoute = new Route({
  name: 'User Authentication Endpoints',
  description: 'Endpoints for user authentication',
  path: '/auth',
});

// Add endpoints to the route ...

userGroup.addRoute(authRoute);
```

### Add an endpoint to the route

To add an endpoint to your API, use the `addEndpoint` function. This function takes an `Endpoint` object. The `Endpoint` class is used to create an endpoint for your API. You can add multiple endpoints to your API.

The path is the path to the endpoint. For example, if you have an endpoint with the path `/login`, the url to access that endpoint would be `https://example.com/api/v1/user/auth/login`.

```ts
const loginEndpoint = new Endpoint({
  name: 'Login',
  description: 'Login to your account',
  path: '/login',
  method: 'POST',
  controller: (req, res) => {
    res.json({ user: req.user });
  },
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

## Create a basic express-custom project

This will create a basic express-custom project in the current directory, much like `npx create-next-app` would for a next.js app.

```bash
> npx create-api
```

## MDX Documentation

You can create MDX files to document further details about your API. These files will be rendered and displayed on the next.js documentation site.

> Custom documentation stays the same for every API version.

## Configuration

Create a express-custom.json file in your project directory or add an "express-custom" section to your package.json file to configure the library.

**Example `express-custom.json`:**

```json
{
  "file": "src/index.ts",
  "output": "docs",
  "name": "My API",
  "description": "My API description",
  "logo": "https://example.com/logo.png",
  "customDocs": [
    {
      "category": "Welcome",
      "slug": "welcome",
      "basePath": "./custom-docs",
      "files": ["getting-started"]
    }
  ]
  "theme": "default",
  "socials": {
    "github": "https://github.com/slekup/express-custom"
  }
}
```

### `file` (required)

> `string`

The file the API instance is exported from.

This must be a relative path to the file from the project directory. The default export of this file must be an instance of the `Api` class.

### `output`

> `string`

The output directory for the next.js documentation site.

Defaults to `docs`.

### `name`

> `string`

The name of the API.

This will be used as the title of the next.js documentation site. Defaults to `API Documentation`.

If provided, this must be inbetween 1 and 25 characters.

### `description`

> `string`

The description of your API.

### `logo`

> `string`

The logo of your API. This will be used as the logo of the next.js documentation site. This must be a url to an image.

Defaults to the Express Custom logo.

### `customDocs`

> `string`

An array of objects containing the `category`, `slug`, `basePath`, and `files`.

- `category` - The name of the category.
- `slug` - The slug to be used in the url.
- `basePath` - The base path (directory) to the MDX files.
- `files` - An array of file names.

```json
{
  "customDocs": [
    {
      "category": "Welcome",
      "slug": "welcome",
      "basePath": "./custom-docs",
      "files": ["getting-started"]
    }
  ]
}
```

Each file must be an MDX file, but defining the extension in the config is optional. See [MDX Documentation](#mdx-documentation).

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

### `extends`

> `string`

The path to a JSON file to extend the configuration from. This can be used to create multiple versions of your API.

## Issues and Contributing

If you have any issues or would like to contribute, please [open an issue](https://github.com/slekup/express-custom/issues/new) or pull request.

## License

Copyright © [slekup](https://github.com/slekup)
