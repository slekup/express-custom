#!/usr/bin/env node

const fileTimeStart = Date.now();

const { execSync, exec } = require('child_process');
const colors = require('colors');
const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');

const tsNode = require('ts-node');
const tsconfigPaths = require('tsconfig-paths');
const { createRequire } = require('module');

/* import { exec } from 'child_process';
import colors from 'colors';
import fs from 'fs-extra';
import path from 'path';
import { promisify } from 'util';

import { createRequire } from 'module';
import tsNode from 'ts-node';
import tsconfigPaths from 'tsconfig-paths';
 */
const cli = {
  inf: colors.blue('CLI'),
  suc: colors.green('CLI'),
  err: colors.red('CLI'),
};

const site = {
  inf: colors.blue('SITE'),
  suc: colors.green('SITE'),
  err: colors.red('SITE'),
};

const fileName = process.argv[2];
const siteOutput = process.argv[3];

const targetPath = path.join(process.cwd(), siteOutput || 'docs');

/**
 * Load the router file.
 */
const loadRouter = async () => {
  const timeStart = Date.now();

  // If a file name is not specified, exit
  if (!fileName) {
    console.error(`${cli.err} No input file specified`);
    process.exit(1);
  }

  // Check if the file is a .js or .ts file
  if (!['.js', '.ts'].includes(fileName.slice(-3))) {
    console.error(`${cli.err} Input file must be a .js or .ts file`);
    process.exit(1);
  }

  // Check if the file exists
  if (!fs.existsSync(path.resolve(process.cwd(), fileName))) {
    console.error(`${cli.err} Input file does not exist`);
    process.exit(1);
  }

  try {
    // Load the file that exports the router
    const filePath = path.resolve(process.cwd(), fileName).toString();

    // Get the directory containing the tsconfig.json file
    const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');
    const tsconfigDir = path.dirname(tsconfigPath);

    console.log(`${cli.inf} Loading tsconfig.json`);

    // Load the tsconfig.json file
    let tsconfigJson;
    try {
      tsconfigJson = JSON.parse(fs.readFileSync(tsconfigPath));
    } catch (error) {
      console.error(
        `${
          cli.err
        } Failed to load tsconfig.json file. If it exists, make sure it is valid JSON: ${colors.cyan(
          'https://jsonlint.com/'
        )}.`
      );
      process.exit(1);
    }

    const baseUrl = tsconfigJson.compilerOptions.baseUrl || '.';
    const paths = tsconfigJson.compilerOptions.paths || {};

    console.log(`${cli.inf} Compiling TypeScript`);

    // Compile TypeScript code to JavaScript using ts-node
    tsNode
      .register({
        transpileOnly: true,
        project: process.cwd(),
        compilerOptions: {
          ...tsconfigJson.compilerOptions,
          module: 'commonjs',
          esModuleInterop: true,
        },
        loader: {
          '.ts': 'ts-node/esm',
        },
        experimentalSpecifierResolution: 'node',
      })
      .compile(fs.readFileSync(filePath, { encoding: 'utf-8' }), filePath);

    console.log(`${cli.inf} Registering tsconfig`);

    tsconfigPaths.register({
      baseUrl: path.resolve(tsconfigDir, baseUrl),
      paths: {
        ...paths,
        '*': ['node_modules/*'],
      },
    });

    // Create a new require function using the module.createRequire method
    const requireModule = createRequire(path.resolve(__dirname, __filename));
    // const requireModule = createRequire(import.meta.url);

    console.log(`${cli.inf} Loading router file`);

    // Load the JavaScript file as a module using the require function
    // const fileUrl = `file:///${new URL(filePath, import.meta.url).href}`;
    // console.log(fileUrl);

    const module = requireModule(filePath);

    // Get the default export of the module
    const router = module.default;

    const time = Date.now() - timeStart + 'ms';
    console.info(`${cli.suc} ⚡ Loaded router file in ${time}`);

    return router;
  } catch (error) {
    console.error(`${cli.err} Failed to load router file`);
    throw new Error(error);
  }
};

