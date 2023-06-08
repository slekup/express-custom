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
    info: colors_1.default.blue('CLI'),
    success: colors_1.default.green('CLI'),
    warning: colors_1.default.yellow('CLI'),
    error: colors_1.default.red('CLI'),
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
