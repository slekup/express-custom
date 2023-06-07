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
const index_1 = require("@utils/index");
const logger_1 = __importStar(require("./logger"));
/**
 * Get the express-custom.json config.
 * @returns The express-custom config.
 */
exports.default = async () => {
    logger_1.default.info(`${logger_1.cli.inf} Loading express-custom config`);
    let config;
    try {
        // Read express-custom.json
        const configJSON = await fs_1.default.promises.readFile(path_1.default.join(process.cwd(), 'express-custom.json'));
        // Parse the JSON
        try {
            config = JSON.parse(configJSON.toString());
        }
        catch (error) {
            logger_1.default.error(`${logger_1.cli.err} Failed to parse express-custom.json (invalid JSON)`);
            throw new index_1.PackageError(error);
        }
    }
    catch (error) {
        logger_1.default.error(`${logger_1.cli.err} No express-custom.json found, trying package.json`);
        try {
            // Read package.json
            const packageJSON = await fs_1.default.promises.readFile(path_1.default.join(process.cwd(), 'package.json'));
            // Parse the JSON
            try {
                const configFile = JSON.parse(packageJSON.toString())['express-custom'];
                if (!configFile) {
                    logger_1.default.error(`${logger_1.cli.err} Failed to load express-custom config from package.json`);
                    process.exit(1);
                }
                config = configFile;
            }
            catch (error) {
                logger_1.default.error(`${logger_1.cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                throw new index_1.PackageError(error);
            }
        }
        catch (error) {
            // Failed to read package.json
            logger_1.default.error(`${logger_1.cli.err} Failed to load express-custom config from package.json`);
            throw new index_1.PackageError(error);
        }
    }
    // Check if the file is a .js or .ts file
    if (!['.js', '.ts'].includes(config.file.slice(-3))) {
        logger_1.default.error(`${logger_1.cli.err} Specified "file" must be a .js or .ts file`);
        process.exit(1);
    }
    // Check if the file exists
    if (!fs_1.default.existsSync(path_1.default.resolve(process.cwd(), config.file))) {
        logger_1.default.error(`${logger_1.cli.err} The specified API file does not exist`);
        process.exit(1);
    }
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmF3Q29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Jpbi91dGlscy9nZXRSYXdDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFvQjtBQUNwQixnREFBd0I7QUFFeEIsd0NBQTRDO0FBRTVDLG1EQUF1QztBQUt2Qzs7O0dBR0c7QUFDSCxrQkFBZSxLQUFLLElBQXdCLEVBQUU7SUFDNUMsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFHLENBQUMsR0FBRyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBRXhELElBQUksTUFBaUIsQ0FBQztJQUV0QixJQUFJO1FBQ0YsMkJBQTJCO1FBQzNCLE1BQU0sVUFBVSxHQUFHLE1BQU0sWUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQzNDLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLHFCQUFxQixDQUFDLENBQ2hELENBQUM7UUFFRixpQkFBaUI7UUFDakIsSUFBSTtZQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBYyxDQUFDO1NBQ3pEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxnQkFBTSxDQUFDLEtBQUssQ0FDVixHQUFHLFlBQUcsQ0FBQyxHQUFHLHFEQUFxRCxDQUNoRSxDQUFDO1lBQ0YsTUFBTSxJQUFJLG9CQUFZLENBQUMsS0FBZSxDQUFDLENBQUM7U0FDekM7S0FDRjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsZ0JBQU0sQ0FBQyxLQUFLLENBQ1YsR0FBRyxZQUFHLENBQUMsR0FBRyxvREFBb0QsQ0FDL0QsQ0FBQztRQUVGLElBQUk7WUFDRixvQkFBb0I7WUFDcEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxZQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDNUMsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQ3pDLENBQUM7WUFFRixpQkFBaUI7WUFDakIsSUFBSTtnQkFDRixNQUFNLFVBQVUsR0FDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FDbEMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUVwQixJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNmLGdCQUFNLENBQUMsS0FBSyxDQUNWLEdBQUcsWUFBRyxDQUFDLEdBQUcseURBQXlELENBQ3BFLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakI7Z0JBRUQsTUFBTSxHQUFHLFVBQVUsQ0FBQzthQUNyQjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLGdCQUFNLENBQUMsS0FBSyxDQUNWLEdBQUcsWUFBRyxDQUFDLEdBQUcsa0ZBQWtGLENBQzdGLENBQUM7Z0JBQ0YsTUFBTSxJQUFJLG9CQUFZLENBQUMsS0FBZSxDQUFDLENBQUM7YUFDekM7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsOEJBQThCO1lBQzlCLGdCQUFNLENBQUMsS0FBSyxDQUNWLEdBQUcsWUFBRyxDQUFDLEdBQUcseURBQXlELENBQ3BFLENBQUM7WUFDRixNQUFNLElBQUksb0JBQVksQ0FBQyxLQUFlLENBQUMsQ0FBQztTQUN6QztLQUNGO0lBRUQseUNBQXlDO0lBQ3pDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ25ELGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsWUFBRyxDQUFDLEdBQUcsNkNBQTZDLENBQUMsQ0FBQztRQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0lBRUQsMkJBQTJCO0lBQzNCLElBQUksQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQzVELGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsWUFBRyxDQUFDLEdBQUcsd0NBQXdDLENBQUMsQ0FBQztRQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBQYWNrYWdlRXJyb3IgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vdHlwaW5ncy9leHBvcnRzJztcbmltcG9ydCBsb2dnZXIsIHsgY2xpIH0gZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgdHlwZSBSYXdDb25maWcgPSBQYXJ0aWFsPFBpY2s8Q29uZmlnLCAnZmlsZSc+PiAmXG4gIFJlcXVpcmVkPFBpY2s8Q29uZmlnLCAnZmlsZSc+PjtcblxuLyoqXG4gKiBHZXQgdGhlIGV4cHJlc3MtY3VzdG9tLmpzb24gY29uZmlnLlxuICogQHJldHVybnMgVGhlIGV4cHJlc3MtY3VzdG9tIGNvbmZpZy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKCk6IFByb21pc2U8UmF3Q29uZmlnPiA9PiB7XG4gIGxvZ2dlci5pbmZvKGAke2NsaS5pbmZ9IExvYWRpbmcgZXhwcmVzcy1jdXN0b20gY29uZmlnYCk7XG5cbiAgbGV0IGNvbmZpZzogUmF3Q29uZmlnO1xuXG4gIHRyeSB7XG4gICAgLy8gUmVhZCBleHByZXNzLWN1c3RvbS5qc29uXG4gICAgY29uc3QgY29uZmlnSlNPTiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKFxuICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdleHByZXNzLWN1c3RvbS5qc29uJylcbiAgICApO1xuXG4gICAgLy8gUGFyc2UgdGhlIEpTT05cbiAgICB0cnkge1xuICAgICAgY29uZmlnID0gSlNPTi5wYXJzZShjb25maWdKU09OLnRvU3RyaW5nKCkpIGFzIFJhd0NvbmZpZztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICBgJHtjbGkuZXJyfSBGYWlsZWQgdG8gcGFyc2UgZXhwcmVzcy1jdXN0b20uanNvbiAoaW52YWxpZCBKU09OKWBcbiAgICAgICk7XG4gICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGVycm9yIGFzIHN0cmluZyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZ2dlci5lcnJvcihcbiAgICAgIGAke2NsaS5lcnJ9IE5vIGV4cHJlc3MtY3VzdG9tLmpzb24gZm91bmQsIHRyeWluZyBwYWNrYWdlLmpzb25gXG4gICAgKTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBSZWFkIHBhY2thZ2UuanNvblxuICAgICAgY29uc3QgcGFja2FnZUpTT04gPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShcbiAgICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwYWNrYWdlLmpzb24nKVxuICAgICAgKTtcblxuICAgICAgLy8gUGFyc2UgdGhlIEpTT05cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZ0ZpbGUgPSAoXG4gICAgICAgICAgSlNPTi5wYXJzZShwYWNrYWdlSlNPTi50b1N0cmluZygpKSBhcyB7ICdleHByZXNzLWN1c3RvbSc/OiBSYXdDb25maWcgfVxuICAgICAgICApWydleHByZXNzLWN1c3RvbSddO1xuXG4gICAgICAgIGlmICghY29uZmlnRmlsZSkge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBsb2FkIGV4cHJlc3MtY3VzdG9tIGNvbmZpZyBmcm9tIHBhY2thZ2UuanNvbmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZ0ZpbGU7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgICAgYCR7Y2xpLmVycn0gRmFpbGVkIHRvIHBhcnNlIGV4cHJlc3MtY3VzdG9tLmpzb24gKGludmFsaWQgSlNPTiBvciBubyBcImV4cHJlc3MtY3VzdG9tXCIgYmxvY2spYFxuICAgICAgICApO1xuICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGVycm9yIGFzIHN0cmluZyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIEZhaWxlZCB0byByZWFkIHBhY2thZ2UuanNvblxuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICBgJHtjbGkuZXJyfSBGYWlsZWQgdG8gbG9hZCBleHByZXNzLWN1c3RvbSBjb25maWcgZnJvbSBwYWNrYWdlLmpzb25gXG4gICAgICApO1xuICAgICAgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcihlcnJvciBhcyBzdHJpbmcpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoZSBmaWxlIGlzIGEgLmpzIG9yIC50cyBmaWxlXG4gIGlmICghWycuanMnLCAnLnRzJ10uaW5jbHVkZXMoY29uZmlnLmZpbGUuc2xpY2UoLTMpKSkge1xuICAgIGxvZ2dlci5lcnJvcihgJHtjbGkuZXJyfSBTcGVjaWZpZWQgXCJmaWxlXCIgbXVzdCBiZSBhIC5qcyBvciAudHMgZmlsZWApO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoZSBmaWxlIGV4aXN0c1xuICBpZiAoIWZzLmV4aXN0c1N5bmMocGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGNvbmZpZy5maWxlKSkpIHtcbiAgICBsb2dnZXIuZXJyb3IoYCR7Y2xpLmVycn0gVGhlIHNwZWNpZmllZCBBUEkgZmlsZSBkb2VzIG5vdCBleGlzdGApO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHJldHVybiBjb25maWc7XG59O1xuIl19