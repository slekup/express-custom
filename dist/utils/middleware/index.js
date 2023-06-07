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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvbWlkZGxld2FyZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1REFBZ0U7QUFBdkQsb0lBQUEsT0FBTyxPQUFtQjtBQUNuQywyREFBeUQ7QUFBaEQsdUhBQUEsaUJBQWlCLE9BQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBkZWZhdWx0IGFzIGVycm9yTWlkZGxld2FyZSB9IGZyb20gJy4vZXJyb3IubWlkZGxld2FyZSc7XG5leHBvcnQgeyB3aXRoRXJyb3JIYW5kbGluZyB9IGZyb20gJy4vd3JhcHBlci5taWRkbGV3YXJlJztcbiJdfQ==