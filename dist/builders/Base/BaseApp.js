import express, { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import PackageError from '@utils/PackageError';
/**
 * The BaseApp class, used to build on top of an express app or router.
 */
export default class BaseApp {
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
            this.raw = express();
        }
        else {
            this.raw = Router();
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
            throw new PackageError('Rate limit already set.');
        this.ratelimit = {
            statusCode: options.statusCode ?? 429,
            ...(typeof options.windowMs === 'number'
                ? { window: options.windowMs }
                : {}),
            ...(typeof options.max === 'number' ? { max: options.max } : {}),
        };
        // Use the express-rate-limit middleware.
        this.raw.use(rateLimit(options));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWlsZGVycy9CYXNlL0Jhc2VBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLEVBQUUsRUFBVyxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkQsT0FBTyxFQUFXLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3hELE9BQU8sWUFBWSxNQUFNLHFCQUFxQixDQUFDO0FBRS9DOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxPQUFPO0lBQ25CLEdBQUcsQ0FFZ0M7SUFDaEMsU0FBUyxDQUFzQjtJQUMvQixXQUFXLENBQWU7SUFFcEM7Ozs7T0FJRztJQUNILFlBQW1CLE9BQVUsUUFBYTtRQUN4QyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQXVDLENBQUM7U0FDM0Q7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxFQUF5QyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxZQUFZLENBQUMsT0FBeUI7UUFDM0MsSUFBSSxJQUFJLENBQUMsU0FBUztZQUFFLE1BQU0sSUFBSSxZQUFZLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2YsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksR0FBRztZQUNyQyxHQUFHLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVE7Z0JBQ3RDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1AsR0FBRyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ2pFLENBQUM7UUFFRix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFakMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGFBQWEsQ0FBQyxVQUFzQjtRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzLCB7IEV4cHJlc3MsIFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgT3B0aW9ucywgcmF0ZUxpbWl0IH0gZnJvbSAnZXhwcmVzcy1yYXRlLWxpbWl0JztcblxuaW1wb3J0IHsgTWlkZGxld2FyZSwgUmF0ZUxpbWl0IH0gZnJvbSAnQHR5cGluZ3MvY29yZSc7XG5pbXBvcnQgUGFja2FnZUVycm9yIGZyb20gJ0B1dGlscy9QYWNrYWdlRXJyb3InO1xuXG4vKipcbiAqIFRoZSBCYXNlQXBwIGNsYXNzLCB1c2VkIHRvIGJ1aWxkIG9uIHRvcCBvZiBhbiBleHByZXNzIGFwcCBvciByb3V0ZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VBcHA8VCBleHRlbmRzICdyb3V0ZXInIHwgJ2FwcCc+IHtcbiAgcHVibGljIHJhdzpcbiAgICB8IChUIGV4dGVuZHMgJ2FwcCcgPyBFeHByZXNzIDogbmV2ZXIpXG4gICAgfCAoVCBleHRlbmRzICdyb3V0ZXInID8gUm91dGVyIDogbmV2ZXIpO1xuICBwcm90ZWN0ZWQgcmF0ZWxpbWl0PzogUGFydGlhbDxSYXRlTGltaXQ+O1xuICBwcm90ZWN0ZWQgbWlkZGxld2FyZXM6IE1pZGRsZXdhcmVbXTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgQmFzZUFwcCBjbGFzcy5cbiAgICogUGFzcyAnYXBwJyB0byBjcmVhdGUgYW4gZXhwcmVzcyBhcHAsIGFuZCAncm91dGVyJyBmb3IgYW4gZXhwcmVzcyByb3V0ZXIuXG4gICAqIEBwYXJhbSB0eXBlIFRoZSB0eXBlIG9mIHRoZSBiYXNlIGFwcCAtICdhcHAnIG9yICdyb3V0ZXInLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHR5cGU6IFQgPSAncm91dGVyJyBhcyBUKSB7XG4gICAgaWYgKHR5cGUgPT09ICdhcHAnKSB7XG4gICAgICB0aGlzLnJhdyA9IGV4cHJlc3MoKSBhcyBUIGV4dGVuZHMgJ2FwcCcgPyBFeHByZXNzIDogbmV2ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmF3ID0gUm91dGVyKCkgYXMgVCBleHRlbmRzICdyb3V0ZXInID8gUm91dGVyIDogbmV2ZXI7XG4gICAgfVxuICAgIHRoaXMubWlkZGxld2FyZXMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSByYXRlIGxpbWl0IGZvciB0aGUgYmFzZSBhcHAgb3Igcm91dGVyLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgcmF0ZSBsaW1pdCBvcHRpb25zIHByb3ZpZGVkIGJ5IHRoZSBleHByZXNzLXJhdGUtbGltaXQgcGFja2FnZS5cbiAgICogQHJldHVybnMgVGhlIEJhc2VBcHAgY2xhc3MuXG4gICAqL1xuICBwdWJsaWMgc2V0UmF0ZUxpbWl0KG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4pOiB0aGlzIHtcbiAgICBpZiAodGhpcy5yYXRlbGltaXQpIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoJ1JhdGUgbGltaXQgYWxyZWFkeSBzZXQuJyk7XG5cbiAgICB0aGlzLnJhdGVsaW1pdCA9IHtcbiAgICAgIHN0YXR1c0NvZGU6IG9wdGlvbnMuc3RhdHVzQ29kZSA/PyA0MjksXG4gICAgICAuLi4odHlwZW9mIG9wdGlvbnMud2luZG93TXMgPT09ICdudW1iZXInXG4gICAgICAgID8geyB3aW5kb3c6IG9wdGlvbnMud2luZG93TXMgfVxuICAgICAgICA6IHt9KSxcbiAgICAgIC4uLih0eXBlb2Ygb3B0aW9ucy5tYXggPT09ICdudW1iZXInID8geyBtYXg6IG9wdGlvbnMubWF4IH0gOiB7fSksXG4gICAgfTtcblxuICAgIC8vIFVzZSB0aGUgZXhwcmVzcy1yYXRlLWxpbWl0IG1pZGRsZXdhcmUuXG4gICAgdGhpcy5yYXcudXNlKHJhdGVMaW1pdChvcHRpb25zKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWlkZGxld2FyZSB0byB0aGUgcm91dGUuIEFkZCBpdCBiZWZvcmUgYWRkaW5nIHRoZSByb3V0ZS5cbiAgICogQHBhcmFtIG1pZGRsZXdhcmUgVGhlIG1pZGRsZXdhcmUgdG8gYWRkIHRvIHRoZSByb3V0ZS5cbiAgICogQHJldHVybnMgVGhlIEJhc2VBcHAgY2xhc3MuXG4gICAqL1xuICBwdWJsaWMgYWRkTWlkZGxld2FyZShtaWRkbGV3YXJlOiBNaWRkbGV3YXJlKTogdGhpcyB7XG4gICAgdGhpcy5taWRkbGV3YXJlcy5wdXNoKG1pZGRsZXdhcmUpO1xuICAgIHRoaXMucmF3LnVzZShtaWRkbGV3YXJlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIl19