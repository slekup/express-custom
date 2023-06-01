#!/usr/bin/env node

const fileTimeStart = Date.now();

const { exec } = require('child_process');
const colors = require('colors');
const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');

const { cli, site } = require('./utils/log');
const loadRouter = require('./utils/loadRouter');
const logInfo = require('./utils/logInfo');

const fileName = process.argv[2];
const outDir =
  process.argv[3] && process.argv[3] !== '--debug'
    ? process.argv[3]
    : undefined;
const debug = process.argv.includes('--debug');

if (debug) console.log(`${cli.inf} Debug mode enabled`);

const targetPath = path.join(process.cwd(), outDir || 'docs');
const targetPathOut = path.join(
  process.cwd(),
  outDir ? `${outDir}/out` : 'docs/out'
);

/**
 * Export the routes to a JSON file.
 */
const exportRoutes = async (routes) => {
  const timeStart = Date.now();
  console.info(`${cli.inf} Exporting routes to JSON file`);

  try {
    // Write the routes to a JSON file in the site directory
    await fs.promises.writeFile(
      path.join(__dirname, '../../site/api.json'),
      JSON.stringify(routes, null, 2)
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

  if (fs.existsSync('../../site/node_modules'))
    console.info(
      `${cli.inf} Copying node_modules ${colors.yellow('please wait')}}`
    );
  {
    await promisify(fs.copy)(
      path.join(__dirname, '../../site/node_modules'),
      '../site/node_modules'
    );
  }

  try {
    exec(
      'npm install',
      {
        cwd: path.join(__dirname, '../site'),
        shell: true,
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error(
            `${site.err} Error occurred while installing site dependencies`
          );
          console.error(error);
        }
        if (stdout && debug) console.log(stdout);
        if (stderr) {
          console.error(
            `${site.err} Error occurred while installing site dependencies`
          );
          console.error(stderr);
        }
      }
    );

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
    exec(
      'npx next build',
      {
        cwd: path.join(__dirname, '../site'),
        shell: true,
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error(
            `${site.err} Error occurred while installing site dependencies`
          );
          console.error(error);
        }
        if (stdout && debug) console.log(stdout);
        if (stderr) {
          console.error(
            `${site.err} Error occurred while installing site dependencies`
          );
          console.error(stderr);
        }
      }
    );

    const time = Date.now() - timeStart + 'ms';
    console.info(`${site.suc} ⚡ Build success in ${time}`);
  } catch (error) {
    console.error(`${site.err} Failed to build site`);
    throw new Error(error);
  }
};

/**
 * Copy the site to the ouput directory.
 */
const copySite = async () => {
  const timeStart = Date.now();
  console.info(`${cli.inf} Copying site to ${outDir}`);

  // Make ouput directory if it doesn't exist
  if (!fs.existsSync(targetPath)) await fs.promises.mkdir(targetPath);
  if (!fs.existsSync(targetPathOut)) await fs.promises.mkdir(targetPathOut);

  try {
    // Copy the site to the ouput directory
    await promisify(fs.copy)(path.join(__dirname, '../site/out'), targetPath);

    // Copy the api.json file to the out directory
    await fs.promises.copyFile(
      path.join(__dirname, '../site/api.json'),
      path.join(__dirname, '../site/out/api.json')
    );

    const time = Date.now() - timeStart + 'ms';
    console.info(`${cli.suc} ⚡ Copied site in ${time}`);
  } catch (error) {
    console.error(`${cli.err} Failed to copy site to ${outDir}`);
    throw new Error(error);
  }
};

const main = async () => {
  const routes = await loadRouter(fileName);
  await exportRoutes(routes);
  await installSiteDependencies();
  await buildSite();
  await copySite();
  logInfo(routes, fileTimeStart, 'Generated site');
  process.exit(1);
};

main();
