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
