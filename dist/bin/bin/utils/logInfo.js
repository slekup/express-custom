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
const logger_1 = __importStar(require("./logger"));
/**
 * Log information about the process.
 * @param apiData The API data.
 * @param fileTimeStart The time the file started.
 * @param text The text to log.
 */
exports.default = (apiData, fileTimeStart, text) => {
    const fileTimeEnd = Date.now();
    const fileTime = `${fileTimeEnd - fileTimeStart}ms`;
    logger_1.default.info(`${logger_1.cli.suc} ⚡ ${text} in ${fileTime}`);
    const info = `
${colors_1.default.magenta('Name:')} ${apiData.name}  
${colors_1.default.magenta('Description:')} ${apiData.description}
${colors_1.default.magenta('Base URL:')} ${apiData.baseUrl}

${colors_1.default.cyan('Versions:')} ${apiData.versions
        .map((version) => version.version)
        .join(', ')}
${colors_1.default.cyan('Groups:')} ${apiData.versions.reduce((prev, current) => prev + current.groups.length, 0)}
${colors_1.default.cyan('Routes:')} ${apiData.versions.reduce((prev, current) => prev +
        current.groups.reduce((prev, current) => prev + current.routes.length, 0), 0)}
${colors_1.default.cyan('Endpoints:')} ${apiData.versions.reduce((prev, current) => prev +
        current.groups.reduce((prev, current) => prev +
            current.routes.reduce((prev, current) => prev + current.endpoints.length, 0), 0), 0)}
  `;
    logger_1.default.info(info);
};
