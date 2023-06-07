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
exports.site = exports.cli = void 0;
const colors_1 = __importDefault(require("colors"));
const winston = __importStar(require("winston"));
exports.cli = {
    inf: colors_1.default.blue('CLI'),
    suc: colors_1.default.green('CLI'),
    err: colors_1.default.red('CLI'),
};
exports.site = {
    inf: colors_1.default.blue('SITE'),
    suc: colors_1.default.green('SITE'),
    err: colors_1.default.red('SITE'),
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
exports.default = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Jpbi91dGlscy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFFNUIsaURBQW1DO0FBRXRCLFFBQUEsR0FBRyxHQUFHO0lBQ2pCLEdBQUcsRUFBRSxnQkFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdkIsR0FBRyxFQUFFLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN4QixHQUFHLEVBQUUsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0NBQ3ZCLENBQUM7QUFFVyxRQUFBLElBQUksR0FBRztJQUNsQixHQUFHLEVBQUUsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3hCLEdBQUcsRUFBRSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDekIsR0FBRyxFQUFFLGdCQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztDQUN4QixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFDekIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFDdEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQXFCLEVBQUUsRUFBRTtJQUM5RCxJQUFJLEdBQUcsR0FBRyxPQUFpQixDQUFDO0lBQzVCLHlEQUF5RDtJQUN6RCxJQUFJLEtBQUs7UUFBRSxHQUFHLElBQUksS0FBSyxLQUFlLEVBQUUsQ0FBQztJQUN6QyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUNILENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDbEMsS0FBSyxFQUFFLE1BQU07SUFDYixNQUFNLEVBQUUsYUFBYTtJQUNyQixVQUFVLEVBQUU7UUFDVixvQkFBb0I7UUFDcEIsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUM3QixLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUM7S0FDSDtDQUNGLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb2xvcnMgZnJvbSAnY29sb3JzJztcbmltcG9ydCB7IFRyYW5zZm9ybWFibGVJbmZvIH0gZnJvbSAnbG9nZm9ybSc7XG5pbXBvcnQgKiBhcyB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuXG5leHBvcnQgY29uc3QgY2xpID0ge1xuICBpbmY6IGNvbG9ycy5ibHVlKCdDTEknKSxcbiAgc3VjOiBjb2xvcnMuZ3JlZW4oJ0NMSScpLFxuICBlcnI6IGNvbG9ycy5yZWQoJ0NMSScpLFxufTtcblxuZXhwb3J0IGNvbnN0IHNpdGUgPSB7XG4gIGluZjogY29sb3JzLmJsdWUoJ1NJVEUnKSxcbiAgc3VjOiBjb2xvcnMuZ3JlZW4oJ1NJVEUnKSxcbiAgZXJyOiBjb2xvcnMucmVkKCdTSVRFJyksXG59O1xuXG4vKipcbiAqIFRoZSBmb3JtYXQgZm9yIHRoZSBjb25zb2xlIHRyYW5zcG9ydC5cbiAqL1xuY29uc3QgY29uc29sZUZvcm1hdCA9IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXG4gIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gIHdpbnN0b24uZm9ybWF0LmVycm9ycyh7IHN0YWNrOiB0cnVlIH0pLFxuICB3aW5zdG9uLmZvcm1hdC5wcmludGYoKHsgbWVzc2FnZSwgc3RhY2sgfTogVHJhbnNmb3JtYWJsZUluZm8pID0+IHtcbiAgICBsZXQgbXNnID0gbWVzc2FnZSBhcyBzdHJpbmc7XG4gICAgLy8gQXBwZW5kIHRoZSBzdGFjayB0cmFjZSB0byB0aGUgbWVzc2FnZSBpZiBpdCBpcyBwcmVzZW50XG4gICAgaWYgKHN0YWNrKSBtc2cgKz0gYFxcbiR7c3RhY2sgYXMgc3RyaW5nfWA7XG4gICAgcmV0dXJuIG1zZztcbiAgfSlcbik7XG5cbi8qKlxuICogVGhlIGxvZ2dlciBpbnN0YW5jZSAtIGNvbnNvbGUgdHJhbnNwb3J0cyBvbmx5LlxuICovXG5jb25zdCBsb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gIGxldmVsOiAnaW5mbycsXG4gIGZvcm1hdDogY29uc29sZUZvcm1hdCxcbiAgdHJhbnNwb3J0czogW1xuICAgIC8vIENvbnNvbGUgdHJhbnNwb3J0XG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgfSksXG4gIF0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIl19