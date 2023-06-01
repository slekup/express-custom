const colors = require('colors');

const { cli } = require('./log');

/**
 * Log information about the process.
 */
module.exports = (apiData, fileTimeStart, text) => {
  const fileTimeEnd = Date.now();
  const fileTime = fileTimeEnd - fileTimeStart + 'ms';

  console.log(`${cli.suc} ⚡ ${text} in ${fileTime}`);

  const info = `
${colors.magenta('Name:')} ${apiData.name}
${colors.magenta('Description:')} ${apiData.description}
${colors.magenta('Base URL:')} ${apiData.baseUrl}

${colors.cyan('Versions:')} ${apiData.versions
    .map((version) => version.version)
    .join(', ')}
${colors.cyan('Routers:')} ${apiData.versions.reduce((prev, current) => {
    return prev + current.routers.length;
  }, 0)}
${colors.cyan('Routes:')} ${apiData.versions.reduce((prev, current) => {
    return (
      prev +
      current.routers.reduce((prev, current) => {
        return prev + current.routes.length;
      }, 0)
    );
  }, 0)}
${colors.cyan('Endpoints:')} ${apiData.versions.reduce((prev, current) => {
    return (
      prev +
      current.routers.reduce((prev, current) => {
        return (
          prev +
          current.routes.reduce((prev, current) => {
            return prev + current.endpoints.length;
          }, 0)
        );
      }, 0)
    );
  }, 0)}
  `;

  console.log(info);
};
