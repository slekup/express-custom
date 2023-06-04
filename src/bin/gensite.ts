#!/usr/bin/env node

const fileTimeStart = Date.now();

import { exec } from 'child_process';
import colors from 'colors';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { ExportedApi } from '@builders/ApiBuilder';
import getRawConfig from './utils/getRawConfig';
import loadApi from './utils/loadApi';
import logInfo from './utils/logInfo';
import logger, { cli, site } from './utils/logger';

const debug = process.argv.includes('--debug');

if (debug) logger.info(`${cli.inf} ${colors.magenta('Debug mode enabled')}`);

/**
 * Export the routes to a JSON file.
 * @param apiData The API data.
 */
const exportRoutes = async (apiData: ExportedApi): Promise<void> => {
  const timeStart = Date.now();
  logger.info(`${cli.inf} Exporting routes to JSON file`);

  try {
    // Write the routes to a JSON file in the site directory
    await fs.promises.writeFile(
      path.join(__dirname, '../../site/api.json'),
      JSON.stringify(apiData, null, 2)
    );

    const time = `${Date.now() - timeStart}ms`;
    logger.info(`${cli.suc} ⚡ Exported routes in ${time}`);
  } catch (error) {
    logger.error(`${cli.err} Failed to export routes`);
    logger.error(error);
  }
};

/**
 * Install the dependencies for the site.
 */
const installSiteDependencies = async (): Promise<void> => {
  const timeStart = Date.now();
  logger.info(`${cli.inf} Installing site dependencies`);

  if (fs.existsSync('../../site/node_modules')) {
    logger.info(
      `${cli.inf} Copying node_modules ${colors.yellow('please wait')}}`
    );
    await fs.promises.cp(
      path.join(__dirname, '../../site/node_modules'),
      '../site/node_modules'
    );
  }

  try {
    const { stdout, stderr } = await promisify(exec)('npm install', {
      cwd: path.join(__dirname, '../site'),
      // shell: true,
    });

    if (stdout && debug) logger.info(stdout);
    if (stderr) {
      logger.error(
        `${site.err} Error occurred while installing site dependencies`
      );
      logger.error(stderr);
    }

    const time = `${Date.now() - timeStart}ms`;
    logger.info(`${site.suc} ⚡ Site install dependencies success in ${time}`);
  } catch (error) {
    logger.error(`${site.err} Failed to install site dependencies`);
    logger.error((error as { stack: string }).stack);
    process.exit(1);
  }
};

/**
 * Build the static site with next.js.
 */
const buildSite = async (): Promise<void> => {
  const timeStart = Date.now();
  logger.info(
    `${cli.inf} Building static site (${colors.yellow('please wait')})`
  );

  try {
    const { stdout, stderr } = await promisify(exec)('npx next build', {
      cwd: path.join(__dirname, '../site'),
      // shell: true,
    });

    if (stdout && debug) logger.info(stdout);
    if (stderr) {
      logger.error(`${site.err} Error occurred while building site`);
      logger.error(stderr);
    }

    const time = `${Date.now() - timeStart}ms`;
    logger.info(`${site.suc} ⚡ Build success in ${time}`);
  } catch (error) {
    logger.error(`${site.err} Failed to build site`);
    logger.error((error as { stack: string }).stack);
    process.exit(1);
  }
};

/**
 * Copy the site to the ouput directory.
 * @param apiData The API data.
 */
const copySite = async (apiData: ExportedApi): Promise<void> => {
  const timeStart = Date.now();
  logger.info(`${cli.inf} Copying site to ${apiData.output}`);

  const targetPath = path.join(process.cwd(), apiData.output);
  const targetPathOut = path.join(process.cwd(), `${apiData.output}/out`);

  // Make ouput directory if it doesn't exist
  if (!fs.existsSync(targetPath)) await fs.promises.mkdir(targetPath);
  if (!fs.existsSync(targetPathOut)) await fs.promises.mkdir(targetPathOut);

  try {
    // Copy the site to the ouput directory
    await fs.promises.cp(path.join(__dirname, '../site/out'), targetPath);

    // Copy the api.json file to the out directory
    await fs.promises.copyFile(
      path.join(__dirname, '../site/api.json'),
      path.join(__dirname, '../site/out/api.json')
    );

    const time = `${Date.now() - timeStart}ms`;
    logger.info(`${cli.suc} ⚡ Copied site in ${time}`);
  } catch (error) {
    logger.error(`${cli.err} Failed to copy site to ${apiData.output}`);
    throw new Error(error as string);
  }
};

/**
 * Main function.
 */
const main = async (): Promise<void> => {
  const rawConfig = await getRawConfig();
  const apiData = await loadApi(rawConfig.file);
  await exportRoutes(apiData);
  await installSiteDependencies();
  await buildSite();
  await copySite(apiData);
  logInfo(apiData, fileTimeStart, 'Generated site');
  process.exit(1);
};

main();
