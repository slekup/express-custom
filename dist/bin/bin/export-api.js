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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getRawConfig_1 = __importDefault(require("./utils/getRawConfig"));
const loadApi_1 = __importDefault(require("./utils/loadApi"));
const logInfo_1 = __importDefault(require("./utils/logInfo"));
const logger_1 = __importStar(require("./utils/logger"));
/**
 * Export the API data to a JSON file.
 * @param apiData The API data.
 */
const exportApi = async (apiData) => {
    const timeStart = Date.now();
    logger_1.default.info(`${logger_1.cli.info} Exporting API data to JSON file`);
    const targetPath = path_1.default.join(process.cwd(), apiData.output);
    try {
        // Make ouput directory if it doesn't exist
        if (!fs_1.default.existsSync(targetPath))
            await fs_1.default.promises.mkdir(targetPath, {
                recursive: true,
            });
        // Write the API data to a JSON file in the out directory
        await fs_1.default.promises.writeFile(path_1.default.join(targetPath, `./api.json`), JSON.stringify(apiData, null, 2));
        // fs.promises.unlink(path.join(__dirname, `./api.json`));
        const time = `${Date.now() - timeStart}ms`;
        logger_1.default.info(`${logger_1.cli.success} ⚡ Exported API data in ${time}`);
    }
    catch (error) {
        logger_1.default.error(`${logger_1.cli.error} Failed to export API data to JSON file`);
        logger_1.default.info(error);
    }
};
/**
 * The main function.
 */
const main = async () => {
    const rawConfig = await (0, getRawConfig_1.default)();
    const apiData = await (0, loadApi_1.default)(rawConfig.file);
    await exportApi(apiData);
    (0, logInfo_1.default)(apiData, fileTimeStart, 'Exported API to JSON');
    process.exit(1);
};
main();
