#!/usr/bin/env node
const fileTimeStart = Date.now();
import { exec } from 'child_process';
import colors from 'colors';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { PackageError } from '@utils/index';
import getRawConfig from './utils/getRawConfig';
import loadApi from './utils/loadApi';
import logInfo from './utils/logInfo';
import logger, { cli, site } from './utils/logger';
const debug = process.argv.includes('--debug');
if (debug)
    logger.info(`${cli.inf} ${colors.magenta('Debug mode enabled')}`);
/**
 * Export the routes to a JSON file.
 * @param apiData The API data.
 */
const exportRoutes = async (apiData) => {
    const timeStart = Date.now();
    logger.info(`${cli.inf} Exporting routes to JSON file`);
    try {
        // Write the routes to a JSON file in the site directory
        await fs.promises.writeFile(path.join(__dirname, '../../site/api.json'), JSON.stringify(apiData, null, 2));
        const time = `${Date.now() - timeStart}ms`;
        logger.info(`${cli.suc} ⚡ Exported routes in ${time}`);
    }
    catch (error) {
        logger.error(`${cli.err} Failed to export routes`);
        logger.error(error);
    }
};
/**
 * Install the dependencies for the site.
 */
const installSiteDependencies = async () => {
    const timeStart = Date.now();
    logger.info(`${cli.inf} Installing site dependencies`);
    if (fs.existsSync('../../site/node_modules')) {
        logger.info(`${cli.inf} Copying node_modules ${colors.yellow('please wait')}}`);
        await fs.promises.cp(path.join(__dirname, '../../site/node_modules'), '../site/node_modules');
    }
    try {
        const { stdout, stderr } = await promisify(exec)('npm install', {
            cwd: path.join(__dirname, '../site'),
            // shell: true,
        });
        if (stdout && debug)
            logger.info(stdout);
        if (stderr) {
            logger.error(`${site.err} Error occurred while installing site dependencies`);
            logger.error(stderr);
        }
        const time = `${Date.now() - timeStart}ms`;
        logger.info(`${site.suc} ⚡ Site install dependencies success in ${time}`);
    }
    catch (error) {
        logger.error(`${site.err} Failed to install site dependencies`);
        logger.error(error.stack);
        process.exit(1);
    }
};
/**
 * Build the static site with next.js.
 */
const buildSite = async () => {
    const timeStart = Date.now();
    logger.info(`${cli.inf} Building static site (${colors.yellow('please wait')})`);
    try {
        const { stdout, stderr } = await promisify(exec)('npx next build', {
            cwd: path.join(__dirname, '../site'),
            // shell: true,
        });
        if (stdout && debug)
            logger.info(stdout);
        if (stderr) {
            logger.error(`${site.err} Error occurred while building site`);
            logger.error(stderr);
        }
        const time = `${Date.now() - timeStart}ms`;
        logger.info(`${site.suc} ⚡ Build success in ${time}`);
    }
    catch (error) {
        logger.error(`${site.err} Failed to build site`);
        logger.error(error.stack);
        process.exit(1);
    }
};
/**
 * Copy the site to the ouput directory.
 * @param apiData The API data.
 */
const copySite = async (apiData) => {
    const timeStart = Date.now();
    logger.info(`${cli.inf} Copying site to ${apiData.output}`);
    const targetPath = path.join(process.cwd(), apiData.output);
    const targetPathOut = path.join(process.cwd(), `${apiData.output}/out`);
    // Make ouput directory if it doesn't exist
    if (!fs.existsSync(targetPath))
        await fs.promises.mkdir(targetPath);
    if (!fs.existsSync(targetPathOut))
        await fs.promises.mkdir(targetPathOut);
    try {
        // Copy the site to the ouput directory
        await fs.promises.cp(path.join(__dirname, '../site/out'), targetPath);
        // Copy the api.json file to the out directory
        await fs.promises.copyFile(path.join(__dirname, '../site/api.json'), path.join(__dirname, '../site/out/api.json'));
        const time = `${Date.now() - timeStart}ms`;
        logger.info(`${cli.suc} ⚡ Copied site in ${time}`);
    }
    catch (error) {
        logger.error(`${cli.err} Failed to copy site to ${apiData.output}`);
        throw new PackageError(error);
    }
};
/**
 * Main function.
 */
