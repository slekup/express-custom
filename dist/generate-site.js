#!/usr/bin/env node

const fileTimeStart = Date.now();

const { exec } = require('child_process');
const colors = require('colors');
const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');

// import * as tsImport from 'ts-import';
const tsImport = require('ts-import');

// const esmImport = require('esm')(module);

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
const filePath = path.resolve(process.cwd(), fileName);

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

  console.log(`${cli.inf} Loading router file`);

  // Load the file that exports the router
  try {
    console.log(colors.yellow(fileName));
    console.log(1);
    const file = await tsImport.load(filePath);
    console.log(2);
    const router = file.default || file;
    console.log(3);

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
      path.join(__dirname, './site/routes.json'),
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
    const { stdout, stderr } = await exec('npm install', {
      cwd: path.join(__dirname, './site'),
      shell: true,
    });

    // console.log(`${site.inf} ${stdout}`);
    if (stderr) return console.error(`${site.err} ${stderr}`);
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
    const { stdout, stderr } = await exec('npx next build', {
      cwd: path.join(__dirname, './site'),
      shell: true,
    });

    // console.log(`${site.inf} ${stdout}`);
    if (stderr) return console.error(`${site.err} ${stderr}`);
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
      path.join(__dirname, './site/routes.json'),
      path.join(__dirname, './site/out/routes.json')
    );

    // Copy the site to the docs directory
    await promisify(fs.copy)(path.join(__dirname, './site/out'), targetPath);

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
};

main();
