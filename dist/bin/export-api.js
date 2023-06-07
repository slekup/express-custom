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
    logger_1.default.info(`${logger_1.cli.inf} Exporting API data to JSON file`);
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
        logger_1.default.info(`${logger_1.cli.suc} ⚡ Exported API data in ${time}`);
    }
    catch (error) {
        logger_1.default.error(`${logger_1.cli.err} Failed to export API data to JSON file`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vZXhwb3J0LWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUVqQyw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBR3hCLHdFQUFnRDtBQUNoRCw4REFBc0M7QUFDdEMsOERBQXNDO0FBQ3RDLHlEQUE2QztBQUU3Qzs7O0dBR0c7QUFDSCxNQUFNLFNBQVMsR0FBRyxLQUFLLEVBQUUsT0FBb0IsRUFBaUIsRUFBRTtJQUM5RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0IsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFHLENBQUMsR0FBRyxrQ0FBa0MsQ0FBQyxDQUFDO0lBRTFELE1BQU0sVUFBVSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU1RCxJQUFJO1FBQ0YsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUM1QixNQUFNLFlBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtnQkFDbEMsU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1FBRUwseURBQXlEO1FBQ3pELE1BQU0sWUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQ3pCLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxFQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ2pDLENBQUM7UUFFRiwwREFBMEQ7UUFFMUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxJQUFJLENBQUM7UUFDM0MsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFHLENBQUMsR0FBRywyQkFBMkIsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMxRDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxZQUFHLENBQUMsR0FBRyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ2xFLGdCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLElBQUksR0FBRyxLQUFLLElBQW1CLEVBQUU7SUFDckMsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFBLHNCQUFZLEdBQUUsQ0FBQztJQUN2QyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsaUJBQU8sRUFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsSUFBQSxpQkFBTyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUN4RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUVGLElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5jb25zdCBmaWxlVGltZVN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBFeHBvcnRlZEFwaSB9IGZyb20gJ0B0eXBpbmdzL2V4cG9ydHMnO1xuaW1wb3J0IGdldFJhd0NvbmZpZyBmcm9tICcuL3V0aWxzL2dldFJhd0NvbmZpZyc7XG5pbXBvcnQgbG9hZEFwaSBmcm9tICcuL3V0aWxzL2xvYWRBcGknO1xuaW1wb3J0IGxvZ0luZm8gZnJvbSAnLi91dGlscy9sb2dJbmZvJztcbmltcG9ydCBsb2dnZXIsIHsgY2xpIH0gZnJvbSAnLi91dGlscy9sb2dnZXInO1xuXG4vKipcbiAqIEV4cG9ydCB0aGUgQVBJIGRhdGEgdG8gYSBKU09OIGZpbGUuXG4gKiBAcGFyYW0gYXBpRGF0YSBUaGUgQVBJIGRhdGEuXG4gKi9cbmNvbnN0IGV4cG9ydEFwaSA9IGFzeW5jIChhcGlEYXRhOiBFeHBvcnRlZEFwaSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCB0aW1lU3RhcnQgPSBEYXRlLm5vdygpO1xuICBsb2dnZXIuaW5mbyhgJHtjbGkuaW5mfSBFeHBvcnRpbmcgQVBJIGRhdGEgdG8gSlNPTiBmaWxlYCk7XG5cbiAgY29uc3QgdGFyZ2V0UGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBhcGlEYXRhLm91dHB1dCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBNYWtlIG91cHV0IGRpcmVjdG9yeSBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHRhcmdldFBhdGgpKVxuICAgICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIodGFyZ2V0UGF0aCwge1xuICAgICAgICByZWN1cnNpdmU6IHRydWUsXG4gICAgICB9KTtcblxuICAgIC8vIFdyaXRlIHRoZSBBUEkgZGF0YSB0byBhIEpTT04gZmlsZSBpbiB0aGUgb3V0IGRpcmVjdG9yeVxuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShcbiAgICAgIHBhdGguam9pbih0YXJnZXRQYXRoLCBgLi9hcGkuanNvbmApLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoYXBpRGF0YSwgbnVsbCwgMilcbiAgICApO1xuXG4gICAgLy8gZnMucHJvbWlzZXMudW5saW5rKHBhdGguam9pbihfX2Rpcm5hbWUsIGAuL2FwaS5qc29uYCkpO1xuXG4gICAgY29uc3QgdGltZSA9IGAke0RhdGUubm93KCkgLSB0aW1lU3RhcnR9bXNgO1xuICAgIGxvZ2dlci5pbmZvKGAke2NsaS5zdWN9IOKaoSBFeHBvcnRlZCBBUEkgZGF0YSBpbiAke3RpbWV9YCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nZ2VyLmVycm9yKGAke2NsaS5lcnJ9IEZhaWxlZCB0byBleHBvcnQgQVBJIGRhdGEgdG8gSlNPTiBmaWxlYCk7XG4gICAgbG9nZ2VyLmluZm8oZXJyb3IpO1xuICB9XG59O1xuXG4vKipcbiAqIFRoZSBtYWluIGZ1bmN0aW9uLlxuICovXG5jb25zdCBtYWluID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCByYXdDb25maWcgPSBhd2FpdCBnZXRSYXdDb25maWcoKTtcbiAgY29uc3QgYXBpRGF0YSA9IGF3YWl0IGxvYWRBcGkocmF3Q29uZmlnLmZpbGUpO1xuICBhd2FpdCBleHBvcnRBcGkoYXBpRGF0YSk7XG4gIGxvZ0luZm8oYXBpRGF0YSwgZmlsZVRpbWVTdGFydCwgJ0V4cG9ydGVkIEFQSSB0byBKU09OJyk7XG4gIHByb2Nlc3MuZXhpdCgxKTtcbn07XG5cbm1haW4oKTtcbiJdfQ==