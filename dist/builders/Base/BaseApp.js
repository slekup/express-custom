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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWlsZGVycy9CYXNlL0Jhc2VBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLEVBQUUsRUFBVyxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkQsT0FBTyxFQUFXLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3hELE9BQU8sWUFBWSxNQUFNLHFCQUFxQixDQUFDO0FBRS9DOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxPQUFPO0lBQ25CLEdBQUcsQ0FFZ0M7SUFDaEMsU0FBUyxDQUFzQjtJQUMvQixXQUFXLENBQWU7SUFFcEM7Ozs7T0FJRztJQUNILFlBQW1CLE9BQVUsUUFBYTtRQUN4QyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQXVDLENBQUM7U0FDM0Q7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxFQUF5QyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxZQUFZLENBQUMsT0FBeUI7UUFDM0MsSUFBSSxJQUFJLENBQUMsU0FBUztZQUFFLE1BQU0sSUFBSSxZQUFZLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2YsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksR0FBRztZQUNyQyxHQUFHLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVE7Z0JBQ3RDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1AsR0FBRyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ2pFLENBQUM7UUFFRix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFakMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGFBQWEsQ0FBQyxVQUFzQjtRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzLCB7IEV4cHJlc3MsIFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBPcHRpb25zLCByYXRlTGltaXQgfSBmcm9tICdleHByZXNzLXJhdGUtbGltaXQnO1xyXG5cclxuaW1wb3J0IHsgTWlkZGxld2FyZSwgUmF0ZUxpbWl0IH0gZnJvbSAnQHR5cGluZ3MvY29yZSc7XHJcbmltcG9ydCBQYWNrYWdlRXJyb3IgZnJvbSAnQHV0aWxzL1BhY2thZ2VFcnJvcic7XHJcblxyXG4vKipcclxuICogVGhlIEJhc2VBcHAgY2xhc3MsIHVzZWQgdG8gYnVpbGQgb24gdG9wIG9mIGFuIGV4cHJlc3MgYXBwIG9yIHJvdXRlci5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VBcHA8VCBleHRlbmRzICdyb3V0ZXInIHwgJ2FwcCc+IHtcclxuICBwdWJsaWMgcmF3OlxyXG4gICAgfCAoVCBleHRlbmRzICdhcHAnID8gRXhwcmVzcyA6IG5ldmVyKVxyXG4gICAgfCAoVCBleHRlbmRzICdyb3V0ZXInID8gUm91dGVyIDogbmV2ZXIpO1xyXG4gIHByb3RlY3RlZCByYXRlbGltaXQ/OiBQYXJ0aWFsPFJhdGVMaW1pdD47XHJcbiAgcHJvdGVjdGVkIG1pZGRsZXdhcmVzOiBNaWRkbGV3YXJlW107XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIEJhc2VBcHAgY2xhc3MuXHJcbiAgICogUGFzcyAnYXBwJyB0byBjcmVhdGUgYW4gZXhwcmVzcyBhcHAsIGFuZCAncm91dGVyJyBmb3IgYW4gZXhwcmVzcyByb3V0ZXIuXHJcbiAgICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2YgdGhlIGJhc2UgYXBwIC0gJ2FwcCcgb3IgJ3JvdXRlcicuXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHR5cGU6IFQgPSAncm91dGVyJyBhcyBUKSB7XHJcbiAgICBpZiAodHlwZSA9PT0gJ2FwcCcpIHtcclxuICAgICAgdGhpcy5yYXcgPSBleHByZXNzKCkgYXMgVCBleHRlbmRzICdhcHAnID8gRXhwcmVzcyA6IG5ldmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yYXcgPSBSb3V0ZXIoKSBhcyBUIGV4dGVuZHMgJ3JvdXRlcicgPyBSb3V0ZXIgOiBuZXZlcjtcclxuICAgIH1cclxuICAgIHRoaXMubWlkZGxld2FyZXMgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHJhdGUgbGltaXQgZm9yIHRoZSBiYXNlIGFwcCBvciByb3V0ZXIuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIHJhdGUgbGltaXQgb3B0aW9ucyBwcm92aWRlZCBieSB0aGUgZXhwcmVzcy1yYXRlLWxpbWl0IHBhY2thZ2UuXHJcbiAgICogQHJldHVybnMgVGhlIEJhc2VBcHAgY2xhc3MuXHJcbiAgICovXHJcbiAgcHVibGljIHNldFJhdGVMaW1pdChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+KTogdGhpcyB7XHJcbiAgICBpZiAodGhpcy5yYXRlbGltaXQpIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoJ1JhdGUgbGltaXQgYWxyZWFkeSBzZXQuJyk7XHJcblxyXG4gICAgdGhpcy5yYXRlbGltaXQgPSB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IG9wdGlvbnMuc3RhdHVzQ29kZSA/PyA0MjksXHJcbiAgICAgIC4uLih0eXBlb2Ygb3B0aW9ucy53aW5kb3dNcyA9PT0gJ251bWJlcidcclxuICAgICAgICA/IHsgd2luZG93OiBvcHRpb25zLndpbmRvd01zIH1cclxuICAgICAgICA6IHt9KSxcclxuICAgICAgLi4uKHR5cGVvZiBvcHRpb25zLm1heCA9PT0gJ251bWJlcicgPyB7IG1heDogb3B0aW9ucy5tYXggfSA6IHt9KSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gVXNlIHRoZSBleHByZXNzLXJhdGUtbGltaXQgbWlkZGxld2FyZS5cclxuICAgIHRoaXMucmF3LnVzZShyYXRlTGltaXQob3B0aW9ucykpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIG1pZGRsZXdhcmUgdG8gdGhlIHJvdXRlLiBBZGQgaXQgYmVmb3JlIGFkZGluZyB0aGUgcm91dGUuXHJcbiAgICogQHBhcmFtIG1pZGRsZXdhcmUgVGhlIG1pZGRsZXdhcmUgdG8gYWRkIHRvIHRoZSByb3V0ZS5cclxuICAgKiBAcmV0dXJucyBUaGUgQmFzZUFwcCBjbGFzcy5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkTWlkZGxld2FyZShtaWRkbGV3YXJlOiBNaWRkbGV3YXJlKTogdGhpcyB7XHJcbiAgICB0aGlzLm1pZGRsZXdhcmVzLnB1c2gobWlkZGxld2FyZSk7XHJcbiAgICB0aGlzLnJhdy51c2UobWlkZGxld2FyZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuIl19