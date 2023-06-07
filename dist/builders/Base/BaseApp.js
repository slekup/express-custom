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
const express_1 = __importStar(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const PackageError_1 = __importDefault(require("@utils/PackageError"));
/**
 * The BaseApp class, used to build on top of an express app or router.
 */
class BaseApp {
    raw;
    ratelimit;
    middlewares;
    /**
     * Creates an instance of the BaseApp class.
     * Pass 'app' to create an express app, and 'router' for an express router.
     * @param type The type of the base app - 'app' or 'router'.
     */
    constructor(type = 'router') {
        if (type === 'app') {
            this.raw = (0, express_1.default)();
        }
        else {
            this.raw = (0, express_1.Router)();
        }
        this.middlewares = [];
    }
    /**
     * Sets the rate limit for the base app or router.
     * @param options The rate limit options provided by the express-rate-limit package.
     * @returns The BaseApp class.
     */
    setRateLimit(options) {
        if (this.ratelimit)
            throw new PackageError_1.default('Rate limit already set.');
        this.ratelimit = {
            statusCode: options.statusCode ?? 429,
            ...(typeof options.windowMs === 'number'
                ? { window: options.windowMs }
                : {}),
            ...(typeof options.max === 'number' ? { max: options.max } : {}),
        };
        // Use the express-rate-limit middleware.
        this.raw.use((0, express_rate_limit_1.rateLimit)(options));
        return this;
    }
    /**
     * Adds a middleware to the route. Add it before adding the route.
     * @param middleware The middleware to add to the route.
     * @returns The BaseApp class.
     */
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
        this.raw.use(middleware);
        return this;
    }
}
exports.default = BaseApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWlsZGVycy9CYXNlL0Jhc2VBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFtRDtBQUNuRCwyREFBd0Q7QUFHeEQsdUVBQStDO0FBRS9DOztHQUVHO0FBQ0gsTUFBcUIsT0FBTztJQUNuQixHQUFHLENBRWdDO0lBQ2hDLFNBQVMsQ0FBc0I7SUFDL0IsV0FBVyxDQUFlO0lBRXBDOzs7O09BSUc7SUFDSCxZQUFtQixPQUFVLFFBQWE7UUFDeEMsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUF1QyxDQUFDO1NBQzNEO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUEsZ0JBQU0sR0FBeUMsQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksWUFBWSxDQUFDLE9BQXlCO1FBQzNDLElBQUksSUFBSSxDQUFDLFNBQVM7WUFBRSxNQUFNLElBQUksc0JBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVUsSUFBSSxHQUFHO1lBQ3JDLEdBQUcsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUTtnQkFDdEMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDUCxHQUFHLENBQUMsT0FBTyxPQUFPLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDakUsQ0FBQztRQUVGLHlDQUF5QztRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLDhCQUFTLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksYUFBYSxDQUFDLFVBQXNCO1FBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBckRELDBCQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzLCB7IEV4cHJlc3MsIFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgT3B0aW9ucywgcmF0ZUxpbWl0IH0gZnJvbSAnZXhwcmVzcy1yYXRlLWxpbWl0JztcblxuaW1wb3J0IHsgTWlkZGxld2FyZSwgUmF0ZUxpbWl0IH0gZnJvbSAnQHR5cGluZ3MvY29yZSc7XG5pbXBvcnQgUGFja2FnZUVycm9yIGZyb20gJ0B1dGlscy9QYWNrYWdlRXJyb3InO1xuXG4vKipcbiAqIFRoZSBCYXNlQXBwIGNsYXNzLCB1c2VkIHRvIGJ1aWxkIG9uIHRvcCBvZiBhbiBleHByZXNzIGFwcCBvciByb3V0ZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VBcHA8VCBleHRlbmRzICdyb3V0ZXInIHwgJ2FwcCc+IHtcbiAgcHVibGljIHJhdzpcbiAgICB8IChUIGV4dGVuZHMgJ2FwcCcgPyBFeHByZXNzIDogbmV2ZXIpXG4gICAgfCAoVCBleHRlbmRzICdyb3V0ZXInID8gUm91dGVyIDogbmV2ZXIpO1xuICBwcm90ZWN0ZWQgcmF0ZWxpbWl0PzogUGFydGlhbDxSYXRlTGltaXQ+O1xuICBwcm90ZWN0ZWQgbWlkZGxld2FyZXM6IE1pZGRsZXdhcmVbXTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgQmFzZUFwcCBjbGFzcy5cbiAgICogUGFzcyAnYXBwJyB0byBjcmVhdGUgYW4gZXhwcmVzcyBhcHAsIGFuZCAncm91dGVyJyBmb3IgYW4gZXhwcmVzcyByb3V0ZXIuXG4gICAqIEBwYXJhbSB0eXBlIFRoZSB0eXBlIG9mIHRoZSBiYXNlIGFwcCAtICdhcHAnIG9yICdyb3V0ZXInLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHR5cGU6IFQgPSAncm91dGVyJyBhcyBUKSB7XG4gICAgaWYgKHR5cGUgPT09ICdhcHAnKSB7XG4gICAgICB0aGlzLnJhdyA9IGV4cHJlc3MoKSBhcyBUIGV4dGVuZHMgJ2FwcCcgPyBFeHByZXNzIDogbmV2ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmF3ID0gUm91dGVyKCkgYXMgVCBleHRlbmRzICdyb3V0ZXInID8gUm91dGVyIDogbmV2ZXI7XG4gICAgfVxuICAgIHRoaXMubWlkZGxld2FyZXMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSByYXRlIGxpbWl0IGZvciB0aGUgYmFzZSBhcHAgb3Igcm91dGVyLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgcmF0ZSBsaW1pdCBvcHRpb25zIHByb3ZpZGVkIGJ5IHRoZSBleHByZXNzLXJhdGUtbGltaXQgcGFja2FnZS5cbiAgICogQHJldHVybnMgVGhlIEJhc2VBcHAgY2xhc3MuXG4gICAqL1xuICBwdWJsaWMgc2V0UmF0ZUxpbWl0KG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4pOiB0aGlzIHtcbiAgICBpZiAodGhpcy5yYXRlbGltaXQpIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoJ1JhdGUgbGltaXQgYWxyZWFkeSBzZXQuJyk7XG5cbiAgICB0aGlzLnJhdGVsaW1pdCA9IHtcbiAgICAgIHN0YXR1c0NvZGU6IG9wdGlvbnMuc3RhdHVzQ29kZSA/PyA0MjksXG4gICAgICAuLi4odHlwZW9mIG9wdGlvbnMud2luZG93TXMgPT09ICdudW1iZXInXG4gICAgICAgID8geyB3aW5kb3c6IG9wdGlvbnMud2luZG93TXMgfVxuICAgICAgICA6IHt9KSxcbiAgICAgIC4uLih0eXBlb2Ygb3B0aW9ucy5tYXggPT09ICdudW1iZXInID8geyBtYXg6IG9wdGlvbnMubWF4IH0gOiB7fSksXG4gICAgfTtcblxuICAgIC8vIFVzZSB0aGUgZXhwcmVzcy1yYXRlLWxpbWl0IG1pZGRsZXdhcmUuXG4gICAgdGhpcy5yYXcudXNlKHJhdGVMaW1pdChvcHRpb25zKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWlkZGxld2FyZSB0byB0aGUgcm91dGUuIEFkZCBpdCBiZWZvcmUgYWRkaW5nIHRoZSByb3V0ZS5cbiAgICogQHBhcmFtIG1pZGRsZXdhcmUgVGhlIG1pZGRsZXdhcmUgdG8gYWRkIHRvIHRoZSByb3V0ZS5cbiAgICogQHJldHVybnMgVGhlIEJhc2VBcHAgY2xhc3MuXG4gICAqL1xuICBwdWJsaWMgYWRkTWlkZGxld2FyZShtaWRkbGV3YXJlOiBNaWRkbGV3YXJlKTogdGhpcyB7XG4gICAgdGhpcy5taWRkbGV3YXJlcy5wdXNoKG1pZGRsZXdhcmUpO1xuICAgIHRoaXMucmF3LnVzZShtaWRkbGV3YXJlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIl19