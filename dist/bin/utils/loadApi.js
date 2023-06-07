import colors from 'colors';
import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import * as tsNode from 'ts-node';
import * as tsconfigPaths from 'tsconfig-paths';
import logger, { cli } from './logger';
/**
 * Load the API file.
 * @param fileName The file name.
 * @returns The exported API data.
 */
export default async (fileName) => {
    const timeStart = Date.now();
    let apiData = {};
    try {
        // Load the file that exports the API
        const filePath = path.resolve(process.cwd(), fileName).toString();
        // Get the directory containing the tsconfig.json file
        const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');
        const tsconfigDir = path.dirname(tsconfigPath);
        logger.info(`${cli.inf} Loading tsconfig.json`);
        // Load the tsconfig.json file
        let tsconfigJson;
        try {
            tsconfigJson = JSON.parse((await fs.promises.readFile(tsconfigPath)).toString());
        }
        catch (error) {
            logger.error(`${cli.err} Failed to load tsconfig.json file. If it exists, make sure it is valid JSON: ${colors.cyan('https://jsonlint.com/')}.`);
            process.exit(1);
        }
        if (!tsconfigJson.compilerOptions) {
            logger.error(`${cli.err} Failed to load tsconfig.json file, no compilerOptions.`);
            process.exit(1);
        }
        const baseUrl = tsconfigJson.compilerOptions.baseUrl ?? '.';
        const paths = tsconfigJson.compilerOptions.paths ?? {};
        logger.info(`${cli.inf} Compiling TypeScript`);
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
            .compile(await fs.promises.readFile(filePath, { encoding: 'utf-8' }), filePath);
        logger.info(`${cli.inf} Registering tsconfig paths`);
        tsconfigPaths.register({
            baseUrl: path.resolve(tsconfigDir, baseUrl),
            paths: {
                ...paths,
                '*': ['node_modules/*'],
            },
        });
        logger.info(`${cli.inf} Loading API file`);
        const requireModule = createRequire(path.resolve(__dirname, __filename));
        const module = requireModule(filePath);
        const time = `${Date.now() - timeStart}ms`;
        logger.info(`${cli.suc} ⚡ Loaded API file in ${time}`);
        // Access the exported API
        if (!module.default) {
            logger.error(`${cli.err} Failed to load the API file, no default export.`);
            process.exit(1);
        }
        const api = module.default;
        // Return the exported API
        apiData = await api.export();
    }
    catch (error) {
        logger.error(`${cli.err} Failed to load the API file, you have errors in your code!`);
        logger.error(error.stack);
        process.exit(1);
    }
    return apiData;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZEFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW4vdXRpbHMvbG9hZEFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDdkMsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFLaEQsT0FBTyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRdkM7Ozs7R0FJRztBQUNILGVBQWUsS0FBSyxFQUFFLFFBQWdCLEVBQWtDLEVBQUU7SUFDeEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzdCLElBQUksT0FBTyxHQUFHLEVBQTJCLENBQUM7SUFFMUMsSUFBSTtRQUNGLHFDQUFxQztRQUNyQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVsRSxzREFBc0Q7UUFDdEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDbEUsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUvQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsd0JBQXdCLENBQUMsQ0FBQztRQUVoRCw4QkFBOEI7UUFDOUIsSUFBSSxZQUFzQixDQUFDO1FBQzNCLElBQUk7WUFDRixZQUFZLEdBQUcs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Q0FBQyxLQUFLLENBQ1YsR0FBRyxHQUFHLENBQUMsR0FBRyw2REFBNkQsQ0FDeEUsQ0FBQztRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUUsS0FBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbG9ycyBmcm9tICdjb2xvcnMnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSAnbW9kdWxlJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIHRzTm9kZSBmcm9tICd0cy1ub2RlJztcclxuaW1wb3J0ICogYXMgdHNjb25maWdQYXRocyBmcm9tICd0c2NvbmZpZy1wYXRocyc7XHJcbmltcG9ydCB7IENvbXBpbGVyT3B0aW9ucyB9IGZyb20gJ3R5cGVzY3JpcHQnO1xyXG5cclxuaW1wb3J0IHsgRXhwb3J0ZWRBcGkgfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcclxuaW1wb3J0IEFwaSBmcm9tICcuLi8uLi9idWlsZGVycy9BcGknO1xyXG5pbXBvcnQgbG9nZ2VyLCB7IGNsaSB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbmludGVyZmFjZSBUc0NvbmZpZyB7XHJcbiAgY29tcGlsZXJPcHRpb25zPzogQ29tcGlsZXJPcHRpb25zO1xyXG4gIGluY2x1ZGU/OiBzdHJpbmdbXTtcclxuICBleGNsdWRlPzogc3RyaW5nW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMb2FkIHRoZSBBUEkgZmlsZS5cclxuICogQHBhcmFtIGZpbGVOYW1lIFRoZSBmaWxlIG5hbWUuXHJcbiAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCBBUEkgZGF0YS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxSZWFkb25seTxFeHBvcnRlZEFwaT4+ID0+IHtcclxuICBjb25zdCB0aW1lU3RhcnQgPSBEYXRlLm5vdygpO1xyXG4gIGxldCBhcGlEYXRhID0ge30gYXMgUmVhZG9ubHk8RXhwb3J0ZWRBcGk+O1xyXG5cclxuICB0cnkge1xyXG4gICAgLy8gTG9hZCB0aGUgZmlsZSB0aGF0IGV4cG9ydHMgdGhlIEFQSVxyXG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZmlsZU5hbWUpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gR2V0IHRoZSBkaXJlY3RvcnkgY29udGFpbmluZyB0aGUgdHNjb25maWcuanNvbiBmaWxlXHJcbiAgICBjb25zdCB0c2NvbmZpZ1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3RzY29uZmlnLmpzb24nKTtcclxuICAgIGNvbnN0IHRzY29uZmlnRGlyID0gcGF0aC5kaXJuYW1lKHRzY29uZmlnUGF0aCk7XHJcblxyXG4gICAgbG9nZ2VyLmluZm8oYCR7Y2xpLmluZn0gTG9hZGluZyB0c2NvbmZpZy5qc29uYCk7XHJcblxyXG4gICAgLy8gTG9hZCB0aGUgdHNjb25maWcuanNvbiBmaWxlXHJcbiAgICBsZXQgdHNjb25maWdKc29uOiBUc0NvbmZpZztcclxuICAgIHRyeSB7XHJcbiAgICAgIHRzY29uZmlnSnNvbiA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgKGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHRzY29uZmlnUGF0aCkpLnRvU3RyaW5nKClcclxuICAgICAgKSBhcyBUc0NvbmZpZztcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGxvZ2dlci5lcnJvcihcclxuICAgICAgICBgJHtcclxuICAgICAgICAgIGNsaS5lcnJcclxuICAgICAgICB9IEZhaWxlZCB0byBsb2FkIHRzY29uZmlnLmpzb24gZmlsZS4gSWYgaXQgZXhpc3RzLCBtYWtlIHN1cmUgaXQgaXMgdmFsaWQgSlNPTjogJHtjb2xvcnMuY3lhbihcclxuICAgICAgICAgICdodHRwczovL2pzb25saW50LmNvbS8nXHJcbiAgICAgICAgKX0uYFxyXG4gICAgICApO1xyXG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0c2NvbmZpZ0pzb24uY29tcGlsZXJPcHRpb25zKSB7XHJcbiAgICAgIGxvZ2dlci5lcnJvcihcclxuICAgICAgICBgJHtjbGkuZXJyfSBGYWlsZWQgdG8gbG9hZCB0c2NvbmZpZy5qc29uIGZpbGUsIG5vIGNvbXBpbGVyT3B0aW9ucy5gXHJcbiAgICAgICk7XHJcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYXNlVXJsID0gdHNjb25maWdKc29uLmNvbXBpbGVyT3B0aW9ucy5iYXNlVXJsID8/ICcuJztcclxuICAgIGNvbnN0IHBhdGhzID0gdHNjb25maWdKc29uLmNvbXBpbGVyT3B0aW9ucy5wYXRocyA/PyB7fTtcclxuXHJcbiAgICBsb2dnZXIuaW5mbyhgJHtjbGkuaW5mfSBDb21waWxpbmcgVHlwZVNjcmlwdGApO1xyXG5cclxuICAgIC8vIENvbXBpbGUgVHlwZVNjcmlwdCBjb2RlIHRvIEphdmFTY3JpcHQgdXNpbmcgdHMtbm9kZVxyXG4gICAgdHNOb2RlXHJcbiAgICAgIC5yZWdpc3Rlcih7XHJcbiAgICAgICAgdHJhbnNwaWxlT25seTogdHJ1ZSxcclxuICAgICAgICBwcm9qZWN0OiBwcm9jZXNzLmN3ZCgpLFxyXG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xyXG4gICAgICAgICAgLi4udHNjb25maWdKc29uLmNvbXBpbGVyT3B0aW9ucyxcclxuICAgICAgICAgIG1vZHVsZTogJ2NvbW1vbmpzJyxcclxuICAgICAgICAgIGVzTW9kdWxlSW50ZXJvcDogdHJ1ZSxcclxuICAgICAgICB9IC8qIFxyXG4gICAgICAgIGxvYWRlcjoge1xyXG4gICAgICAgICAgJy50cyc6ICd0cy1ub2RlL2VzbScsXHJcbiAgICAgICAgfSwgKi8sXHJcbiAgICAgICAgZXhwZXJpbWVudGFsU3BlY2lmaWVyUmVzb2x1dGlvbjogJ25vZGUnLFxyXG4gICAgICB9KVxyXG4gICAgICAuY29tcGlsZShcclxuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShmaWxlUGF0aCwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KSxcclxuICAgICAgICBmaWxlUGF0aFxyXG4gICAgICApO1xyXG5cclxuICAgIGxvZ2dlci5pbmZvKGAke2NsaS5pbmZ9IFJlZ2lzdGVyaW5nIHRzY29uZmlnIHBhdGhzYCk7XHJcblxyXG4gICAgdHNjb25maWdQYXRocy5yZWdpc3Rlcih7XHJcbiAgICAgIGJhc2VVcmw6IHBhdGgucmVzb2x2ZSh0c2NvbmZpZ0RpciwgYmFzZVVybCksXHJcbiAgICAgIHBhdGhzOiB7XHJcbiAgICAgICAgLi4ucGF0aHMsXHJcbiAgICAgICAgJyonOiBbJ25vZGVfbW9kdWxlcy8qJ10sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBsb2dnZXIuaW5mbyhgJHtjbGkuaW5mfSBMb2FkaW5nIEFQSSBmaWxlYCk7XHJcblxyXG4gICAgY29uc3QgcmVxdWlyZU1vZHVsZSA9IGNyZWF0ZVJlcXVpcmUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgX19maWxlbmFtZSkpO1xyXG4gICAgY29uc3QgbW9kdWxlID0gcmVxdWlyZU1vZHVsZShmaWxlUGF0aCkgYXMgeyBkZWZhdWx0PzogQXBpIH07XHJcblxyXG4gICAgY29uc3QgdGltZSA9IGAke0RhdGUubm93KCkgLSB0aW1lU3RhcnR9bXNgO1xyXG4gICAgbG9nZ2VyLmluZm8oYCR7Y2xpLnN1Y30g4pqhIExvYWRlZCBBUEkgZmlsZSBpbiAke3RpbWV9YCk7XHJcblxyXG4gICAgLy8gQWNjZXNzIHRoZSBleHBvcnRlZCBBUElcclxuICAgIGlmICghbW9kdWxlLmRlZmF1bHQpIHtcclxuICAgICAgbG9nZ2VyLmVycm9yKFxyXG4gICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBsb2FkIHRoZSBBUEkgZmlsZSwgbm8gZGVmYXVsdCBleHBvcnQuYFxyXG4gICAgICApO1xyXG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXBpOiBBcGkgPSBtb2R1bGUuZGVmYXVsdDtcclxuXHJcbiAgICAvLyBSZXR1cm4gdGhlIGV4cG9ydGVkIEFQSVxyXG4gICAgYXBpRGF0YSA9IGF3YWl0IGFwaS5leHBvcnQoKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgbG9nZ2VyLmVycm9yKFxyXG4gICAgICBgJHtjbGkuZXJyfSBGYWlsZWQgdG8gbG9hZCB0aGUgQVBJIGZpbGUsIHlvdSBoYXZlIGVycm9ycyBpbiB5b3VyIGNvZGUhYFxyXG4gICAgKTtcclxuICAgIGxvZ2dlci5lcnJvcigoZXJyb3IgYXMgeyBzdGFjazogc3RyaW5nIH0pLnN0YWNrKTtcclxuICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhcGlEYXRhO1xyXG59O1xyXG4iXX0=