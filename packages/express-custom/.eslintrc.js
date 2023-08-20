const path = require('path');

module.exports = {
  root: true,
  extends: ['express-custom'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['tsup.confg.ts' ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [path.resolve(__dirname, '.tsconfig.json')],
      },
      node: true,
    },
  },
};
