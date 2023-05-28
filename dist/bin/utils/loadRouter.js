const colors = require('colors');
const fs = require('fs-extra');
const path = require('path');
const tsNode = require('ts-node');
const tsconfigPaths = require('tsconfig-paths');
const { createRequire } = require('module');
const { cli } = require('./log');

/**
 * Load the router file.
 */
module.exports = async (fileName) => {
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

    console.log(`${cli.inf} Registering tsconfig paths`);

    tsconfigPaths.register({
      baseUrl: path.resolve(tsconfigDir, baseUrl),
      paths: {
        ...paths,
        '*': ['node_modules/*'],
      },
    });

    console.log(`${cli.inf} Loading router file`);

    const requireModule = createRequire(path.resolve(__dirname, __filename));
    const module = requireModule(filePath);
    const router = module.default;

    const time = Date.now() - timeStart + 'ms';
    console.info(`${cli.suc} ⚡ Loaded router file in ${time}`);

    // Return the exported routes
    return router.export();
  } catch (error) {
    console.error(`${cli.err} Failed to load router file`);
    throw new Error(error);
  }
};
