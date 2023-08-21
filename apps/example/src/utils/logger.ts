import colors from 'colors';
import { TransformableInfo } from 'logform';
import * as winston from 'winston';

/**
 * Returns a color based on the log level.
 * @param level The log level.
 * @returns The colored log level.
 */
const levelColor = (level: string): string => {
  switch (level) {
    case 'error': {
      return colors.red(level.toUpperCase());
    }
    case 'warn': {
      return colors.yellow(level.toUpperCase());
    }
    case 'info': {
      return colors.green(level.toUpperCase());
    }
    case 'debug': {
      return colors.blue(level.toUpperCase());
    }
    case 'trace': {
      return colors.magenta(level.toUpperCase());
    }
    default: {
      return colors.white(level.toUpperCase());
    }
  }
};

/**
 * The format for the console transport.
 */
const consoleFormat = winston.format.combine(
  // winston.format.prettyPrint(),
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.ms(),
  winston.format.errors({ stack: true }),
  // winston.format.splat(),
  // winston.format.json(),
  winston.format.printf(({ timestamp, ms, level, message, stack }: TransformableInfo) => {
    let msg = message as string;

    // Append the stack trace to the message if it is present
    if (stack) msg += `\n${stack as string}`;

    /* eslint-disable no-control-regex */
    const ANSI_REGEX = /\u001b\[[0-9]{1,2}m/gi;

    return `${colors.gray(timestamp as string)} (${colors.magenta(ms as string)}) [${levelColor(
      level.replace(ANSI_REGEX, '')
    )}]: ${msg}`;
  })
);

/**
 * The logger instance.
 */
const logger = winston.createLogger({
  level: 'debug',
  format: consoleFormat,
  transports: [
    // Console transport
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

export default logger;
