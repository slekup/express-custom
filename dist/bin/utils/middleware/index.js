"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorHandling = exports.errorMiddleware = void 0;
var error_middleware_1 = require("./error.middleware");
Object.defineProperty(exports, "errorMiddleware", { enumerable: true, get: function () { return __importDefault(error_middleware_1).default; } });
var wrapper_middleware_1 = require("./wrapper.middleware");
Object.defineProperty(exports, "withErrorHandling", { enumerable: true, get: function () { return wrapper_middleware_1.withErrorHandling; } });
