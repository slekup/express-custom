import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import colors from 'colors';
import * as tsNode from 'ts-node';
import * as tsconfigPaths from 'tsconfig-paths';
import { CompilerOptions } from 'typescript';

import Api from '../../builders/Api';
import { ExportedApi } from '../../typings/exports';
import logger, { cli } from './logger';

interface TsConfig {
  compilerOptions?: CompilerOptions;
  include?: string[];
  exclude?: string[];
}

/**
 * Load the API file.
 * @param fileName The file name.
 * @returns The exported API data.
 */
export default async (fileName: string): Promise<Readonly<ExportedApi>> => {
  const timeStart = Date.now();
  let apiData = {} as Readonly<ExportedApi>;

  try {
    // Load the file that exports the API
    const filePath = path.resolve(process.cwd(), fileName).toString();

    // Get the directory containing the tsconfig.json file
    const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');
    const tsconfigDir = path.dirname(tsconfigPath);

    logger.info(`${cli.info} Loading tsconfig.json`);

    // Load the tsconfig.json file
    let tsconfigJson: TsConfig;
    try {
      tsconfigJson = JSON.parse(
        (await fs.promises.readFile(tsconfigPath)).toString()
      ) as TsConfig;
    } catch (error) {
      logger.error(
        `${
          cli.error
        } Failed to load tsconfig.json file. If it exists, make sure it is valid JSON: ${colors.cyan(
          'https://jsonlint.com/'
        )}.`
      );
      process.exit(1);
    }

    if (!tsconfigJson.compilerOptions) {
      logger.error(
        `${cli.error} Failed to load tsconfig.json file, no compilerOptions.`
      );
      process.exit(1);
    }

    const baseUrl = tsconfigJson.compilerOptions.baseUrl ?? '.';
    const paths = tsconfigJson.compilerOptions.paths ?? {};

    logger.info(`${cli.info} Compiling TypeScript`);

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
        experimentalSpecifierResolution: 'node',
      })
      .compile(
        await fs.promises.readFile(filePath, { encoding: 'utf-8' }),
        filePath
      );

    logger.info(`${cli.info} Registering tsconfig paths`);

    tsconfigPaths.register({
      baseUrl: path.resolve(tsconfigDir, baseUrl),
      paths: {
        ...paths,
        '*': ['node_modules/*'],
      },
    });

    logger.info(`${cli.info} Loading API file`);

    const requireModule = createRequire(path.resolve(__dirname, __filename));
    const module = requireModule(filePath) as { default?: Api };

    const time = `${Date.now() - timeStart}ms`;
    logger.info(`${cli.success} ⚡ Loaded API file in ${time}`);

    // Access the exported API
    if (!module.default) {
      logger.error(
        `${cli.error} Failed to load the API file, no default export.`
      );
      process.exit(1);
    }

    const api: Api = module.default;

    // Return the exported API
    apiData = await api.export();
  } catch (error) {
    logger.error(
      `${cli.error} Failed to load the API file, you have errors in your code!`
    );
    logger.error((error as { stack: string }).stack);
    process.exit(1);
  }

  return apiData;
};
