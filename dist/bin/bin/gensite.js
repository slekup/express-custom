#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileTimeStart = Date.now();
const child_process_1 = require("child_process");
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const index_1 = require("../utils/index");
const getRawConfig_1 = __importDefault(require("./utils/getRawConfig"));
const loadApi_1 = __importDefault(require("./utils/loadApi"));
const logInfo_1 = __importDefault(require("./utils/logInfo"));
const logger_1 = __importStar(require("./utils/logger"));
const debug = process.argv.includes('--debug');
if (debug)
    logger_1.default.info(`${logger_1.cli.inf} ${colors_1.default.magenta('Debug mode enabled')}`);
/**
 * Export the routes to a JSON file.
 * @param apiData The API data.
 */
const exportRoutes = async (apiData) => {
    const timeStart = Date.now();
    logger_1.default.info(`${logger_1.cli.inf} Exporting routes to JSON file`);
    try {
        // Write the routes to a JSON file in the site directory
        await fs_1.default.promises.writeFile(path_1.default.join(__dirname, '../../site/api.json'), JSON.stringify(apiData, null, 2));
        const time = `${Date.now() - timeStart}ms`;
        logger_1.default.info(`${logger_1.cli.suc} ⚡ Exported routes in ${time}`);
    }
    catch (error) {
        logger_1.default.error(`${logger_1.cli.err} Failed to export routes`);
        logger_1.default.error(error);
    }
};
/**
 * Install the dependencies for the site.
 */
const installSiteDependencies = async () => {
    const timeStart = Date.now();
    logger_1.default.info(`${logger_1.cli.inf} Installing site dependencies`);
    if (fs_1.default.existsSync('../../site/node_modules')) {
        logger_1.default.info(`${logger_1.cli.inf} Copying node_modules ${colors_1.default.yellow('please wait')}}`);
        await fs_1.default.promises.cp(path_1.default.join(__dirname, '../../site/node_modules'), '../site/node_modules');
    }
    try {
        const { stdout, stderr } = await (0, util_1.promisify)(child_process_1.exec)('npm install', {
            cwd: path_1.default.join(__dirname, '../site'),
            // shell: true,
        });
        if (stdout && debug)
            logger_1.default.info(stdout);
        if (stderr) {
            logger_1.default.error(`${logger_1.site.err} Error occurred while installing site dependencies`);
            logger_1.default.error(stderr);
        }
        const time = `${Date.now() - timeStart}ms`;
        logger_1.default.info(`${logger_1.site.suc} ⚡ Site install dependencies success in ${time}`);
    }
    catch (error) {
        logger_1.default.error(`${logger_1.site.err} Failed to install site dependencies`);
        logger_1.default.error(error.stack);
        process.exit(1);
    }
};
/**
 * Build the static site with next.js.
 */
const buildSite = async () => {
    const timeStart = Date.now();
    logger_1.default.info(`${logger_1.cli.inf} Building static site (${colors_1.default.yellow('please wait')})`);
    try {
        const { stdout, stderr } = await (0, util_1.promisify)(child_process_1.exec)('npx next build', {
            cwd: path_1.default.join(__dirname, '../site'),
            // shell: true,
        });
        if (stdout && debug)
            logger_1.default.info(stdout);
        if (stderr) {
            logger_1.default.error(`${logger_1.site.err} Error occurred while building site`);
            logger_1.default.error(stderr);
        }
        const time = `${Date.now() - timeStart}ms`;
        logger_1.default.info(`${logger_1.site.suc} ⚡ Build success in ${time}`);
    }
    catch (error) {
        logger_1.default.error(`${logger_1.site.err} Failed to build site`);
        logger_1.default.error(error.stack);
        process.exit(1);
    }
};
/**
 * Copy the site to the ouput directory.
 * @param apiData The API data.
 */
const copySite = async (apiData) => {
    const timeStart = Date.now();
    logger_1.default.info(`${logger_1.cli.inf} Copying site to ${apiData.output}`);
    const targetPath = path_1.default.join(process.cwd(), apiData.output);
    const targetPathOut = path_1.default.join(process.cwd(), `${apiData.output}/out`);
    // Make ouput directory if it doesn't exist
    if (!fs_1.default.existsSync(targetPath))
        await fs_1.default.promises.mkdir(targetPath);
    if (!fs_1.default.existsSync(targetPathOut))
        await fs_1.default.promises.mkdir(targetPathOut);
    try {
        // Copy the site to the ouput directory
        await fs_1.default.promises.cp(path_1.default.join(__dirname, '../site/out'), targetPath);
        // Copy the api.json file to the out directory
        await fs_1.default.promises.copyFile(path_1.default.join(__dirname, '../site/api.json'), path_1.default.join(__dirname, '../site/out/api.json'));
        const time = `${Date.now() - timeStart}ms`;
        logger_1.default.info(`${logger_1.cli.suc} ⚡ Copied site in ${time}`);
    }
    catch (error) {
        logger_1.default.error(`${logger_1.cli.err} Failed to copy site to ${apiData.output}`);
        throw new index_1.PackageError(error);
    }
};
/**
 * Main function.
 */
const main = async () => {
    const rawConfig = await (0, getRawConfig_1.default)();
    const apiData = await (0, loadApi_1.default)(rawConfig.file);
    await exportRoutes(apiData);
    await installSiteDependencies();
    await buildSite();
    await copySite(apiData);
    (0, logInfo_1.default)(apiData, fileTimeStart, 'Generated site');
    process.exit(1);
};
main();
