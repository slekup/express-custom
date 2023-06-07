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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLGFBQWEsTUFBTSxVQUFVLENBQUM7QUFFckM7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxPQUFpQjtJQUNqRCxJQUFJLENBQWE7SUFDakIsSUFBSSxDQUFTO0lBQ2IsTUFBTSxDQUFpQjtJQUUvQjs7Ozs7T0FLRztJQUNILFlBQW1CLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBc0M7UUFDbkUsS0FBSyxFQUFFLENBQUM7UUFFUixNQUFNLGlCQUFpQixHQUFHLElBQUksYUFBYSxFQUFFO2FBQzFDLFNBQVMsQ0FBQztZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDO2FBQ0QsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLEVBQUU7U0FDUixDQUFDLENBQUM7UUFFTCxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN6RCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7Z0JBQzVCLE1BQU0sSUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxNQUFNLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBQyxLQUFtQjtRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBUVgsT0FBTztZQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDMUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ25ELENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcblxuaW1wb3J0IHsgTWlkZGxld2FyZSwgUGF0aFN0cmluZywgUmF0ZUxpbWl0IH0gZnJvbSAnQHR5cGluZ3MvY29yZSc7XG5pbXBvcnQgeyBFeHBvcnRlZEdyb3VwIH0gZnJvbSAnQHR5cGluZ3MvZXhwb3J0cyc7XG5pbXBvcnQgeyBQYWNrYWdlRXJyb3IgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xuaW1wb3J0IEJhc2VBcHAgZnJvbSAnLi9CYXNlL0Jhc2VBcHAnO1xuaW1wb3J0IFJvdXRlQnVpbGRlciBmcm9tICcuL1JvdXRlJztcbmltcG9ydCBTY2hlbWFCdWlsZGVyIGZyb20gJy4vU2NoZW1hJztcblxuLyoqXG4gKiBUaGUgZ3JvdXAgYnVpbGRlciBjbGFzcywgdXNlZCB0byBidWlsZCBhIGdyb3VwIG9mIHJvdXRlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBCdWlsZGVyIGV4dGVuZHMgQmFzZUFwcDwncm91dGVyJz4ge1xuICBwcml2YXRlIHBhdGg6IFBhdGhTdHJpbmc7XG4gIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHJvdXRlczogUm91dGVCdWlsZGVyW107XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZ3JvdXAgYnVpbGRlci5cbiAgICogQHBhcmFtIHBhcmFtcyBUaGUgZ3JvdXAgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHBhcmFtcy5wYXRoIFRoZSBwYXRoIG9mIHRoZSBncm91cC5cbiAgICogQHBhcmFtIHBhcmFtcy5uYW1lIFRoZSBuYW1lIG9mIHRoZSBncm91cC5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7IHBhdGgsIG5hbWUgfTogeyBwYXRoOiBQYXRoU3RyaW5nOyBuYW1lOiBzdHJpbmcgfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCBjb25zdHJ1Y3RvclNjaGVtYSA9IG5ldyBTY2hlbWFCdWlsZGVyKClcbiAgICAgIC5hZGRTdHJpbmcoe1xuICAgICAgICBuYW1lOiAncGF0aCcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIG1heDogMTAwLFxuICAgICAgICB0ZXN0OiAncGF0aCcsXG4gICAgICB9KVxuICAgICAgLmFkZFN0cmluZyh7XG4gICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiA1MCxcbiAgICAgIH0pO1xuXG4gICAgY29uc3RydWN0b3JTY2hlbWEudmFsaWRhdGUoeyBwYXRoLCBuYW1lIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGBHcm91cCAoJHtuYW1lIHx8IHBhdGh9KTogJHtyZXN1bHR9YCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5yb3V0ZXMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VzIGEgZ3JvdXAuXG4gICAqIEBwYXJhbSByb3V0ZSBUaGUgZ3JvdXAgdG8gdXNlLlxuICAgKiBAcmV0dXJucyBUaGUgZ3JvdXAgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBhZGRSb3V0ZShyb3V0ZTogUm91dGVCdWlsZGVyKTogdGhpcyB7XG4gICAgdGhpcy5yb3V0ZXMucHVzaChyb3V0ZSk7XG4gICAgdGhpcy5yYXcudXNlKHRoaXMucGF0aCwgcm91dGUucmF3KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBncm91cCB2YWx1ZXMuXG4gICAqIEByZXR1cm5zIFRoZSBncm91cCB2YWx1ZXMuXG4gICAqL1xuICBwdWJsaWMgdmFsdWVzKCk6IFJlYWRvbmx5PHtcbiAgICByYXc6IFJvdXRlcjtcbiAgICByYXRlbGltaXQ/OiBQYXJ0aWFsPFJhdGVMaW1pdD47XG4gICAgcGF0aDogUGF0aFN0cmluZztcbiAgICBkZWZhdWx0Q2F0ZWdvcnk6IHN0cmluZztcbiAgICByb3V0ZXM6IFJvdXRlQnVpbGRlcltdO1xuICAgIG1pZGRsZXdhcmVzOiBNaWRkbGV3YXJlW107XG4gIH0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcmF3OiB0aGlzLnJhdyxcbiAgICAgIHJhdGVsaW1pdDogdGhpcy5yYXRlbGltaXQsXG4gICAgICBwYXRoOiB0aGlzLnBhdGgsXG4gICAgICBkZWZhdWx0Q2F0ZWdvcnk6IHRoaXMubmFtZSxcbiAgICAgIHJvdXRlczogdGhpcy5yb3V0ZXMsXG4gICAgICBtaWRkbGV3YXJlczogdGhpcy5taWRkbGV3YXJlcyxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgZ3JvdXAuXG4gICAqL1xuICBwdWJsaWMgdmFsaWRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJvdXRlcy5sZW5ndGgpIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoJ05vIHJvdXRlcyBwcm92aWRlZCcpO1xuXG4gICAgdGhpcy5yb3V0ZXMuZm9yRWFjaCgocm91dGUpID0+IHJvdXRlLnZhbGlkYXRlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHJvdXRlcyBhbmQgZW5kcG9pbnRzIGRhdGEuXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCBkYXRhLlxuICAgKi9cbiAgcHVibGljIGV4cG9ydCgpOiBSZWFkb25seTxFeHBvcnRlZEdyb3VwPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIHBhdGg6IHRoaXMucGF0aCxcbiAgICAgIHJvdXRlczogdGhpcy5yb3V0ZXMubWFwKChyb3V0ZSkgPT4gcm91dGUuZXhwb3J0KCkpLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==