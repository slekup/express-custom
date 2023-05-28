const colors = require('colors');

module.exports.cli = {
  inf: colors.blue('CLI'),
  suc: colors.green('CLI'),
  err: colors.red('CLI'),
};

module.exports.site = {
  inf: colors.blue('SITE'),
  suc: colors.green('SITE'),
  err: colors.red('SITE'),
};
