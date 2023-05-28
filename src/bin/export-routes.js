#!/usr/bin/env node

const fileTimeStart = Date.now();

const fs = require('fs-extra');
const path = require('path');

const loadRouter = require('./utils/loadRouter');
const logInfo = require('./utils/logInfo');
const { cli } = require('./utils/log');

const fileName = process.argv[2];
const outDir =
  process.argv[3] && process.argv[3] !== '--list' ? process.argv[3] : undefined;
const list = process.argv.includes('--list');

const targetPath = path.join(process.cwd(), outDir || 'docs');

/**
 * Export the routes to a JSON file.
 */
const exportRoutes = async (routes) => {
  const timeStart = Date.now();
  console.info(`${cli.inf} Exporting routes to JSON file`);

  try {
    // Make ouput directory if it doesn't exist
    if (!fs.existsSync(targetPath)) await fs.promises.mkdir(targetPath);

    // Write the routes to a JSON file in the out directory
    await fs.promises.writeFile(
      path.join(targetPath, `./routes${list ? '-list' : ''}.json`),
      JSON.stringify(
        list
          ? routes.routes
              .map((route) =>
                route.endpoints.map(
                  (endpoint) => `${route.path}${endpoint.path}`
                )
              )
              .flat()
          : routes,
        null,
        2
      )
    );

    fs.removeSync(path.join(__dirname, `./routes${list ? '-list' : ''}.json`));

    const time = Date.now() - timeStart + 'ms';
    console.info(`${cli.suc} ⚡ Exported routes in ${time}`);
  } catch (error) {
    console.error(`${cli.err} Failed to export routes`);
    console.log(error);
  }
};

const main = async () => {
  const routes = await loadRouter(fileName);
  await exportRoutes(routes);
  logInfo(routes, fileTimeStart, 'Exported routes');
  process.exit(1);
};

main();
