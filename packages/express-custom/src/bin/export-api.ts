#!/usr/bin/env node

const fileTimeStart = Date.now();

import fs from 'fs';
import path from 'path';

import { ExportedApi } from '../typings/exports';
import getRawConfig from './utils/getRawConfig';
import loadApi from './utils/loadApi';
import logInfo from './utils/logInfo';
import logger, { cli } from './utils/logger';

/**
 * Export the API data to a JSON file.
 * @param apiData The API data.
 */
const exportApi = async (apiData: ExportedApi): Promise<void> => {
  const timeStart = Date.now();
  logger.info(`${cli.info} Exporting API data to JSON file`);

  const targetPath = path.join(process.cwd(), apiData.output);

  try {
    // Make ouput directory if it doesn't exist
    if (!fs.existsSync(targetPath))
      await fs.promises.mkdir(targetPath, {
        recursive: true,
      });

    // Write the API data to a JSON file in the out directory
    await fs.promises.writeFile(
      path.join(targetPath, `./api.json`),
      JSON.stringify(apiData, null, 2)
    );

    // fs.promises.unlink(path.join(__dirname, `./api.json`));

    const time = `${Date.now() - timeStart}ms`;
    logger.info(`${cli.success} ⚡ Exported API data in ${time}`);
  } catch (error) {
    logger.error(`${cli.error} Failed to export API data to JSON file`);
    logger.info(error);
  }
};

/**
 * The main function.
 */
const main = async (): Promise<void> => {
  const rawConfig = await getRawConfig();
  const apiData = await loadApi(rawConfig.file);
  await exportApi(apiData);
  logInfo(apiData, fileTimeStart, 'Exported API to JSON');
  process.exit(1);
};

main();
