const colors = require('colors');

const { cli } = require('./log');

/**
 * Log information about the process.
 */
module.exports = (routes, fileTimeStart, text) => {
  const fileTimeEnd = Date.now();
  const fileTime = fileTimeEnd - fileTimeStart + 'ms';

  console.log(`${cli.suc} ⚡ ${text} in ${fileTime}`);

  const info = `
${colors.cyan('Routes:')} ${routes.routes.length}
${colors.cyan('Endpoints:')} ${routes.routes.reduce((prev, current) => {
    return prev + current.endpoints.length;
  }, 0)}
  `;

  console.log(info);
};
