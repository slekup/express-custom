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
const index_1 = require("@utils/index");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vuc2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vZ2Vuc2l0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUVqQyxpREFBcUM7QUFDckMsb0RBQTRCO0FBQzVCLDRDQUFvQjtBQUNwQixnREFBd0I7QUFDeEIsK0JBQWlDO0FBR2pDLHdDQUE0QztBQUM1Qyx3RUFBZ0Q7QUFDaEQsOERBQXNDO0FBQ3RDLDhEQUFzQztBQUN0Qyx5REFBbUQ7QUFFbkQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFL0MsSUFBSSxLQUFLO0lBQUUsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFHLENBQUMsR0FBRyxJQUFJLGdCQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTdFOzs7R0FHRztBQUNILE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxPQUFvQixFQUFpQixFQUFFO0lBQ2pFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQUcsQ0FBQyxHQUFHLGdDQUFnQyxDQUFDLENBQUM7SUFFeEQsSUFBSTtRQUNGLHdEQUF3RDtRQUN4RCxNQUFNLFlBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUN6QixjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxFQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ2pDLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLElBQUksQ0FBQztRQUMzQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQUcsQ0FBQyxHQUFHLHlCQUF5QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3hEO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFlBQUcsQ0FBQyxHQUFHLDBCQUEwQixDQUFDLENBQUM7UUFDbkQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckI7QUFDSCxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sdUJBQXVCLEdBQUcsS0FBSyxJQUFtQixFQUFFO0lBQ3hELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQUcsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7SUFFdkQsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDNUMsZ0JBQU0sQ0FBQyxJQUFJLENBQ1QsR0FBRyxZQUFHLENBQUMsR0FBRyx5QkFBeUIsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDbkUsQ0FBQztRQUNGLE1BQU0sWUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQ2xCLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDLEVBQy9DLHNCQUFzQixDQUN2QixDQUFDO0tBQ0g7SUFFRCxJQUFJO1FBQ0YsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsZ0JBQVMsRUFBQyxvQkFBSSxDQUFDLENBQUMsYUFBYSxFQUFFO1lBQzlELEdBQUcsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7WUFDcEMsZUFBZTtTQUNoQixDQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sSUFBSSxLQUFLO1lBQUUsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxNQUFNLEVBQUU7WUFDVixnQkFBTSxDQUFDLEtBQUssQ0FDVixHQUFHLGFBQUksQ0FBQyxHQUFHLG9EQUFvRCxDQUNoRSxDQUFDO1lBQ0YsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEI7UUFFRCxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLElBQUksQ0FBQztRQUMzQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQUksQ0FBQyxHQUFHLDJDQUEyQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzNFO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLGFBQUksQ0FBQyxHQUFHLHNDQUFzQyxDQUFDLENBQUM7UUFDaEUsZ0JBQU0sQ0FBQyxLQUFLLENBQUUsS0FBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLFNBQVMsR0FBRyxLQUFLLElBQW1CLEVBQUU7SUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzdCLGdCQUFNLENBQUMsSUFBSSxDQUNULEdBQUcsWUFBRyxDQUFDLEdBQUcsMEJBQTBCLGdCQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BFLENBQUM7SUFFRixJQUFJO1FBQ0YsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsZ0JBQVMsRUFBQyxvQkFBSSxDQUFDLENBQUMsZ0JBQWdCLEVBQUU7WUFDakUsR0FBRyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztZQUNwQyxlQUFlO1NBQ2hCLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxJQUFJLEtBQUs7WUFBRSxnQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFJLE1BQU0sRUFBRTtZQUNWLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBSSxDQUFDLEdBQUcscUNBQXFDLENBQUMsQ0FBQztZQUMvRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0QjtRQUVELE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsSUFBSSxDQUFDO1FBQzNDLGdCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBSSxDQUFDLEdBQUcsdUJBQXVCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDdkQ7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBSSxDQUFDLEdBQUcsdUJBQXVCLENBQUMsQ0FBQztRQUNqRCxnQkFBTSxDQUFDLEtBQUssQ0FBRSxLQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxNQUFNLFFBQVEsR0FBRyxLQUFLLEVBQUUsT0FBb0IsRUFBaUIsRUFBRTtJQUM3RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0IsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFHLENBQUMsR0FBRyxvQkFBb0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFFNUQsTUFBTSxVQUFVLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVELE1BQU0sYUFBYSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sTUFBTSxDQUFDLENBQUM7SUFFeEUsMkNBQTJDO0lBQzNDLElBQUksQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUFFLE1BQU0sWUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEUsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQUUsTUFBTSxZQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUUxRSxJQUFJO1FBQ0YsdUNBQXVDO1FBQ3ZDLE1BQU0sWUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFdEUsOENBQThDO1FBQzlDLE1BQU0sWUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3hCLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLEVBQ3hDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDLENBQzdDLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLElBQUksQ0FBQztRQUMzQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQUcsQ0FBQyxHQUFHLHFCQUFxQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFlBQUcsQ0FBQyxHQUFHLDJCQUEyQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNwRSxNQUFNLElBQUksb0JBQVksQ0FBQyxLQUFlLENBQUMsQ0FBQztLQUN6QztBQUNILENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFtQixFQUFFO0lBQ3JDLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBQSxzQkFBWSxHQUFFLENBQUM7SUFDdkMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFBLGlCQUFPLEVBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLE1BQU0sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLE1BQU0sdUJBQXVCLEVBQUUsQ0FBQztJQUNoQyxNQUFNLFNBQVMsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLElBQUEsaUJBQU8sRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDbEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFFRixJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuY29uc3QgZmlsZVRpbWVTdGFydCA9IERhdGUubm93KCk7XG5cbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBjb2xvcnMgZnJvbSAnY29sb3JzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gJ3V0aWwnO1xuXG5pbXBvcnQgeyBFeHBvcnRlZEFwaSB9IGZyb20gJ0B0eXBpbmdzL2V4cG9ydHMnO1xuaW1wb3J0IHsgUGFja2FnZUVycm9yIH0gZnJvbSAnQHV0aWxzL2luZGV4JztcbmltcG9ydCBnZXRSYXdDb25maWcgZnJvbSAnLi91dGlscy9nZXRSYXdDb25maWcnO1xuaW1wb3J0IGxvYWRBcGkgZnJvbSAnLi91dGlscy9sb2FkQXBpJztcbmltcG9ydCBsb2dJbmZvIGZyb20gJy4vdXRpbHMvbG9nSW5mbyc7XG5pbXBvcnQgbG9nZ2VyLCB7IGNsaSwgc2l0ZSB9IGZyb20gJy4vdXRpbHMvbG9nZ2VyJztcblxuY29uc3QgZGVidWcgPSBwcm9jZXNzLmFyZ3YuaW5jbHVkZXMoJy0tZGVidWcnKTtcblxuaWYgKGRlYnVnKSBsb2dnZXIuaW5mbyhgJHtjbGkuaW5mfSAke2NvbG9ycy5tYWdlbnRhKCdEZWJ1ZyBtb2RlIGVuYWJsZWQnKX1gKTtcblxuLyoqXG4gKiBFeHBvcnQgdGhlIHJvdXRlcyB0byBhIEpTT04gZmlsZS5cbiAqIEBwYXJhbSBhcGlEYXRhIFRoZSBBUEkgZGF0YS5cbiAqL1xuY29uc3QgZXhwb3J0Um91dGVzID0gYXN5bmMgKGFwaURhdGE6IEV4cG9ydGVkQXBpKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IHRpbWVTdGFydCA9IERhdGUubm93KCk7XG4gIGxvZ2dlci5pbmZvKGAke2NsaS5pbmZ9IEV4cG9ydGluZyByb3V0ZXMgdG8gSlNPTiBmaWxlYCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBXcml0ZSB0aGUgcm91dGVzIHRvIGEgSlNPTiBmaWxlIGluIHRoZSBzaXRlIGRpcmVjdG9yeVxuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShcbiAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi9zaXRlL2FwaS5qc29uJyksXG4gICAgICBKU09OLnN0cmluZ2lmeShhcGlEYXRhLCBudWxsLCAyKVxuICAgICk7XG5cbiAgICBjb25zdCB0aW1lID0gYCR7RGF0ZS5ub3coKSAtIHRpbWVTdGFydH1tc2A7XG4gICAgbG9nZ2VyLmluZm8oYCR7Y2xpLnN1Y30g4pqhIEV4cG9ydGVkIHJvdXRlcyBpbiAke3RpbWV9YCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nZ2VyLmVycm9yKGAke2NsaS5lcnJ9IEZhaWxlZCB0byBleHBvcnQgcm91dGVzYCk7XG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbnN0YWxsIHRoZSBkZXBlbmRlbmNpZXMgZm9yIHRoZSBzaXRlLlxuICovXG5jb25zdCBpbnN0YWxsU2l0ZURlcGVuZGVuY2llcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgdGltZVN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgbG9nZ2VyLmluZm8oYCR7Y2xpLmluZn0gSW5zdGFsbGluZyBzaXRlIGRlcGVuZGVuY2llc2ApO1xuXG4gIGlmIChmcy5leGlzdHNTeW5jKCcuLi8uLi9zaXRlL25vZGVfbW9kdWxlcycpKSB7XG4gICAgbG9nZ2VyLmluZm8oXG4gICAgICBgJHtjbGkuaW5mfSBDb3B5aW5nIG5vZGVfbW9kdWxlcyAke2NvbG9ycy55ZWxsb3coJ3BsZWFzZSB3YWl0Jyl9fWBcbiAgICApO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLmNwKFxuICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL3NpdGUvbm9kZV9tb2R1bGVzJyksXG4gICAgICAnLi4vc2l0ZS9ub2RlX21vZHVsZXMnXG4gICAgKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBzdGRvdXQsIHN0ZGVyciB9ID0gYXdhaXQgcHJvbWlzaWZ5KGV4ZWMpKCducG0gaW5zdGFsbCcsIHtcbiAgICAgIGN3ZDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3NpdGUnKSxcbiAgICAgIC8vIHNoZWxsOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgaWYgKHN0ZG91dCAmJiBkZWJ1ZykgbG9nZ2VyLmluZm8oc3Rkb3V0KTtcbiAgICBpZiAoc3RkZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgIGAke3NpdGUuZXJyfSBFcnJvciBvY2N1cnJlZCB3aGlsZSBpbnN0YWxsaW5nIHNpdGUgZGVwZW5kZW5jaWVzYFxuICAgICAgKTtcbiAgICAgIGxvZ2dlci5lcnJvcihzdGRlcnIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRpbWUgPSBgJHtEYXRlLm5vdygpIC0gdGltZVN0YXJ0fW1zYDtcbiAgICBsb2dnZXIuaW5mbyhgJHtzaXRlLnN1Y30g4pqhIFNpdGUgaW5zdGFsbCBkZXBlbmRlbmNpZXMgc3VjY2VzcyBpbiAke3RpbWV9YCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nZ2VyLmVycm9yKGAke3NpdGUuZXJyfSBGYWlsZWQgdG8gaW5zdGFsbCBzaXRlIGRlcGVuZGVuY2llc2ApO1xuICAgIGxvZ2dlci5lcnJvcigoZXJyb3IgYXMgeyBzdGFjazogc3RyaW5nIH0pLnN0YWNrKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH1cbn07XG5cbi8qKlxuICogQnVpbGQgdGhlIHN0YXRpYyBzaXRlIHdpdGggbmV4dC5qcy5cbiAqL1xuY29uc3QgYnVpbGRTaXRlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCB0aW1lU3RhcnQgPSBEYXRlLm5vdygpO1xuICBsb2dnZXIuaW5mbyhcbiAgICBgJHtjbGkuaW5mfSBCdWlsZGluZyBzdGF0aWMgc2l0ZSAoJHtjb2xvcnMueWVsbG93KCdwbGVhc2Ugd2FpdCcpfSlgXG4gICk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IHN0ZG91dCwgc3RkZXJyIH0gPSBhd2FpdCBwcm9taXNpZnkoZXhlYykoJ25weCBuZXh0IGJ1aWxkJywge1xuICAgICAgY3dkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vc2l0ZScpLFxuICAgICAgLy8gc2hlbGw6IHRydWUsXG4gICAgfSk7XG5cbiAgICBpZiAoc3Rkb3V0ICYmIGRlYnVnKSBsb2dnZXIuaW5mbyhzdGRvdXQpO1xuICAgIGlmIChzdGRlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihgJHtzaXRlLmVycn0gRXJyb3Igb2NjdXJyZWQgd2hpbGUgYnVpbGRpbmcgc2l0ZWApO1xuICAgICAgbG9nZ2VyLmVycm9yKHN0ZGVycik7XG4gICAgfVxuXG4gICAgY29uc3QgdGltZSA9IGAke0RhdGUubm93KCkgLSB0aW1lU3RhcnR9bXNgO1xuICAgIGxvZ2dlci5pbmZvKGAke3NpdGUuc3VjfSDimqEgQnVpbGQgc3VjY2VzcyBpbiAke3RpbWV9YCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nZ2VyLmVycm9yKGAke3NpdGUuZXJyfSBGYWlsZWQgdG8gYnVpbGQgc2l0ZWApO1xuICAgIGxvZ2dlci5lcnJvcigoZXJyb3IgYXMgeyBzdGFjazogc3RyaW5nIH0pLnN0YWNrKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ29weSB0aGUgc2l0ZSB0byB0aGUgb3VwdXQgZGlyZWN0b3J5LlxuICogQHBhcmFtIGFwaURhdGEgVGhlIEFQSSBkYXRhLlxuICovXG5jb25zdCBjb3B5U2l0ZSA9IGFzeW5jIChhcGlEYXRhOiBFeHBvcnRlZEFwaSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCB0aW1lU3RhcnQgPSBEYXRlLm5vdygpO1xuICBsb2dnZXIuaW5mbyhgJHtjbGkuaW5mfSBDb3B5aW5nIHNpdGUgdG8gJHthcGlEYXRhLm91dHB1dH1gKTtcblxuICBjb25zdCB0YXJnZXRQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGFwaURhdGEub3V0cHV0KTtcbiAgY29uc3QgdGFyZ2V0UGF0aE91dCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBgJHthcGlEYXRhLm91dHB1dH0vb3V0YCk7XG5cbiAgLy8gTWFrZSBvdXB1dCBkaXJlY3RvcnkgaWYgaXQgZG9lc24ndCBleGlzdFxuICBpZiAoIWZzLmV4aXN0c1N5bmModGFyZ2V0UGF0aCkpIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHRhcmdldFBhdGgpO1xuICBpZiAoIWZzLmV4aXN0c1N5bmModGFyZ2V0UGF0aE91dCkpIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHRhcmdldFBhdGhPdXQpO1xuXG4gIHRyeSB7XG4gICAgLy8gQ29weSB0aGUgc2l0ZSB0byB0aGUgb3VwdXQgZGlyZWN0b3J5XG4gICAgYXdhaXQgZnMucHJvbWlzZXMuY3AocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3NpdGUvb3V0JyksIHRhcmdldFBhdGgpO1xuXG4gICAgLy8gQ29weSB0aGUgYXBpLmpzb24gZmlsZSB0byB0aGUgb3V0IGRpcmVjdG9yeVxuICAgIGF3YWl0IGZzLnByb21pc2VzLmNvcHlGaWxlKFxuICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3NpdGUvYXBpLmpzb24nKSxcbiAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9zaXRlL291dC9hcGkuanNvbicpXG4gICAgKTtcblxuICAgIGNvbnN0IHRpbWUgPSBgJHtEYXRlLm5vdygpIC0gdGltZVN0YXJ0fW1zYDtcbiAgICBsb2dnZXIuaW5mbyhgJHtjbGkuc3VjfSDimqEgQ29waWVkIHNpdGUgaW4gJHt0aW1lfWApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZ2dlci5lcnJvcihgJHtjbGkuZXJyfSBGYWlsZWQgdG8gY29weSBzaXRlIHRvICR7YXBpRGF0YS5vdXRwdXR9YCk7XG4gICAgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcihlcnJvciBhcyBzdHJpbmcpO1xuICB9XG59O1xuXG4vKipcbiAqIE1haW4gZnVuY3Rpb24uXG4gKi9cbmNvbnN0IG1haW4gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IHJhd0NvbmZpZyA9IGF3YWl0IGdldFJhd0NvbmZpZygpO1xuICBjb25zdCBhcGlEYXRhID0gYXdhaXQgbG9hZEFwaShyYXdDb25maWcuZmlsZSk7XG4gIGF3YWl0IGV4cG9ydFJvdXRlcyhhcGlEYXRhKTtcbiAgYXdhaXQgaW5zdGFsbFNpdGVEZXBlbmRlbmNpZXMoKTtcbiAgYXdhaXQgYnVpbGRTaXRlKCk7XG4gIGF3YWl0IGNvcHlTaXRlKGFwaURhdGEpO1xuICBsb2dJbmZvKGFwaURhdGEsIGZpbGVUaW1lU3RhcnQsICdHZW5lcmF0ZWQgc2l0ZScpO1xuICBwcm9jZXNzLmV4aXQoMSk7XG59O1xuXG5tYWluKCk7XG4iXX0=