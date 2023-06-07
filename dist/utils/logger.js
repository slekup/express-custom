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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBYSxFQUFVLEVBQUU7SUFDM0MsUUFBUSxLQUFLLEVBQUU7UUFDYixLQUFLLE9BQU8sQ0FBQyxDQUFDO1lBQ1osT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsS0FBSyxNQUFNLENBQUMsQ0FBQztZQUNYLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUMzQztRQUNELEtBQUssTUFBTSxDQUFDLENBQUM7WUFDWCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDMUM7UUFDRCxLQUFLLE9BQU8sQ0FBQyxDQUFDO1lBQ1osT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsS0FBSyxPQUFPLENBQUMsQ0FBQztZQUNaLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ1AsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQzFDO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTztBQUMxQyxnQ0FBZ0M7QUFDaEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFDekIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDdEMsMEJBQTBCO0FBQzFCLHlCQUF5QjtBQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFxQixFQUFFLEVBQUU7SUFDekUsSUFBSSxHQUFHLEdBQUcsT0FBaUIsQ0FBQztJQUU1Qix5REFBeUQ7SUFDekQsSUFBSSxLQUFLO1FBQUUsR0FBRyxJQUFJLEtBQUssS0FBZSxFQUFFLENBQUM7SUFFekMscUNBQXFDO0lBQ3JDLE1BQU0sVUFBVSxHQUFHLHVCQUF1QixDQUFDO0lBRTNDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssTUFBTSxDQUFDLElBQUksQ0FDdEQsRUFBWSxDQUNiLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDN0QsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUNsQyxLQUFLLEVBQUUsT0FBTztJQUNkLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFVBQVUsRUFBRTtRQUNWLG9CQUFvQjtRQUNwQixJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQzdCLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQztLQUNIO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsZUFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29sb3JzIGZyb20gJ2NvbG9ycyc7XHJcbmltcG9ydCB7IFRyYW5zZm9ybWFibGVJbmZvIH0gZnJvbSAnbG9nZm9ybSc7XHJcbmltcG9ydCAqIGFzIHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIGNvbG9yIGJhc2VkIG9uIHRoZSBsb2cgbGV2ZWwuXHJcbiAqIEBwYXJhbSBsZXZlbCBUaGUgbG9nIGxldmVsLlxyXG4gKiBAcmV0dXJucyBUaGUgY29sb3JlZCBsb2cgbGV2ZWwuXHJcbiAqL1xyXG5jb25zdCBsZXZlbENvbG9yID0gKGxldmVsOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHN3aXRjaCAobGV2ZWwpIHtcclxuICAgIGNhc2UgJ2Vycm9yJzoge1xyXG4gICAgICByZXR1cm4gY29sb3JzLnJlZChsZXZlbC50b1VwcGVyQ2FzZSgpKTtcclxuICAgIH1cclxuICAgIGNhc2UgJ3dhcm4nOiB7XHJcbiAgICAgIHJldHVybiBjb2xvcnMueWVsbG93KGxldmVsLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgfVxyXG4gICAgY2FzZSAnaW5mbyc6IHtcclxuICAgICAgcmV0dXJuIGNvbG9ycy5ncmVlbihsZXZlbC50b1VwcGVyQ2FzZSgpKTtcclxuICAgIH1cclxuICAgIGNhc2UgJ2RlYnVnJzoge1xyXG4gICAgICByZXR1cm4gY29sb3JzLmJsdWUobGV2ZWwudG9VcHBlckNhc2UoKSk7XHJcbiAgICB9XHJcbiAgICBjYXNlICd0cmFjZSc6IHtcclxuICAgICAgcmV0dXJuIGNvbG9ycy5tYWdlbnRhKGxldmVsLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgfVxyXG4gICAgZGVmYXVsdDoge1xyXG4gICAgICByZXR1cm4gY29sb3JzLndoaXRlKGxldmVsLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgZm9ybWF0IGZvciB0aGUgY29uc29sZSB0cmFuc3BvcnQuXHJcbiAqL1xyXG5jb25zdCBjb25zb2xlRm9ybWF0ID0gd2luc3Rvbi5mb3JtYXQuY29tYmluZShcclxuICAvLyB3aW5zdG9uLmZvcm1hdC5wcmV0dHlQcmludCgpLFxyXG4gIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXHJcbiAgd2luc3Rvbi5mb3JtYXQubXMoKSxcclxuICB3aW5zdG9uLmZvcm1hdC5lcnJvcnMoeyBzdGFjazogdHJ1ZSB9KSxcclxuICAvLyB3aW5zdG9uLmZvcm1hdC5zcGxhdCgpLFxyXG4gIC8vIHdpbnN0b24uZm9ybWF0Lmpzb24oKSxcclxuICB3aW5zdG9uLmZvcm1hdC5wcmludGYoKHsgbXMsIGxldmVsLCBtZXNzYWdlLCBzdGFjayB9OiBUcmFuc2Zvcm1hYmxlSW5mbykgPT4ge1xyXG4gICAgbGV0IG1zZyA9IG1lc3NhZ2UgYXMgc3RyaW5nO1xyXG5cclxuICAgIC8vIEFwcGVuZCB0aGUgc3RhY2sgdHJhY2UgdG8gdGhlIG1lc3NhZ2UgaWYgaXQgaXMgcHJlc2VudFxyXG4gICAgaWYgKHN0YWNrKSBtc2cgKz0gYFxcbiR7c3RhY2sgYXMgc3RyaW5nfWA7XHJcblxyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29udHJvbC1yZWdleCAqL1xyXG4gICAgY29uc3QgQU5TSV9SRUdFWCA9IC9cXHUwMDFiXFxbWzAtOV17MSwyfW0vZ2k7XHJcblxyXG4gICAgcmV0dXJuIGBbJHtjb2xvcnMuZ3JheSgnZXhwcmVzcy1jdXN0b20nKX1dICR7Y29sb3JzLmN5YW4oXHJcbiAgICAgIG1zIGFzIHN0cmluZ1xyXG4gICAgKX0gWyR7bGV2ZWxDb2xvcihsZXZlbC5yZXBsYWNlKEFOU0lfUkVHRVgsICcnKSl9XTogJHttc2d9YDtcclxuICB9KVxyXG4pO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBsb2dnZXIgaW5zdGFuY2UgLSBjb25zb2xlIHRyYW5zcG9ydHMgb25seS5cclxuICovXHJcbmNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcclxuICBsZXZlbDogJ2RlYnVnJyxcclxuICBmb3JtYXQ6IGNvbnNvbGVGb3JtYXQsXHJcbiAgdHJhbnNwb3J0czogW1xyXG4gICAgLy8gQ29uc29sZSB0cmFuc3BvcnRcclxuICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XHJcbiAgICAgIGxldmVsOiAnaW5mbycsXHJcbiAgICB9KSxcclxuICBdLFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcclxuIl19