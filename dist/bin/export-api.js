#!/usr/bin/env node

const fileTimeStart = Date.now();

const fs = require('fs');
const path = require('path');

const loadApi = require('./utils/loadApi');
const logInfo = require('./utils/logInfo');
const { cli } = require('./utils/log');
const getConfig = require('./utils/getConfig');

/**
 * Export the API data to a JSON file.
 */
const exportApi = async (config, apiData) => {
  const timeStart = Date.now();
  console.info(`${cli.inf} Exporting API data to JSON file`);

  const targetPath = path.join(process.cwd(), config.output || 'docs');

  try {
    // Make ouput directory if it doesn't exist
    if (!fs.existsSync(targetPath)) await fs.promises.mkdir(targetPath);

    // Write the API data to a JSON file in the out directory
    await fs.promises.writeFile(
      path.join(targetPath, `./api.json`),
      JSON.stringify(apiData, null, 2)
    );

    fs.promises.unlink(path.join(__dirname, `./api.json`));

    const time = Date.now() - timeStart + 'ms';
    console.info(`${cli.suc} ⚡ Exported API data in ${time}`);
  } catch (error) {
    console.error(`${cli.err} Failed to export API data to JSON file`);
    console.log(error);
  }
};

const main = async () => {
  const config = await getConfig();
  const apiData = await loadApi(config.file);
  await exportApi(config, apiData);
  logInfo(apiData, fileTimeStart, 'Exported API to JSON');
  process.exit(1);
};

main();