/**
 * Export the routes to a JSON file.
 */
const exportRoutes = async (router) => {
  const timeStart = Date.now();
  console.info(`${cli.inf} Exporting routes to JSON file`);

  try {
    // Export the routes to a JSON object
    const json = router.export();

    // Write the routes to a JSON file in the site directory
    await fs.promises.writeFile(
      path.join(__dirname, '../../site/routes.json'),
      JSON.stringify(json)
    );

    const time = Date.now() - timeStart + 'ms';
    console.info(`${cli.suc} ⚡ Exported routes in ${time}`);
  } catch (error) {
    console.error(`${cli.err} Failed to export routes`);
    console.log(error);
  }
};

/**
 * Install the dependencies for the site.
 */
const installSiteDependencies = async () => {
  const timeStart = Date.now();
  console.info(`${cli.inf} Installing site dependencies`);

  try {
    const { stdout, stderr } = execSync('npm install', {
      cwd: path.join(__dirname, '../../site'),
      shell: true,
    });

    // console.log(`${site.inf} ${stdout}`);
    if (stderr) {
      console.error(
        `${site.err} Error occurred while installing site dependencies`
      );
      console.error(stderr);
    }
    const time = Date.now() - timeStart + 'ms';
    console.info(`${site.suc} ⚡ Site install deps success in ${time}`);
  } catch (error) {
    console.error(`${site.err} Failed to install site dependencies`);
    throw new Error(error);
  }
};

/**
 * Build the static site with next.js.
 */
const buildSite = async () => {
  const timeStart = Date.now();
  console.info(
    `${cli.inf} Building static site (${colors.yellow('please wait')})`
  );

  try {
    const { stdout, stderr } = execSync('npx next build', {
      cwd: path.join(__dirname, '../..//site'),
      shell: true,
    });

    // console.log(`${site.inf} ${stdout}`);
    if (stderr) {
      console.error(`${site.err} Error occurred while building site`);
      console.error(stderr);
    }
    const time = Date.now() - timeStart + 'ms';
    console.info(`${site.suc} ⚡ Build success in ${time}`);
  } catch (error) {
    console.error(`${site.err} Failed to build site`);
    throw new Error(error);
  }
};

/**
 * Copy the site to the docs directory.
 */
const copySite = async () => {
  const timeStart = Date.now();
  console.info(`${cli.inf} Copying site to docs`);

  // Make docs directory if it doesn't exist
  if (!fs.existsSync(targetPath)) await fs.promises.mkdir(targetPath);

  try {
    // Copy the routes.json file to the out directory
    await fs.promises.copyFile(
      path.join(__dirname, '../../site/routes.json'),
      path.join(__dirname, '../../site/out/routes.json')
    );

    // Copy the site to the docs directory
    await promisify(fs.copy)(
      path.join(__dirname, '../../site/out'),
      targetPath
    );

    const time = Date.now() - timeStart + 'ms';
    console.info(`${cli.suc} ⚡ Copied site in ${time}`);
  } catch (error) {
    console.error(`${cli.err} Failed to copy site to docs`);
    throw new Error(error);
  }
};

/**
 * Log information about the process.
 */
const logInfo = (router) => {
  const fileTimeEnd = Date.now();
  const fileTime = fileTimeEnd - fileTimeStart + 'ms';

  console.log(`${cli.suc} ⚡ Generated site in ${fileTime}`);

  const info = `
${colors.cyan('Routes:')} ${router.routes.length}
${colors.cyan('Endpoints:')} ${router.routes.reduce((prev, current) => {
    return prev + current.endpoints.length;
  }, 0)}
  `;

  console.log(info);
};

const main = async () => {
  const router = await loadRouter();
  await exportRoutes(router);
  await installSiteDependencies();
  await buildSite();
  await copySite();
  logInfo(router);
  process.exit(1);
};

main();
