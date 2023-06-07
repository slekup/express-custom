"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = exports.Structure = exports.Schema = exports.Route = exports.Group = exports.Endpoint = exports.Api = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
var Api_1 = require("./builders/Api");
Object.defineProperty(exports, "Api", { enumerable: true, get: function () { return __importDefault(Api_1).default; } });
var Endpoint_1 = require("./builders/Endpoint");
Object.defineProperty(exports, "Endpoint", { enumerable: true, get: function () { return __importDefault(Endpoint_1).default; } });
var Group_1 = require("./builders/Group");
Object.defineProperty(exports, "Group", { enumerable: true, get: function () { return __importDefault(Group_1).default; } });
var Route_1 = require("./builders/Route");
Object.defineProperty(exports, "Route", { enumerable: true, get: function () { return __importDefault(Route_1).default; } });
var Schema_1 = require("./builders/Schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return __importDefault(Schema_1).default; } });
var Structure_1 = require("./builders/Structure");
Object.defineProperty(exports, "Structure", { enumerable: true, get: function () { return __importDefault(Structure_1).default; } });
var Version_1 = require("./builders/Version");
Object.defineProperty(exports, "Version", { enumerable: true, get: function () { return __importDefault(Version_1).default; } });
exports.default = express_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLHNEQUE4QjtBQUU5QixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLHNDQUFnRDtBQUF2QywyR0FBQSxPQUFPLE9BQU87QUFDdkIsZ0RBQTBEO0FBQWpELHFIQUFBLE9BQU8sT0FBWTtBQUM1QiwwQ0FBb0Q7QUFBM0MsK0dBQUEsT0FBTyxPQUFTO0FBQ3pCLDBDQUFvRDtBQUEzQywrR0FBQSxPQUFPLE9BQVM7QUFDekIsNENBQXNEO0FBQTdDLGlIQUFBLE9BQU8sT0FBVTtBQUMxQixrREFBNEQ7QUFBbkQsdUhBQUEsT0FBTyxPQUFhO0FBQzdCLDhDQUF3RDtBQUEvQyxtSEFBQSxPQUFPLE9BQVc7QUFJM0Isa0JBQWUsaUJBQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQXBpIH0gZnJvbSAnLi9idWlsZGVycy9BcGknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFbmRwb2ludCB9IGZyb20gJy4vYnVpbGRlcnMvRW5kcG9pbnQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHcm91cCB9IGZyb20gJy4vYnVpbGRlcnMvR3JvdXAnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBSb3V0ZSB9IGZyb20gJy4vYnVpbGRlcnMvUm91dGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTY2hlbWEgfSBmcm9tICcuL2J1aWxkZXJzL1NjaGVtYSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFN0cnVjdHVyZSB9IGZyb20gJy4vYnVpbGRlcnMvU3RydWN0dXJlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVmVyc2lvbiB9IGZyb20gJy4vYnVpbGRlcnMvVmVyc2lvbic7XG5cbmV4cG9ydCB7IENvbmZpZyB9IGZyb20gJy4vdHlwaW5ncy9leHBvcnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZXhwcmVzcztcbiJdfQ==