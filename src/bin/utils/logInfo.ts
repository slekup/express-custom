import colors from 'colors';

import { ExportedApi } from '../../typings/exports';
import logger, { cli } from './logger';

/**
 * Log information about the process.
 * @param apiData The API data.
 * @param fileTimeStart The time the file started.
 * @param text The text to log.
 */
export default (
  apiData: Readonly<ExportedApi>,
  fileTimeStart: number,
  text: string
): void => {
  const fileTimeEnd = Date.now();
  const fileTime = `${fileTimeEnd - fileTimeStart}ms`;

  logger.info(`${cli.suc} ⚡ ${text} in ${fileTime}`);

  const info = `
${colors.magenta('Name:')} ${apiData.name}  
${colors.magenta('Description:')} ${apiData.description}
${colors.magenta('Base URL:')} ${apiData.url}

${colors.cyan('Versions:')} ${apiData.versions
    .map((version: { version: number }) => version.version)
    .join(', ')}
${colors.cyan('Groups:')} ${apiData.versions.reduce(
    (prev: number, current: { groups: unknown[] }) =>
      prev + current.groups.length,
    0
  )}
${colors.cyan('Routes:')} ${apiData.versions.reduce(
    (prev: number, current: { groups: { routes: unknown[] }[] }) =>
      prev +
      current.groups.reduce(
        (prev: number, current) => prev + current.routes.length,
        0
      ),
    0
  )}
${colors.cyan('Endpoints:')} ${apiData.versions.reduce(
    (
      prev: number,
      current: { groups: { routes: { endpoints: unknown[] }[] }[] }
    ) =>
      prev +
      current.groups.reduce(
        (prev: number, current) =>
          prev +
          current.routes.reduce(
            (prev: number, current) => prev + current.endpoints.length,
            0
          ),
        0
      ),
    0
  )}
  `;

  logger.info(info);
};
