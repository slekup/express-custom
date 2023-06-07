import fs from 'fs';
import path from 'path';
import { PackageError } from '@utils/index';
import logger, { cli } from './logger';
/**
 * Get the express-custom.json config.
 * @returns The express-custom config.
 */
export default async () => {
    logger.info(`${cli.inf} Loading express-custom config`);
    let config;
    try {
        // Read express-custom.json
        const configJSON = await fs.promises.readFile(path.join(process.cwd(), 'express-custom.json'));
        // Parse the JSON
        try {
            config = JSON.parse(configJSON.toString());
        }
        catch (error) {
            logger.error(`${cli.err} Failed to parse express-custom.json (invalid JSON)`);
            throw new PackageError(error);
        }
    }
    catch (error) {
        logger.error(`${cli.err} No express-custom.json found, trying package.json`);
        try {
            // Read package.json
            const packageJSON = await fs.promises.readFile(path.join(process.cwd(), 'package.json'));
            // Parse the JSON
            try {
                const configFile = JSON.parse(packageJSON.toString())['express-custom'];
                if (!configFile) {
                    logger.error(`${cli.err} Failed to load express-custom config from package.json`);
                    process.exit(1);
                }
                config = configFile;
            }
            catch (error) {
                logger.error(`${cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`);
                throw new PackageError(error);
            }
        }
        catch (error) {
            // Failed to read package.json
            logger.error(`${cli.err} Failed to load express-custom config from package.json`);
            throw new PackageError(error);
        }
    }
    // Check if the file is a .js or .ts file
    if (!['.js', '.ts'].includes(config.file.slice(-3))) {
        logger.error(`${cli.err} Specified "file" must be a .js or .ts file`);
        process.exit(1);
    }
    // Check if the file exists
    if (!fs.existsSync(path.resolve(process.cwd(), config.file))) {
        logger.error(`${cli.err} The specified API file does not exist`);
        process.exit(1);
    }
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmF3Q29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Jpbi91dGlscy9nZXRSYXdDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3BCLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUV4QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTVDLE9BQU8sTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBS3ZDOzs7R0FHRztBQUNILGVBQWUsS0FBSyxJQUF3QixFQUFFO0lBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBRXhELElBQUksTUFBaUIsQ0FBQztJQUV0QixJQUFJO1FBQ0YsMkJBQTJCO1FBQzNCLE1BQU0sVUFBVSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLHFCQUFxQixDQUFDLENBQ2hELENBQUM7UUFFRixpQkFBaUI7UUFDakIsSUFBSTtZQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBYyxDQUFDO1NBQ3pEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUNWLEdBQUcsR0FBRyxDQUFDLEdBQUcscURBQXFELENBQ2hFLENBQUM7WUFDRixNQUFNLElBQUksWUFBWSxDQUFDLEtBQWUsQ0FBQyxDQUFDO1NBQ3pDO0tBQ0Y7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE1BQU0sQ0FBQyxLQUFLLENBQ1YsR0FBRyxHQUFHLENBQUMsR0FBRyxvREFBb0QsQ0FDL0QsQ0FBQztRQUVGLElBQUk7WUFDRixvQkFBb0I7WUFDcEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQ3pDLENBQUM7WUFFRixpQkFBaUI7WUFDakIsSUFBSTtnQkFDRixNQUFNLFVBQVUsR0FDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FDbEMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUVwQixJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNmLE1BQU0sQ0FBQyxLQUFLLENBQ1YsR0FBRyxHQUFHLENBQUMsR0FBRyx5REFBeUQsQ0FDcEUsQ0FBQztvQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQjtnQkFFRCxNQUFNLEdBQUcsVUFBVSxDQUFDO2FBQ3JCO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLEtBQUssQ0FDVixHQUFHLEdBQUcsQ0FBQyxHQUFHLGtGQUFrRixDQUM3RixDQUFDO2dCQUNGLE1BQU0sSUFBSSxZQUFZLENBQUMsS0FBZSxDQUFDLENBQUM7YUFDekM7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsOEJBQThCO1lBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQ1YsR0FBRyxHQUFHLENBQUMsR0FBRyx5REFBeUQsQ0FDcEUsQ0FBQztZQUNGLE1BQU0sSUFBSSxZQUFZLENBQUMsS0FBZSxDQUFDLENBQUM7U0FDekM7S0FDRjtJQUVELHlDQUF5QztJQUN6QyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsNkNBQTZDLENBQUMsQ0FBQztRQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0lBRUQsMkJBQTJCO0lBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQzVELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmltcG9ydCB7IFBhY2thZ2VFcnJvciB9IGZyb20gJ0B1dGlscy9pbmRleCc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uL3R5cGluZ3MvZXhwb3J0cyc7XHJcbmltcG9ydCBsb2dnZXIsIHsgY2xpIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuZXhwb3J0IHR5cGUgUmF3Q29uZmlnID0gUGFydGlhbDxQaWNrPENvbmZpZywgJ2ZpbGUnPj4gJlxyXG4gIFJlcXVpcmVkPFBpY2s8Q29uZmlnLCAnZmlsZSc+PjtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGV4cHJlc3MtY3VzdG9tLmpzb24gY29uZmlnLlxyXG4gKiBAcmV0dXJucyBUaGUgZXhwcmVzcy1jdXN0b20gY29uZmlnLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKCk6IFByb21pc2U8UmF3Q29uZmlnPiA9PiB7XHJcbiAgbG9nZ2VyLmluZm8oYCR7Y2xpLmluZn0gTG9hZGluZyBleHByZXNzLWN1c3RvbSBjb25maWdgKTtcclxuXHJcbiAgbGV0IGNvbmZpZzogUmF3Q29uZmlnO1xyXG5cclxuICB0cnkge1xyXG4gICAgLy8gUmVhZCBleHByZXNzLWN1c3RvbS5qc29uXHJcbiAgICBjb25zdCBjb25maWdKU09OID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoXHJcbiAgICAgIHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZXhwcmVzcy1jdXN0b20uanNvbicpXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFBhcnNlIHRoZSBKU09OXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZ0pTT04udG9TdHJpbmcoKSkgYXMgUmF3Q29uZmlnO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgbG9nZ2VyLmVycm9yKFxyXG4gICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBwYXJzZSBleHByZXNzLWN1c3RvbS5qc29uIChpbnZhbGlkIEpTT04pYFxyXG4gICAgICApO1xyXG4gICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGVycm9yIGFzIHN0cmluZyk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGxvZ2dlci5lcnJvcihcclxuICAgICAgYCR7Y2xpLmVycn0gTm8gZXhwcmVzcy1jdXN0b20uanNvbiBmb3VuZCwgdHJ5aW5nIHBhY2thZ2UuanNvbmBcclxuICAgICk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gUmVhZCBwYWNrYWdlLmpzb25cclxuICAgICAgY29uc3QgcGFja2FnZUpTT04gPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShcclxuICAgICAgICBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBQYXJzZSB0aGUgSlNPTlxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZ0ZpbGUgPSAoXHJcbiAgICAgICAgICBKU09OLnBhcnNlKHBhY2thZ2VKU09OLnRvU3RyaW5nKCkpIGFzIHsgJ2V4cHJlc3MtY3VzdG9tJz86IFJhd0NvbmZpZyB9XHJcbiAgICAgICAgKVsnZXhwcmVzcy1jdXN0b20nXTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWdGaWxlKSB7XHJcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoXHJcbiAgICAgICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBsb2FkIGV4cHJlc3MtY3VzdG9tIGNvbmZpZyBmcm9tIHBhY2thZ2UuanNvbmBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25maWcgPSBjb25maWdGaWxlO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihcclxuICAgICAgICAgIGAke2NsaS5lcnJ9IEZhaWxlZCB0byBwYXJzZSBleHByZXNzLWN1c3RvbS5qc29uIChpbnZhbGlkIEpTT04gb3Igbm8gXCJleHByZXNzLWN1c3RvbVwiIGJsb2NrKWBcclxuICAgICAgICApO1xyXG4gICAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoZXJyb3IgYXMgc3RyaW5nKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgLy8gRmFpbGVkIHRvIHJlYWQgcGFja2FnZS5qc29uXHJcbiAgICAgIGxvZ2dlci5lcnJvcihcclxuICAgICAgICBgJHtjbGkuZXJyfSBGYWlsZWQgdG8gbG9hZCBleHByZXNzLWN1c3RvbSBjb25maWcgZnJvbSBwYWNrYWdlLmpzb25gXHJcbiAgICAgICk7XHJcbiAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoZXJyb3IgYXMgc3RyaW5nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIHRoZSBmaWxlIGlzIGEgLmpzIG9yIC50cyBmaWxlXHJcbiAgaWYgKCFbJy5qcycsICcudHMnXS5pbmNsdWRlcyhjb25maWcuZmlsZS5zbGljZSgtMykpKSB7XHJcbiAgICBsb2dnZXIuZXJyb3IoYCR7Y2xpLmVycn0gU3BlY2lmaWVkIFwiZmlsZVwiIG11c3QgYmUgYSAuanMgb3IgLnRzIGZpbGVgKTtcclxuICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIHRoZSBmaWxlIGV4aXN0c1xyXG4gIGlmICghZnMuZXhpc3RzU3luYyhwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgY29uZmlnLmZpbGUpKSkge1xyXG4gICAgbG9nZ2VyLmVycm9yKGAke2NsaS5lcnJ9IFRoZSBzcGVjaWZpZWQgQVBJIGZpbGUgZG9lcyBub3QgZXhpc3RgKTtcclxuICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb25maWc7XHJcbn07XHJcbiJdfQ==