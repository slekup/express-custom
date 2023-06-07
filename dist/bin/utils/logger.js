import colors from 'colors';
import * as winston from 'winston';
export const cli = {
    inf: colors.blue('CLI'),
    suc: colors.green('CLI'),
    err: colors.red('CLI'),
};
export const site = {
    inf: colors.blue('SITE'),
    suc: colors.green('SITE'),
    err: colors.red('SITE'),
};
/**
 * The format for the console transport.
 */
const consoleFormat = winston.format.combine(winston.format.colorize(), winston.format.errors({ stack: true }), winston.format.printf(({ message, stack }) => {
    let msg = message;
    // Append the stack trace to the message if it is present
    if (stack)
        msg += `\n${stack}`;
    return msg;
}));
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
//# sourceMappingURL=logger.js.map