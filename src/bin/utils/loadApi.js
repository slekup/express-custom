const colors = require('colors');
const fs = require('fs-extra');
const path = require('path');
const tsNode = require('ts-node');
const tsconfigPaths = require('tsconfig-paths');
const { createRequire } = require('module');
const { cli } = require('./log');

/**
 * Load the API file.
 */
module.exports = async (fileName) => {
  const timeStart = Date.now();
  let apiData;

  try {
    // Load the file that exports the API
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

    console.log(`${cli.inf} Registering tsconfig paths`);

    tsconfigPaths.register({
      baseUrl: path.resolve(tsconfigDir, baseUrl),
      paths: {
        ...paths,
        '*': ['node_modules/*'],
      },
    });

    console.log(`${cli.inf} Loading API file`);

    const requireModule = createRequire(path.resolve(__dirname, __filename));
    const module = requireModule(filePath);

    const time = Date.now() - timeStart + 'ms';
    console.info(`${cli.suc} ⚡ Loaded API file in ${time}`);

    // Disable console output from the imported file
    const originalConsoleMethods = {};
    const noop = () => {}; // Empty function to suppress output

    // Define the console methods to intercept (you can add more if needed)
    const consoleMethods = ['log', 'info', 'warn', 'error'];

    // Replace the console methods with empty functions
    for (const method of consoleMethods) {
      originalConsoleMethods[method] = console[method];
      console[method] = noop;
    }

    // Access the exported API
    const api = module.default;

    // Return the exported API
    apiData = api.export();

    // Restore the original console methods
    for (const method of consoleMethods) {
      console[method] = originalConsoleMethods[method];
    }
  } catch (error) {
    console.error(
      `${cli.err} Failed to load the API file, you have errors in your code!`
    );
    throw new Error(error);
  }

  return apiData;
};
