import colors from 'colors';
import * as winston from 'winston';
/**
 * Returns a color based on the log level.
 * @param level The log level.
 * @returns The colored log level.
 */
const levelColor = (level) => {
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
winston.format.colorize(), winston.format.ms(), winston.format.errors({ stack: true }), 
// winston.format.splat(),
// winston.format.json(),
winston.format.printf(({ ms, level, message, stack }) => {
    let msg = message;
    // Append the stack trace to the message if it is present
    if (stack)
        msg += `\n${stack}`;
    /* eslint-disable no-control-regex */
    const ANSI_REGEX = /\u001b\[[0-9]{1,2}m/gi;
    return `[${colors.gray('express-custom')}] ${colors.cyan(ms)} [${levelColor(level.replace(ANSI_REGEX, ''))}]: ${msg}`;
}));
/**
 * The logger instance - console transports only.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBYSxFQUFVLEVBQUU7SUFDM0MsUUFBUSxLQUFLLEVBQUU7UUFDYixLQUFLLE9BQU8sQ0FBQyxDQUFDO1lBQ1osT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsS0FBSyxNQUFNLENBQUMsQ0FBQztZQUNYLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUMzQztRQUNELEtBQUssTUFBTSxDQUFDLENBQUM7WUFDWCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDMUM7UUFDRCxLQUFLLE9BQU8sQ0FBQyxDQUFDO1lBQ1osT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsS0FBSyxPQUFPLENBQUMsQ0FBQztZQUNaLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ1AsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQzFDO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTztBQUMxQyxnQ0FBZ0M7QUFDaEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFDekIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDdEMsMEJBQTBCO0FBQzFCLHlCQUF5QjtBQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFxQixFQUFFLEVBQUU7SUFDekUsSUFBSSxHQUFHLEdBQUcsT0FBaUIsQ0FBQztJQUU1Qix5REFBeUQ7SUFDekQsSUFBSSxLQUFLO1FBQUUsR0FBRyxJQUFJLEtBQUssS0FBZSxFQUFFLENBQUM7SUFFekMscUNBQXFDO0lBQ3JDLE1BQU0sVUFBVSxHQUFHLHVCQUF1QixDQUFDO0lBRTNDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssTUFBTSxDQUFDLElBQUksQ0FDdEQsRUFBWSxDQUNiLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDN0QsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUNsQyxLQUFLLEVBQUUsT0FBTztJQUNkLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFVBQVUsRUFBRTtRQUNWLG9CQUFvQjtRQUNwQixJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQzdCLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQztLQUNIO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsZUFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29sb3JzIGZyb20gJ2NvbG9ycyc7XG5pbXBvcnQgeyBUcmFuc2Zvcm1hYmxlSW5mbyB9IGZyb20gJ2xvZ2Zvcm0nO1xuaW1wb3J0ICogYXMgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgY29sb3IgYmFzZWQgb24gdGhlIGxvZyBsZXZlbC5cbiAqIEBwYXJhbSBsZXZlbCBUaGUgbG9nIGxldmVsLlxuICogQHJldHVybnMgVGhlIGNvbG9yZWQgbG9nIGxldmVsLlxuICovXG5jb25zdCBsZXZlbENvbG9yID0gKGxldmVsOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBzd2l0Y2ggKGxldmVsKSB7XG4gICAgY2FzZSAnZXJyb3InOiB7XG4gICAgICByZXR1cm4gY29sb3JzLnJlZChsZXZlbC50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG4gICAgY2FzZSAnd2Fybic6IHtcbiAgICAgIHJldHVybiBjb2xvcnMueWVsbG93KGxldmVsLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cbiAgICBjYXNlICdpbmZvJzoge1xuICAgICAgcmV0dXJuIGNvbG9ycy5ncmVlbihsZXZlbC50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG4gICAgY2FzZSAnZGVidWcnOiB7XG4gICAgICByZXR1cm4gY29sb3JzLmJsdWUobGV2ZWwudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuICAgIGNhc2UgJ3RyYWNlJzoge1xuICAgICAgcmV0dXJuIGNvbG9ycy5tYWdlbnRhKGxldmVsLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gY29sb3JzLndoaXRlKGxldmVsLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgZm9ybWF0IGZvciB0aGUgY29uc29sZSB0cmFuc3BvcnQuXG4gKi9cbmNvbnN0IGNvbnNvbGVGb3JtYXQgPSB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAvLyB3aW5zdG9uLmZvcm1hdC5wcmV0dHlQcmludCgpLFxuICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxuICB3aW5zdG9uLmZvcm1hdC5tcygpLFxuICB3aW5zdG9uLmZvcm1hdC5lcnJvcnMoeyBzdGFjazogdHJ1ZSB9KSxcbiAgLy8gd2luc3Rvbi5mb3JtYXQuc3BsYXQoKSxcbiAgLy8gd2luc3Rvbi5mb3JtYXQuanNvbigpLFxuICB3aW5zdG9uLmZvcm1hdC5wcmludGYoKHsgbXMsIGxldmVsLCBtZXNzYWdlLCBzdGFjayB9OiBUcmFuc2Zvcm1hYmxlSW5mbykgPT4ge1xuICAgIGxldCBtc2cgPSBtZXNzYWdlIGFzIHN0cmluZztcblxuICAgIC8vIEFwcGVuZCB0aGUgc3RhY2sgdHJhY2UgdG8gdGhlIG1lc3NhZ2UgaWYgaXQgaXMgcHJlc2VudFxuICAgIGlmIChzdGFjaykgbXNnICs9IGBcXG4ke3N0YWNrIGFzIHN0cmluZ31gO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29udHJvbC1yZWdleCAqL1xuICAgIGNvbnN0IEFOU0lfUkVHRVggPSAvXFx1MDAxYlxcW1swLTldezEsMn1tL2dpO1xuXG4gICAgcmV0dXJuIGBbJHtjb2xvcnMuZ3JheSgnZXhwcmVzcy1jdXN0b20nKX1dICR7Y29sb3JzLmN5YW4oXG4gICAgICBtcyBhcyBzdHJpbmdcbiAgICApfSBbJHtsZXZlbENvbG9yKGxldmVsLnJlcGxhY2UoQU5TSV9SRUdFWCwgJycpKX1dOiAke21zZ31gO1xuICB9KVxuKTtcblxuLyoqXG4gKiBUaGUgbG9nZ2VyIGluc3RhbmNlIC0gY29uc29sZSB0cmFuc3BvcnRzIG9ubHkuXG4gKi9cbmNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgbGV2ZWw6ICdkZWJ1ZycsXG4gIGZvcm1hdDogY29uc29sZUZvcm1hdCxcbiAgdHJhbnNwb3J0czogW1xuICAgIC8vIENvbnNvbGUgdHJhbnNwb3J0XG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgfSksXG4gIF0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIl19