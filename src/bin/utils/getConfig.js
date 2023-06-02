const fs = require('fs');
const path = require('path');

const { cli } = require('./log');

module.exports = async () => {
  console.log(`${cli.inf} Loading express-custom config`);

  let config;

  try {
    // Read express-custom.json
    const configJSON = await fs.promises.readFile(
      path.join(process.cwd(), 'express-custom.json')
    );

    // Parse the JSON
    try {
      config = JSON.parse(configJSON.toString());
    } catch (error) {
      console.error(
        `${cli.err} Failed to parse express-custom.json (invalid JSON)`
      );
      throw new Error(error);
    }
  } catch (error) {
    console.error(
      `${cli.err} No express-custom.json found, trying package.json`
    );

    try {
      // Read package.json
      const packageJSON = await fs.promises.readFile(
        path.join(process.cwd(), 'package.json')
      );

      // Parse the JSON
      try {
        config = JSON.parse(packageJSON.toString())['express-custom'];
      } catch (error) {
        console.error(
          `${cli.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`
        );
        throw new Error(error);
      }
    } catch (error) {
      // Failed to read package.json
      console.error(
        `${cli.err} Failed to load express-custom config from package.json`
      );
      throw new Error(error);
    }
  }

  const validatedConfig = new ValidateConfig(config);
  validatedConfig.run();

  return validatedConfig;
};

const configSchema = {
  file: {
    type: 'string',
    required: true,
  },
  output: {
    type: 'string',
    required: false,
  },
  name: {
    type: 'string',
    required: false,
  },
  description: {
    type: 'string',
    required: false,
  },
  name: {
    type: 'string',
    required: false,
  },
};

class ValidateConfig {
  constructor(config) {
    this.config = config;
  }

  file() {
    // Check if the file is a .js or .ts file
    if (!['.js', '.ts'].includes(this.config.file.slice(-3))) {
      console.error(`${cli.err} Specified "file" must be a .js or .ts file`);
      process.exit(1);
    }

    // Check if the file exists
    if (!fs.existsSync(path.resolve(process.cwd(), this.config.file))) {
      console.error(`${cli.err} The specified API file does not exist`);
      process.exit(1);
    }
  }

  name() {}

  /**
   * Run the config validation.
   */
  run() {
    const requiredOptions = ['file'];

    for (const option of requiredOptions) {
      if (!this.config[option]) {
        console.error(
          `${cli.err} Missing required config option "${option}" in express-custom config`
        );
        process.exit(1);
      }
    }

    this.file(config);

    return this.config;
  }
}