const main = async () => {
    const rawConfig = await getRawConfig();
    const apiData = await loadApi(rawConfig.file);
    await exportRoutes(apiData);
    await installSiteDependencies();
    await buildSite();
    await copySite(apiData);
    logInfo(apiData, fileTimeStart, 'Generated site');
    process.exit(1);
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vuc2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vZ2Vuc2l0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRWpDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQztBQUNwQixPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sWUFBWSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRS9DLElBQUksS0FBSztJQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFN0U7OztHQUdHO0FBQ0gsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUFFLE9BQW9CLEVBQWlCLEVBQUU7SUFDakUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBRXhELElBQUk7UUFDRix3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QUFNLElBQUksWUFBWSxDQUFDLEtBQWUsQ0FBQyxDQUFDO0tBQ3pDO0FBQ0gsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLElBQUksR0FBRyxLQUFLLElBQW1CLEVBQUU7SUFDckMsTUFBTSxTQUFTLEdBQUcsTUFBTSxZQUFZLEVBQUUsQ0FBQztJQUN2QyxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsTUFBTSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsTUFBTSx1QkFBdUIsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sU0FBUyxFQUFFLENBQUM7SUFDbEIsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUVGLElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5jb25zdCBmaWxlVGltZVN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGNvbG9ycyBmcm9tICdjb2xvcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCc7XG5cbmltcG9ydCB7IEV4cG9ydGVkQXBpIH0gZnJvbSAnQHR5cGluZ3MvZXhwb3J0cyc7XG5pbXBvcnQgeyBQYWNrYWdlRXJyb3IgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xuaW1wb3J0IGdldFJhd0NvbmZpZyBmcm9tICcuL3V0aWxzL2dldFJhd0NvbmZpZyc7XG5pbXBvcnQgbG9hZEFwaSBmcm9tICcuL3V0aWxzL2xvYWRBcGknO1xuaW1wb3J0IGxvZ0luZm8gZnJvbSAnLi91dGlscy9sb2dJbmZvJztcbmltcG9ydCBsb2dnZXIsIHsgY2xpLCBzaXRlIH0gZnJvbSAnLi91dGlscy9sb2dnZXInO1xuXG5jb25zdCBkZWJ1ZyA9IHByb2Nlc3MuYXJndi5pbmNsdWRlcygnLS1kZWJ1ZycpO1xuXG5pZiAoZGVidWcpIGxvZ2dlci5pbmZvKGAke2NsaS5pbmZ9ICR7Y29sb3JzLm1hZ2VudGEoJ0RlYnVnIG1vZGUgZW5hYmxlZCcpfWApO1xuXG4vKipcbiAqIEV4cG9ydCB0aGUgcm91dGVzIHRvIGEgSlNPTiBmaWxlLlxuICogQHBhcmFtIGFwaURhdGEgVGhlIEFQSSBkYXRhLlxuICovXG5jb25zdCBleHBvcnRSb3V0ZXMgPSBhc3luYyAoYXBpRGF0YTogRXhwb3J0ZWRBcGkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgdGltZVN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgbG9nZ2VyLmluZm8oYCR7Y2xpLmluZn0gRXhwb3J0aW5nIHJvdXRlcyB0byBKU09OIGZpbGVgKTtcblxuICB0cnkge1xuICAgIC8vIFdyaXRlIHRoZSByb3V0ZXMgdG8gYSBKU09OIGZpbGUgaW4gdGhlIHNpdGUgZGlyZWN0b3J5XG4gICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKFxuICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL3NpdGUvYXBpLmpzb24nKSxcbiAgICAgIEpTT04uc3RyaW5naWZ5KGFwaURhdGEsIG51bGwsIDIpXG4gICAgKTtcblxuICAgIGNvbnN0IHRpbWUgPSBgJHtEYXRlLm5vdygpIC0gdGltZVN0YXJ0fW1zYDtcbiAgICBsb2dnZXIuaW5mbyhgJHtjbGkuc3VjfSDimqEgRXhwb3J0ZWQgcm91dGVzIGluICR7dGltZX1gKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2dnZXIuZXJyb3IoYCR7Y2xpLmVycn0gRmFpbGVkIHRvIGV4cG9ydCByb3V0ZXNgKTtcbiAgICBsb2dnZXIuZXJyb3IoZXJyb3IpO1xuICB9XG59O1xuXG4vKipcbiAqIEluc3RhbGwgdGhlIGRlcGVuZGVuY2llcyBmb3IgdGhlIHNpdGUuXG4gKi9cbmNvbnN0IGluc3RhbGxTaXRlRGVwZW5kZW5jaWVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCB0aW1lU3RhcnQgPSBEYXRlLm5vdygpO1xuICBsb2dnZXIuaW5mbyhgJHtjbGkuaW5mfSBJbnN0YWxsaW5nIHNpdGUgZGVwZW5kZW5jaWVzYCk7XG5cbiAgaWYgKGZzLmV4aXN0c1N5bmMoJy4uLy4uL3NpdGUvbm9kZV9tb2R1bGVzJykpIHtcbiAgICBsb2dnZXIuaW5mbyhcbiAgICAgIGAke2NsaS5pbmZ9IENvcHlpbmcgbm9kZV9tb2R1bGVzICR7Y29sb3JzLnllbGxvdygncGxlYXNlIHdhaXQnKX19YFxuICAgICk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMuY3AoXG4gICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vc2l0ZS9ub2RlX21vZHVsZXMnKSxcbiAgICAgICcuLi9zaXRlL25vZGVfbW9kdWxlcydcbiAgICApO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IHN0ZG91dCwgc3RkZXJyIH0gPSBhd2FpdCBwcm9taXNpZnkoZXhlYykoJ25wbSBpbnN0YWxsJywge1xuICAgICAgY3dkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vc2l0ZScpLFxuICAgICAgLy8gc2hlbGw6IHRydWUsXG4gICAgfSk7XG5cbiAgICBpZiAoc3Rkb3V0ICYmIGRlYnVnKSBsb2dnZXIuaW5mbyhzdGRvdXQpO1xuICAgIGlmIChzdGRlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgYCR7c2l0ZS5lcnJ9IEVycm9yIG9jY3VycmVkIHdoaWxlIGluc3RhbGxpbmcgc2l0ZSBkZXBlbmRlbmNpZXNgXG4gICAgICApO1xuICAgICAgbG9nZ2VyLmVycm9yKHN0ZGVycik7XG4gICAgfVxuXG4gICAgY29uc3QgdGltZSA9IGAke0RhdGUubm93KCkgLSB0aW1lU3RhcnR9bXNgO1xuICAgIGxvZ2dlci5pbmZvKGAke3NpdGUuc3VjfSDimqEgU2l0ZSBpbnN0YWxsIGRlcGVuZGVuY2llcyBzdWNjZXNzIGluICR7dGltZX1gKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2dnZXIuZXJyb3IoYCR7c2l0ZS5lcnJ9IEZhaWxlZCB0byBpbnN0YWxsIHNpdGUgZGVwZW5kZW5jaWVzYCk7XG4gICAgbG9nZ2VyLmVycm9yKChlcnJvciBhcyB7IHN0YWNrOiBzdHJpbmcgfSkuc3RhY2spO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufTtcblxuLyoqXG4gKiBCdWlsZCB0aGUgc3RhdGljIHNpdGUgd2l0aCBuZXh0LmpzLlxuICovXG5jb25zdCBidWlsZFNpdGUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IHRpbWVTdGFydCA9IERhdGUubm93KCk7XG4gIGxvZ2dlci5pbmZvKFxuICAgIGAke2NsaS5pbmZ9IEJ1aWxkaW5nIHN0YXRpYyBzaXRlICgke2NvbG9ycy55ZWxsb3coJ3BsZWFzZSB3YWl0Jyl9KWBcbiAgKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHsgc3Rkb3V0LCBzdGRlcnIgfSA9IGF3YWl0IHByb21pc2lmeShleGVjKSgnbnB4IG5leHQgYnVpbGQnLCB7XG4gICAgICBjd2Q6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9zaXRlJyksXG4gICAgICAvLyBzaGVsbDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGlmIChzdGRvdXQgJiYgZGVidWcpIGxvZ2dlci5pbmZvKHN0ZG91dCk7XG4gICAgaWYgKHN0ZGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKGAke3NpdGUuZXJyfSBFcnJvciBvY2N1cnJlZCB3aGlsZSBidWlsZGluZyBzaXRlYCk7XG4gICAgICBsb2dnZXIuZXJyb3Ioc3RkZXJyKTtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lID0gYCR7RGF0ZS5ub3coKSAtIHRpbWVTdGFydH1tc2A7XG4gICAgbG9nZ2VyLmluZm8oYCR7c2l0ZS5zdWN9IOKaoSBCdWlsZCBzdWNjZXNzIGluICR7dGltZX1gKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2dnZXIuZXJyb3IoYCR7c2l0ZS5lcnJ9IEZhaWxlZCB0byBidWlsZCBzaXRlYCk7XG4gICAgbG9nZ2VyLmVycm9yKChlcnJvciBhcyB7IHN0YWNrOiBzdHJpbmcgfSkuc3RhY2spO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDb3B5IHRoZSBzaXRlIHRvIHRoZSBvdXB1dCBkaXJlY3RvcnkuXG4gKiBAcGFyYW0gYXBpRGF0YSBUaGUgQVBJIGRhdGEuXG4gKi9cbmNvbnN0IGNvcHlTaXRlID0gYXN5bmMgKGFwaURhdGE6IEV4cG9ydGVkQXBpKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IHRpbWVTdGFydCA9IERhdGUubm93KCk7XG4gIGxvZ2dlci5pbmZvKGAke2NsaS5pbmZ9IENvcHlpbmcgc2l0ZSB0byAke2FwaURhdGEub3V0cHV0fWApO1xuXG4gIGNvbnN0IHRhcmdldFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgYXBpRGF0YS5vdXRwdXQpO1xuICBjb25zdCB0YXJnZXRQYXRoT3V0ID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGAke2FwaURhdGEub3V0cHV0fS9vdXRgKTtcblxuICAvLyBNYWtlIG91cHV0IGRpcmVjdG9yeSBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gIGlmICghZnMuZXhpc3RzU3luYyh0YXJnZXRQYXRoKSkgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIodGFyZ2V0UGF0aCk7XG4gIGlmICghZnMuZXhpc3RzU3luYyh0YXJnZXRQYXRoT3V0KSkgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIodGFyZ2V0UGF0aE91dCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBDb3B5IHRoZSBzaXRlIHRvIHRoZSBvdXB1dCBkaXJlY3RvcnlcbiAgICBhd2FpdCBmcy5wcm9taXNlcy5jcChwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vc2l0ZS9vdXQnKSwgdGFyZ2V0UGF0aCk7XG5cbiAgICAvLyBDb3B5IHRoZSBhcGkuanNvbiBmaWxlIHRvIHRoZSBvdXQgZGlyZWN0b3J5XG4gICAgYXdhaXQgZnMucHJvbWlzZXMuY29weUZpbGUoXG4gICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vc2l0ZS9hcGkuanNvbicpLFxuICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3NpdGUvb3V0L2FwaS5qc29uJylcbiAgICApO1xuXG4gICAgY29uc3QgdGltZSA9IGAke0RhdGUubm93KCkgLSB0aW1lU3RhcnR9bXNgO1xuICAgIGxvZ2dlci5pbmZvKGAke2NsaS5zdWN9IOKaoSBDb3BpZWQgc2l0ZSBpbiAke3RpbWV9YCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nZ2VyLmVycm9yKGAke2NsaS5lcnJ9IEZhaWxlZCB0byBjb3B5IHNpdGUgdG8gJHthcGlEYXRhLm91dHB1dH1gKTtcbiAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGVycm9yIGFzIHN0cmluZyk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFpbiBmdW5jdGlvbi5cbiAqL1xuY29uc3QgbWFpbiA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgcmF3Q29uZmlnID0gYXdhaXQgZ2V0UmF3Q29uZmlnKCk7XG4gIGNvbnN0IGFwaURhdGEgPSBhd2FpdCBsb2FkQXBpKHJhd0NvbmZpZy5maWxlKTtcbiAgYXdhaXQgZXhwb3J0Um91dGVzKGFwaURhdGEpO1xuICBhd2FpdCBpbnN0YWxsU2l0ZURlcGVuZGVuY2llcygpO1xuICBhd2FpdCBidWlsZFNpdGUoKTtcbiAgYXdhaXQgY29weVNpdGUoYXBpRGF0YSk7XG4gIGxvZ0luZm8oYXBpRGF0YSwgZmlsZVRpbWVTdGFydCwgJ0dlbmVyYXRlZCBzaXRlJyk7XG4gIHByb2Nlc3MuZXhpdCgxKTtcbn07XG5cbm1haW4oKTtcbiJdfQ==