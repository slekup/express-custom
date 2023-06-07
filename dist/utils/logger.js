"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const winston = __importStar(require("winston"));
/**
 * Returns a color based on the log level.
 * @param level The log level.
 * @returns The colored log level.
 */
const levelColor = (level) => {
    switch (level) {
        case 'error': {
            return colors_1.default.red(level.toUpperCase());
        }
        case 'warn': {
            return colors_1.default.yellow(level.toUpperCase());
        }
        case 'info': {
            return colors_1.default.green(level.toUpperCase());
        }
        case 'debug': {
            return colors_1.default.blue(level.toUpperCase());
        }
        case 'trace': {
            return colors_1.default.magenta(level.toUpperCase());
        }
        default: {
            return colors_1.default.white(level.toUpperCase());
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
    return `[${colors_1.default.gray('express-custom')}] ${colors_1.default.cyan(ms)} [${levelColor(level.replace(ANSI_REGEX, ''))}]: ${msg}`;
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
exports.default = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLGlEQUFtQztBQUVuQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFhLEVBQVUsRUFBRTtJQUMzQyxRQUFRLEtBQUssRUFBRTtRQUNiLEtBQUssT0FBTyxDQUFDLENBQUM7WUFDWixPQUFPLGdCQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsS0FBSyxNQUFNLENBQUMsQ0FBQztZQUNYLE9BQU8sZ0JBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDM0M7UUFDRCxLQUFLLE1BQU0sQ0FBQyxDQUFDO1lBQ1gsT0FBTyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUMxQztRQUNELEtBQUssT0FBTyxDQUFDLENBQUM7WUFDWixPQUFPLGdCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsS0FBSyxPQUFPLENBQUMsQ0FBQztZQUNaLE9BQU8sZ0JBQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLENBQUMsQ0FBQztZQUNQLE9BQU8sZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDMUM7S0FDRjtBQUNILENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPO0FBQzFDLGdDQUFnQztBQUNoQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUNuQixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUN0QywwQkFBMEI7QUFDMUIseUJBQXlCO0FBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQXFCLEVBQUUsRUFBRTtJQUN6RSxJQUFJLEdBQUcsR0FBRyxPQUFpQixDQUFDO0lBRTVCLHlEQUF5RDtJQUN6RCxJQUFJLEtBQUs7UUFBRSxHQUFHLElBQUksS0FBSyxLQUFlLEVBQUUsQ0FBQztJQUV6QyxxQ0FBcUM7SUFDckMsTUFBTSxVQUFVLEdBQUcsdUJBQXVCLENBQUM7SUFFM0MsT0FBTyxJQUFJLGdCQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssZ0JBQU0sQ0FBQyxJQUFJLENBQ3RELEVBQVksQ0FDYixLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzdELENBQUMsQ0FBQyxDQUNILENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDbEMsS0FBSyxFQUFFLE9BQU87SUFDZCxNQUFNLEVBQUUsYUFBYTtJQUNyQixVQUFVLEVBQUU7UUFDVixvQkFBb0I7UUFDcEIsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUM3QixLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUM7S0FDSDtDQUNGLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb2xvcnMgZnJvbSAnY29sb3JzJztcbmltcG9ydCB7IFRyYW5zZm9ybWFibGVJbmZvIH0gZnJvbSAnbG9nZm9ybSc7XG5pbXBvcnQgKiBhcyB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuXG4vKipcbiAqIFJldHVybnMgYSBjb2xvciBiYXNlZCBvbiB0aGUgbG9nIGxldmVsLlxuICogQHBhcmFtIGxldmVsIFRoZSBsb2cgbGV2ZWwuXG4gKiBAcmV0dXJucyBUaGUgY29sb3JlZCBsb2cgbGV2ZWwuXG4gKi9cbmNvbnN0IGxldmVsQ29sb3IgPSAobGV2ZWw6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHN3aXRjaCAobGV2ZWwpIHtcbiAgICBjYXNlICdlcnJvcic6IHtcbiAgICAgIHJldHVybiBjb2xvcnMucmVkKGxldmVsLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cbiAgICBjYXNlICd3YXJuJzoge1xuICAgICAgcmV0dXJuIGNvbG9ycy55ZWxsb3cobGV2ZWwudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuICAgIGNhc2UgJ2luZm8nOiB7XG4gICAgICByZXR1cm4gY29sb3JzLmdyZWVuKGxldmVsLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cbiAgICBjYXNlICdkZWJ1Zyc6IHtcbiAgICAgIHJldHVybiBjb2xvcnMuYmx1ZShsZXZlbC50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG4gICAgY2FzZSAndHJhY2UnOiB7XG4gICAgICByZXR1cm4gY29sb3JzLm1hZ2VudGEobGV2ZWwudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBjb2xvcnMud2hpdGUobGV2ZWwudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFRoZSBmb3JtYXQgZm9yIHRoZSBjb25zb2xlIHRyYW5zcG9ydC5cbiAqL1xuY29uc3QgY29uc29sZUZvcm1hdCA9IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXG4gIC8vIHdpbnN0b24uZm9ybWF0LnByZXR0eVByaW50KCksXG4gIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gIHdpbnN0b24uZm9ybWF0Lm1zKCksXG4gIHdpbnN0b24uZm9ybWF0LmVycm9ycyh7IHN0YWNrOiB0cnVlIH0pLFxuICAvLyB3aW5zdG9uLmZvcm1hdC5zcGxhdCgpLFxuICAvLyB3aW5zdG9uLmZvcm1hdC5qc29uKCksXG4gIHdpbnN0b24uZm9ybWF0LnByaW50ZigoeyBtcywgbGV2ZWwsIG1lc3NhZ2UsIHN0YWNrIH06IFRyYW5zZm9ybWFibGVJbmZvKSA9PiB7XG4gICAgbGV0IG1zZyA9IG1lc3NhZ2UgYXMgc3RyaW5nO1xuXG4gICAgLy8gQXBwZW5kIHRoZSBzdGFjayB0cmFjZSB0byB0aGUgbWVzc2FnZSBpZiBpdCBpcyBwcmVzZW50XG4gICAgaWYgKHN0YWNrKSBtc2cgKz0gYFxcbiR7c3RhY2sgYXMgc3RyaW5nfWA7XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG4gICAgY29uc3QgQU5TSV9SRUdFWCA9IC9cXHUwMDFiXFxbWzAtOV17MSwyfW0vZ2k7XG5cbiAgICByZXR1cm4gYFske2NvbG9ycy5ncmF5KCdleHByZXNzLWN1c3RvbScpfV0gJHtjb2xvcnMuY3lhbihcbiAgICAgIG1zIGFzIHN0cmluZ1xuICAgICl9IFske2xldmVsQ29sb3IobGV2ZWwucmVwbGFjZShBTlNJX1JFR0VYLCAnJykpfV06ICR7bXNnfWA7XG4gIH0pXG4pO1xuXG4vKipcbiAqIFRoZSBsb2dnZXIgaW5zdGFuY2UgLSBjb25zb2xlIHRyYW5zcG9ydHMgb25seS5cbiAqL1xuY29uc3QgbG9nZ2VyID0gd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICBsZXZlbDogJ2RlYnVnJyxcbiAgZm9ybWF0OiBjb25zb2xlRm9ybWF0LFxuICB0cmFuc3BvcnRzOiBbXG4gICAgLy8gQ29uc29sZSB0cmFuc3BvcnRcbiAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICB9KSxcbiAgXSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7XG4iXX0=