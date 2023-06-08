import colors from 'colors';
import { TransformableInfo } from 'logform';
import * as winston from 'winston';

export const cli = {
  info: colors.blue('CLI'),
  success: colors.green('CLI'),
  warning: colors.yellow('CLI'),
  error: colors.red('CLI'),
};

export const site = {
  inf: colors.blue('SITE'),
  suc: colors.green('SITE'),
  err: colors.red('SITE'),
};

/**
 * The format for the console transport.
 */
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ message, stack }: TransformableInfo) => {
    let msg = message as string;
    // Append the stack trace to the message if it is present
    if (stack) msg += `\n${stack as string}`;
    return msg;
  })
);

/**
 * The logger instance - console transports only.
 */
const logger = winston.createLogger({
  level: 'info',
  format: consoleFormat,
  transports: [
    // Console transport
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

export default logger;
