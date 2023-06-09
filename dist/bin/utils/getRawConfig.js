import fs from 'fs';
import path from 'path';
import { ExpressCustomError } from '../../utils/index';
import logger, { cli } from './logger';
/**
 * Get the express-custom.json config.
 * @returns The express-custom config.
 */
export default async () => {
    logger.info(`${cli.info} Loading express-custom config`);
    let config;
    try {
        // Read express-custom.json
        const configJSON = await fs.promises.readFile(path.join(process.cwd(), 'express-custom.json'));
        // Parse the JSON
        try {
            config = JSON.parse(configJSON.toString());
        }
        catch (error) {
            logger.error(`${cli.error} Failed to parse express-custom.json (invalid JSON)`);
            throw new ExpressCustomError(error);
        }
    }
    catch (error) {
        logger.error(`${cli.error} No express-custom.json found, trying package.json`);
        try {
            // Read package.json
            const packageJSON = await fs.promises.readFile(path.join(process.cwd(), 'package.json'));
            // Parse the JSON
            try {
                const configFile = JSON.parse(packageJSON.toString())['express-custom'];
                if (!configFile) {
                    logger.error(`${cli.error} Failed to load express-custom config from package.json`);
                    process.exit(1);
                }
                config = configFile;
            }
            catch (error) {
                logger.error(`${cli.error} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                throw new ExpressCustomError(error);
            }
        }
        catch (error) {
            // Failed to read package.json
            logger.error(`${cli.error} Failed to load express-custom config from package.json`);
            throw new ExpressCustomError(error);
        }
    }
    // Check if the file is a .js or .ts file
    if (!['.js', '.ts'].includes(config.file.slice(-3))) {
        logger.error(`${cli.error} Specified "file" must be a .js or .ts file`);
        process.exit(1);
    }
    // Check if the file exists
    if (!fs.existsSync(path.resolve(process.cwd(), config.file))) {
        logger.error(`${cli.error} The specified API file does not exist`);
        process.exit(1);
    }
    return config;
};
//# sourceMappingURL=getRawConfig.js.map