import { PackageError } from '@utils/index';
import BaseApp from './Base/BaseApp';
import SchemaBuilder from './Schema';
/**
 * The group builder class, used to build a group of routes.
 */
export default class GroupBuilder extends BaseApp {
    path;
    name;
    routes;
    /**
     * Creates a new group builder.
     * @param params The group parameters.
     * @param params.path The path of the group.
     * @param params.name The name of the group.
     */
    constructor({ path, name }) {
        super();
        const constructorSchema = new SchemaBuilder()
            .addString({
            name: 'path',
            required: true,
            min: 1,
            max: 100,
            test: 'path',
        })
            .addString({
            name: 'name',
            required: true,
            min: 1,
            max: 50,
        });
        constructorSchema.validate({ path, name }).then((result) => {
            if (typeof result === 'string')
                throw new PackageError(`Group (${name || path}): ${result}`);
        });
        this.path = path;
        this.name = name;
        this.routes = [];
    }
    /**
     * Uses a group.
     * @param route The group to use.
     * @returns The group builder.
     */
    addRoute(route) {
        this.routes.push(route);
        this.raw.use(this.path, route.raw);
        return this;
    }
    /**
     * Returns the group values.
     * @returns The group values.
     */
    values() {
        return {
            raw: this.raw,
            ratelimit: this.ratelimit,
            path: this.path,
            defaultCategory: this.name,
            routes: this.routes,
            middlewares: this.middlewares,
        };
    }
    /**
     * Validates the group.
     */
    validate() {
        if (!this.routes.length)
            throw new PackageError('No routes provided');
        this.routes.forEach((route) => route.validate());
    }
    /**
     * Exports the routes and endpoints data.
     * @returns The exported data.
     */
    export() {
        return {
            name: this.name,
            path: this.path,
            routes: this.routes.map((route) => route.export()),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLGFBQWEsTUFBTSxVQUFVLENBQUM7QUFFckM7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxPQUFpQjtJQUNqRCxJQUFJLENBQWE7SUFDakIsSUFBSSxDQUFTO0lBQ2IsTUFBTSxDQUFpQjtJQUUvQjs7Ozs7T0FLRztJQUNILFlBQW1CLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBc0M7UUFDbkUsS0FBSyxFQUFFLENBQUM7UUFFUixNQUFNLGlCQUFpQixHQUFHLElBQUksYUFBYSxFQUFFO2FBQzFDLFNBQVMsQ0FBQztZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDO2FBQ0QsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLEVBQUU7U0FDUixDQUFDLENBQUM7UUFFTCxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN6RCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7Z0JBQzVCLE1BQU0sSUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxNQUFNLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBQyxLQUFtQjtRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBUVgsT0FBTztZQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDMUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ25ELENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuXHJcbmltcG9ydCB7IE1pZGRsZXdhcmUsIFBhdGhTdHJpbmcsIFJhdGVMaW1pdCB9IGZyb20gJ0B0eXBpbmdzL2NvcmUnO1xyXG5pbXBvcnQgeyBFeHBvcnRlZEdyb3VwIH0gZnJvbSAnQHR5cGluZ3MvZXhwb3J0cyc7XHJcbmltcG9ydCB7IFBhY2thZ2VFcnJvciB9IGZyb20gJ0B1dGlscy9pbmRleCc7XHJcbmltcG9ydCBCYXNlQXBwIGZyb20gJy4vQmFzZS9CYXNlQXBwJztcclxuaW1wb3J0IFJvdXRlQnVpbGRlciBmcm9tICcuL1JvdXRlJztcclxuaW1wb3J0IFNjaGVtYUJ1aWxkZXIgZnJvbSAnLi9TY2hlbWEnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBncm91cCBidWlsZGVyIGNsYXNzLCB1c2VkIHRvIGJ1aWxkIGEgZ3JvdXAgb2Ygcm91dGVzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBCdWlsZGVyIGV4dGVuZHMgQmFzZUFwcDwncm91dGVyJz4ge1xyXG4gIHByaXZhdGUgcGF0aDogUGF0aFN0cmluZztcclxuICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuICBwcml2YXRlIHJvdXRlczogUm91dGVCdWlsZGVyW107XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgZ3JvdXAgYnVpbGRlci5cclxuICAgKiBAcGFyYW0gcGFyYW1zIFRoZSBncm91cCBwYXJhbWV0ZXJzLlxyXG4gICAqIEBwYXJhbSBwYXJhbXMucGF0aCBUaGUgcGF0aCBvZiB0aGUgZ3JvdXAuXHJcbiAgICogQHBhcmFtIHBhcmFtcy5uYW1lIFRoZSBuYW1lIG9mIHRoZSBncm91cC5cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoeyBwYXRoLCBuYW1lIH06IHsgcGF0aDogUGF0aFN0cmluZzsgbmFtZTogc3RyaW5nIH0pIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgY29uc3QgY29uc3RydWN0b3JTY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpXHJcbiAgICAgIC5hZGRTdHJpbmcoe1xyXG4gICAgICAgIG5hbWU6ICdwYXRoJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiAxMDAsXHJcbiAgICAgICAgdGVzdDogJ3BhdGgnLFxyXG4gICAgICB9KVxyXG4gICAgICAuYWRkU3RyaW5nKHtcclxuICAgICAgICBuYW1lOiAnbmFtZScsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgbWluOiAxLFxyXG4gICAgICAgIG1heDogNTAsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yU2NoZW1hLnZhbGlkYXRlKHsgcGF0aCwgbmFtZSB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoYEdyb3VwICgke25hbWUgfHwgcGF0aH0pOiAke3Jlc3VsdH1gKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5yb3V0ZXMgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXMgYSBncm91cC5cclxuICAgKiBAcGFyYW0gcm91dGUgVGhlIGdyb3VwIHRvIHVzZS5cclxuICAgKiBAcmV0dXJucyBUaGUgZ3JvdXAgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkUm91dGUocm91dGU6IFJvdXRlQnVpbGRlcik6IHRoaXMge1xyXG4gICAgdGhpcy5yb3V0ZXMucHVzaChyb3V0ZSk7XHJcbiAgICB0aGlzLnJhdy51c2UodGhpcy5wYXRoLCByb3V0ZS5yYXcpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBncm91cCB2YWx1ZXMuXHJcbiAgICogQHJldHVybnMgVGhlIGdyb3VwIHZhbHVlcy5cclxuICAgKi9cclxuICBwdWJsaWMgdmFsdWVzKCk6IFJlYWRvbmx5PHtcclxuICAgIHJhdzogUm91dGVyO1xyXG4gICAgcmF0ZWxpbWl0PzogUGFydGlhbDxSYXRlTGltaXQ+O1xyXG4gICAgcGF0aDogUGF0aFN0cmluZztcclxuICAgIGRlZmF1bHRDYXRlZ29yeTogc3RyaW5nO1xyXG4gICAgcm91dGVzOiBSb3V0ZUJ1aWxkZXJbXTtcclxuICAgIG1pZGRsZXdhcmVzOiBNaWRkbGV3YXJlW107XHJcbiAgfT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmF3OiB0aGlzLnJhdyxcclxuICAgICAgcmF0ZWxpbWl0OiB0aGlzLnJhdGVsaW1pdCxcclxuICAgICAgcGF0aDogdGhpcy5wYXRoLFxyXG4gICAgICBkZWZhdWx0Q2F0ZWdvcnk6IHRoaXMubmFtZSxcclxuICAgICAgcm91dGVzOiB0aGlzLnJvdXRlcyxcclxuICAgICAgbWlkZGxld2FyZXM6IHRoaXMubWlkZGxld2FyZXMsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVmFsaWRhdGVzIHRoZSBncm91cC5cclxuICAgKi9cclxuICBwdWJsaWMgdmFsaWRhdGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMucm91dGVzLmxlbmd0aCkgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcignTm8gcm91dGVzIHByb3ZpZGVkJyk7XHJcblxyXG4gICAgdGhpcy5yb3V0ZXMuZm9yRWFjaCgocm91dGUpID0+IHJvdXRlLnZhbGlkYXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhwb3J0cyB0aGUgcm91dGVzIGFuZCBlbmRwb2ludHMgZGF0YS5cclxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgZGF0YS5cclxuICAgKi9cclxuICBwdWJsaWMgZXhwb3J0KCk6IFJlYWRvbmx5PEV4cG9ydGVkR3JvdXA+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgcGF0aDogdGhpcy5wYXRoLFxyXG4gICAgICByb3V0ZXM6IHRoaXMucm91dGVzLm1hcCgocm91dGUpID0+IHJvdXRlLmV4cG9ydCgpKSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==