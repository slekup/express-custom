import colors from 'colors';
import logger, { cli } from './logger';
/**
 * Log information about the process.
 * @param apiData The API data.
 * @param fileTimeStart The time the file started.
 * @param text The text to log.
 */
export default (apiData, fileTimeStart, text) => {
    const fileTimeEnd = Date.now();
    const fileTime = `${fileTimeEnd - fileTimeStart}ms`;
    logger.info(`${cli.suc} ⚡ ${text} in ${fileTime}`);
    const info = `
${colors.magenta('Name:')} ${apiData.name}  
${colors.magenta('Description:')} ${apiData.description}
${colors.magenta('Base URL:')} ${apiData.url}

${colors.cyan('Versions:')} ${apiData.versions
        .map((version) => version.version)
        .join(', ')}
${colors.cyan('Groups:')} ${apiData.versions.reduce((prev, current) => prev + current.groups.length, 0)}
${colors.cyan('Routes:')} ${apiData.versions.reduce((prev, current) => prev +
        current.groups.reduce((prev, current) => prev + current.routes.length, 0), 0)}
${colors.cyan('Endpoints:')} ${apiData.versions.reduce((prev, current) => prev +
        current.groups.reduce((prev, current) => prev +
            current.routes.reduce((prev, current) => prev + current.endpoints.length, 0), 0), 0)}
  `;
    logger.info(info);
};
//# sourceMappingURL=logInfo.js.map