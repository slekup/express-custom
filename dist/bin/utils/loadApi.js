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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZEFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW4vdXRpbHMvbG9hZEFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLDRDQUFvQjtBQUNwQixtQ0FBdUM7QUFDdkMsZ0RBQXdCO0FBQ3hCLGdEQUFrQztBQUNsQyw4REFBZ0Q7QUFLaEQsbURBQXVDO0FBUXZDOzs7O0dBSUc7QUFDSCxrQkFBZSxLQUFLLEVBQUUsUUFBZ0IsRUFBa0MsRUFBRTtJQUN4RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0IsSUFBSSxPQUFPLEdBQUcsRUFBMkIsQ0FBQztJQUUxQyxJQUFJO1FBQ0YscUNBQXFDO1FBQ3JDLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWxFLHNEQUFzRDtRQUN0RCxNQUFNLFlBQVksR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNsRSxNQUFNLFdBQVcsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRS9DLGdCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBRyxDQUFDLEdBQUcsd0JBQXdCLENBQUMsQ0FBQztRQUVoRCw4QkFBOEI7UUFDOUIsSUFBSSxZQUFzQixDQUFDO1FBQzNCLElBQUk7WUFDRixZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDdkIsQ0FBQyxNQUFNLFlBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQzFDLENBQUM7U0FDZjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsZ0JBQU0s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QUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb2xvcnMgZnJvbSAnY29sb3JzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSAnbW9kdWxlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHNOb2RlIGZyb20gJ3RzLW5vZGUnO1xuaW1wb3J0ICogYXMgdHNjb25maWdQYXRocyBmcm9tICd0c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgeyBDb21waWxlck9wdGlvbnMgfSBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHsgRXhwb3J0ZWRBcGkgfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcbmltcG9ydCBBcGkgZnJvbSAnLi4vLi4vYnVpbGRlcnMvQXBpJztcbmltcG9ydCBsb2dnZXIsIHsgY2xpIH0gZnJvbSAnLi9sb2dnZXInO1xuXG5pbnRlcmZhY2UgVHNDb25maWcge1xuICBjb21waWxlck9wdGlvbnM/OiBDb21waWxlck9wdGlvbnM7XG4gIGluY2x1ZGU/OiBzdHJpbmdbXTtcbiAgZXhjbHVkZT86IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIExvYWQgdGhlIEFQSSBmaWxlLlxuICogQHBhcmFtIGZpbGVOYW1lIFRoZSBmaWxlIG5hbWUuXG4gKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgQVBJIGRhdGEuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxSZWFkb25seTxFeHBvcnRlZEFwaT4+ID0+IHtcbiAgY29uc3QgdGltZVN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgbGV0IGFwaURhdGEgPSB7fSBhcyBSZWFkb25seTxFeHBvcnRlZEFwaT47XG5cbiAgdHJ5IHtcbiAgICAvLyBMb2FkIHRoZSBmaWxlIHRoYXQgZXhwb3J0cyB0aGUgQVBJXG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZmlsZU5hbWUpLnRvU3RyaW5nKCk7XG5cbiAgICAvLyBHZXQgdGhlIGRpcmVjdG9yeSBjb250YWluaW5nIHRoZSB0c2NvbmZpZy5qc29uIGZpbGVcbiAgICBjb25zdCB0c2NvbmZpZ1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3RzY29uZmlnLmpzb24nKTtcbiAgICBjb25zdCB0c2NvbmZpZ0RpciA9IHBhdGguZGlybmFtZSh0c2NvbmZpZ1BhdGgpO1xuXG4gICAgbG9nZ2VyLmluZm8oYCR7Y2xpLmluZn0gTG9hZGluZyB0c2NvbmZpZy5qc29uYCk7XG5cbiAgICAvLyBMb2FkIHRoZSB0c2NvbmZpZy5qc29uIGZpbGVcbiAgICBsZXQgdHNjb25maWdKc29uOiBUc0NvbmZpZztcbiAgICB0cnkge1xuICAgICAgdHNjb25maWdKc29uID0gSlNPTi5wYXJzZShcbiAgICAgICAgKGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHRzY29uZmlnUGF0aCkpLnRvU3RyaW5nKClcbiAgICAgICkgYXMgVHNDb25maWc7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgYCR7XG4gICAgICAgICAgY2xpLmVyclxuICAgICAgICB9IEZhaWxlZCB0byBsb2FkIHRzY29uZmlnLmpzb24gZmlsZS4gSWYgaXQgZXhpc3RzLCBtYWtlIHN1cmUgaXQgaXMgdmFsaWQgSlNPTjogJHtjb2xvcnMuY3lhbihcbiAgICAgICAgICAnaHR0cHM6Ly9qc29ubGludC5jb20vJ1xuICAgICAgICApfS5gXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cblxuICAgIGlmICghdHNjb25maWdKc29uLmNvbXBpbGVyT3B0aW9ucykge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICBgJHtjbGkuZXJyfSBGYWlsZWQgdG8gbG9hZCB0c2NvbmZpZy5qc29uIGZpbGUsIG5vIGNvbXBpbGVyT3B0aW9ucy5gXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cblxuICAgIGNvbnN0IGJhc2VVcmwgPSB0c2NvbmZpZ0pzb24uY29tcGlsZXJPcHRpb25zLmJhc2VVcmwgPz8gJy4nO1xuICAgIGNvbnN0IHBhdGhzID0gdHNjb25maWdKc29uLmNvbXBpbGVyT3B0aW9ucy5wYXRocyA/PyB7fTtcblxuICAgIGxvZ2dlci5pbmZvKGAke2NsaS5pbmZ9IENvbXBpbGluZyBUeXBlU2NyaXB0YCk7XG5cbiAgICAvLyBDb21waWxlIFR5cGVTY3JpcHQgY29kZSB0byBKYXZhU2NyaXB0IHVzaW5nIHRzLW5vZGVcbiAgICB0c05vZGVcbiAgICAgIC5yZWdpc3Rlcih7XG4gICAgICAgIHRyYW5zcGlsZU9ubHk6IHRydWUsXG4gICAgICAgIHByb2plY3Q6IHByb2Nlc3MuY3dkKCksXG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgICAgIC4uLnRzY29uZmlnSnNvbi5jb21waWxlck9wdGlvbnMsXG4gICAgICAgICAgbW9kdWxlOiAnY29tbW9uanMnLFxuICAgICAgICAgIGVzTW9kdWxlSW50ZXJvcDogdHJ1ZSxcbiAgICAgICAgfSAvKiBcbiAgICAgICAgbG9hZGVyOiB7XG4gICAgICAgICAgJy50cyc6ICd0cy1ub2RlL2VzbScsXG4gICAgICAgIH0sICovLFxuICAgICAgICBleHBlcmltZW50YWxTcGVjaWZpZXJSZXNvbHV0aW9uOiAnbm9kZScsXG4gICAgICB9KVxuICAgICAgLmNvbXBpbGUoXG4gICAgICAgIGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLFxuICAgICAgICBmaWxlUGF0aFxuICAgICAgKTtcblxuICAgIGxvZ2dlci5pbmZvKGAke2NsaS5pbmZ9IFJlZ2lzdGVyaW5nIHRzY29uZmlnIHBhdGhzYCk7XG5cbiAgICB0c2NvbmZpZ1BhdGhzLnJlZ2lzdGVyKHtcbiAgICAgIGJhc2VVcmw6IHBhdGgucmVzb2x2ZSh0c2NvbmZpZ0RpciwgYmFzZVVybCksXG4gICAgICBwYXRoczoge1xuICAgICAgICAuLi5wYXRocyxcbiAgICAgICAgJyonOiBbJ25vZGVfbW9kdWxlcy8qJ10sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgbG9nZ2VyLmluZm8oYCR7Y2xpLmluZn0gTG9hZGluZyBBUEkgZmlsZWApO1xuXG4gICAgY29uc3QgcmVxdWlyZU1vZHVsZSA9IGNyZWF0ZVJlcXVpcmUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgX19maWxlbmFtZSkpO1xuICAgIGNvbnN0IG1vZHVsZSA9IHJlcXVpcmVNb2R1bGUoZmlsZVBhdGgpIGFzIHsgZGVmYXVsdD86IEFwaSB9O1xuXG4gICAgY29uc3QgdGltZSA9IGAke0RhdGUubm93KCkgLSB0aW1lU3RhcnR9bXNgO1xuICAgIGxvZ2dlci5pbmZvKGAke2NsaS5zdWN9IOKaoSBMb2FkZWQgQVBJIGZpbGUgaW4gJHt0aW1lfWApO1xuXG4gICAgLy8gQWNjZXNzIHRoZSBleHBvcnRlZCBBUElcbiAgICBpZiAoIW1vZHVsZS5kZWZhdWx0KSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBsb2FkIHRoZSBBUEkgZmlsZSwgbm8gZGVmYXVsdCBleHBvcnQuYFxuICAgICAgKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG5cbiAgICBjb25zdCBhcGk6IEFwaSA9IG1vZHVsZS5kZWZhdWx0O1xuXG4gICAgLy8gUmV0dXJuIHRoZSBleHBvcnRlZCBBUElcbiAgICBhcGlEYXRhID0gYXdhaXQgYXBpLmV4cG9ydCgpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZ2dlci5lcnJvcihcbiAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBsb2FkIHRoZSBBUEkgZmlsZSwgeW91IGhhdmUgZXJyb3JzIGluIHlvdXIgY29kZSFgXG4gICAgKTtcbiAgICBsb2dnZXIuZXJyb3IoKGVycm9yIGFzIHsgc3RhY2s6IHN0cmluZyB9KS5zdGFjayk7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9XG5cbiAgcmV0dXJuIGFwaURhdGE7XG59O1xuIl19