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
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const module_1 = require("module");
const path_1 = __importDefault(require("path"));
const tsNode = __importStar(require("ts-node"));
const tsconfigPaths = __importStar(require("tsconfig-paths"));
const logger_1 = __importStar(require("./logger"));
/**
 * Load the API file.
 * @param fileName The file name.
 * @returns The exported API data.
 */
exports.default = async (fileName) => {
    const timeStart = Date.now();
    let apiData = {};
    try {
        // Load the file that exports the API
        const filePath = path_1.default.resolve(process.cwd(), fileName).toString();
        // Get the directory containing the tsconfig.json file
        const tsconfigPath = path_1.default.resolve(process.cwd(), 'tsconfig.json');
        const tsconfigDir = path_1.default.dirname(tsconfigPath);
        logger_1.default.info(`${logger_1.cli.inf} Loading tsconfig.json`);
        // Load the tsconfig.json file
        let tsconfigJson;
        try {
            tsconfigJson = JSON.parse((await fs_1.default.promises.readFile(tsconfigPath)).toString());
        }
        catch (error) {
            logger_1.default.error(`${logger_1.cli.err} Failed to load tsconfig.json file. If it exists, make sure it is valid JSON: ${colors_1.default.cyan('https://jsonlint.com/')}.`);
            process.exit(1);
        }
        if (!tsconfigJson.compilerOptions) {
            logger_1.default.error(`${logger_1.cli.err} Failed to load tsconfig.json file, no compilerOptions.`);
            process.exit(1);
        }
        const baseUrl = tsconfigJson.compilerOptions.baseUrl ?? '.';
        const paths = tsconfigJson.compilerOptions.paths ?? {};
        logger_1.default.info(`${logger_1.cli.inf} Compiling TypeScript`);
        // Compile TypeScript code to JavaScript using ts-node
        tsNode
            .register({
            transpileOnly: true,
            project: process.cwd(),
            compilerOptions: {
                ...tsconfigJson.compilerOptions,
                module: 'commonjs',
                esModuleInterop: true,
            } /*
            loader: {
              '.ts': 'ts-node/esm',
            }, */,
            experimentalSpecifierResolution: 'node',
        })
            .compile(await fs_1.default.promises.readFile(filePath, { encoding: 'utf-8' }), filePath);
        logger_1.default.info(`${logger_1.cli.inf} Registering tsconfig paths`);
        tsconfigPaths.register({
            baseUrl: path_1.default.resolve(tsconfigDir, baseUrl),
            paths: {
                ...paths,
                '*': ['node_modules/*'],
            },
        });
        logger_1.default.info(`${logger_1.cli.inf} Loading API file`);
        const requireModule = (0, module_1.createRequire)(path_1.default.resolve(__dirname, __filename));
        const module = requireModule(filePath);
        const time = `${Date.now() - timeStart}ms`;
        logger_1.default.info(`${logger_1.cli.suc} ⚡ Loaded API file in ${time}`);
        // Access the exported API
        if (!module.default) {
            logger_1.default.error(`${logger_1.cli.err} Failed to load the API file, no default export.`);
            process.exit(1);
        }
        const api = module.default;
        // Return the exported API
        apiData = await api.export();
    }
    catch (error) {
        logger_1.default.error(`${logger_1.cli.err} Failed to load the API file, you have errors in your code!`);
        logger_1.default.error(error.stack);
        process.exit(1);
    }
    return apiData;
};
