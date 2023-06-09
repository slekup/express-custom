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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../../utils/index");
const logger_1 = __importStar(require("./logger"));
/**
 * Get the express-custom.json config.
 * @returns The express-custom config.
 */
exports.default = async () => {
    logger_1.default.info(`${logger_1.cli.info} Loading express-custom config`);
    let config;
    try {
        // Read express-custom.json
        const configJSON = await fs_1.default.promises.readFile(path_1.default.join(process.cwd(), 'express-custom.json'));
        // Parse the JSON
        try {
            config = JSON.parse(configJSON.toString());
        }
        catch (error) {
            logger_1.default.error(`${logger_1.cli.error} Failed to parse express-custom.json (invalid JSON)`);
            throw new index_1.ExpressCustomError(error);
        }
    }
    catch (error) {
        logger_1.default.error(`${logger_1.cli.error} No express-custom.json found, trying package.json`);
        try {
            // Read package.json
            const packageJSON = await fs_1.default.promises.readFile(path_1.default.join(process.cwd(), 'package.json'));
            // Parse the JSON
            try {
                const configFile = JSON.parse(packageJSON.toString())['express-custom'];
                if (!configFile) {
                    logger_1.default.error(`${logger_1.cli.error} Failed to load express-custom config from package.json`);
                    process.exit(1);
                }
                config = configFile;
            }
            catch (error) {
                logger_1.default.error(`${logger_1.cli.error} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                throw new index_1.ExpressCustomError(error);
            }
        }
        catch (error) {
            // Failed to read package.json
            logger_1.default.error(`${logger_1.cli.error} Failed to load express-custom config from package.json`);
            throw new index_1.ExpressCustomError(error);
        }
    }
    // Check if the file is a .js or .ts file
    if (!['.js', '.ts'].includes(config.file.slice(-3))) {
        logger_1.default.error(`${logger_1.cli.error} Specified "file" must be a .js or .ts file`);
        process.exit(1);
    }
    // Check if the file exists
    if (!fs_1.default.existsSync(path_1.default.resolve(process.cwd(), config.file))) {
        logger_1.default.error(`${logger_1.cli.error} The specified API file does not exist`);
        process.exit(1);
    }
    return config;
};
