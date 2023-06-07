"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@utils/index");
const BaseApp_1 = __importDefault(require("./Base/BaseApp"));
const Schema_1 = __importDefault(require("./Schema"));
/**
 * The group builder class, used to build a group of routes.
 */
class GroupBuilder extends BaseApp_1.default {
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
        const constructorSchema = new Schema_1.default()
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
                throw new index_1.PackageError(`Group (${name || path}): ${result}`);
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
            throw new index_1.PackageError('No routes provided');
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
exports.default = GroupBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx3Q0FBNEM7QUFDNUMsNkRBQXFDO0FBRXJDLHNEQUFxQztBQUVyQzs7R0FFRztBQUNILE1BQXFCLFlBQWEsU0FBUSxpQkFBaUI7SUFDakQsSUFBSSxDQUFhO0lBQ2pCLElBQUksQ0FBUztJQUNiLE1BQU0sQ0FBaUI7SUFFL0I7Ozs7O09BS0c7SUFDSCxZQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQXNDO1FBQ25FLEtBQUssRUFBRSxDQUFDO1FBRVIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGdCQUFhLEVBQUU7YUFDMUMsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLEdBQUc7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNiLENBQUM7YUFDRCxTQUFTLENBQUM7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsRUFBRTtTQUNSLENBQUMsQ0FBQztRQUVMLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3pELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtnQkFDNUIsTUFBTSxJQUFJLG9CQUFZLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxNQUFNLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBQyxLQUFtQjtRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBUVgsT0FBTztZQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDMUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksb0JBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNuRCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBNUZELCtCQTRGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgeyBNaWRkbGV3YXJlLCBQYXRoU3RyaW5nLCBSYXRlTGltaXQgfSBmcm9tICdAdHlwaW5ncy9jb3JlJztcbmltcG9ydCB7IEV4cG9ydGVkR3JvdXAgfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcbmltcG9ydCB7IFBhY2thZ2VFcnJvciB9IGZyb20gJ0B1dGlscy9pbmRleCc7XG5pbXBvcnQgQmFzZUFwcCBmcm9tICcuL0Jhc2UvQmFzZUFwcCc7XG5pbXBvcnQgUm91dGVCdWlsZGVyIGZyb20gJy4vUm91dGUnO1xuaW1wb3J0IFNjaGVtYUJ1aWxkZXIgZnJvbSAnLi9TY2hlbWEnO1xuXG4vKipcbiAqIFRoZSBncm91cCBidWlsZGVyIGNsYXNzLCB1c2VkIHRvIGJ1aWxkIGEgZ3JvdXAgb2Ygcm91dGVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cEJ1aWxkZXIgZXh0ZW5kcyBCYXNlQXBwPCdyb3V0ZXInPiB7XG4gIHByaXZhdGUgcGF0aDogUGF0aFN0cmluZztcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgcm91dGVzOiBSb3V0ZUJ1aWxkZXJbXTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBncm91cCBidWlsZGVyLlxuICAgKiBAcGFyYW0gcGFyYW1zIFRoZSBncm91cCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0gcGFyYW1zLnBhdGggVGhlIHBhdGggb2YgdGhlIGdyb3VwLlxuICAgKiBAcGFyYW0gcGFyYW1zLm5hbWUgVGhlIG5hbWUgb2YgdGhlIGdyb3VwLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHsgcGF0aCwgbmFtZSB9OiB7IHBhdGg6IFBhdGhTdHJpbmc7IG5hbWU6IHN0cmluZyB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGNvbnN0IGNvbnN0cnVjdG9yU2NoZW1hID0gbmV3IFNjaGVtYUJ1aWxkZXIoKVxuICAgICAgLmFkZFN0cmluZyh7XG4gICAgICAgIG5hbWU6ICdwYXRoJyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIHRlc3Q6ICdwYXRoJyxcbiAgICAgIH0pXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDUwLFxuICAgICAgfSk7XG5cbiAgICBjb25zdHJ1Y3RvclNjaGVtYS52YWxpZGF0ZSh7IHBhdGgsIG5hbWUgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoYEdyb3VwICgke25hbWUgfHwgcGF0aH0pOiAke3Jlc3VsdH1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnJvdXRlcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXMgYSBncm91cC5cbiAgICogQHBhcmFtIHJvdXRlIFRoZSBncm91cCB0byB1c2UuXG4gICAqIEByZXR1cm5zIFRoZSBncm91cCBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZFJvdXRlKHJvdXRlOiBSb3V0ZUJ1aWxkZXIpOiB0aGlzIHtcbiAgICB0aGlzLnJvdXRlcy5wdXNoKHJvdXRlKTtcbiAgICB0aGlzLnJhdy51c2UodGhpcy5wYXRoLCByb3V0ZS5yYXcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGdyb3VwIHZhbHVlcy5cbiAgICogQHJldHVybnMgVGhlIGdyb3VwIHZhbHVlcy5cbiAgICovXG4gIHB1YmxpYyB2YWx1ZXMoKTogUmVhZG9ubHk8e1xuICAgIHJhdzogUm91dGVyO1xuICAgIHJhdGVsaW1pdD86IFBhcnRpYWw8UmF0ZUxpbWl0PjtcbiAgICBwYXRoOiBQYXRoU3RyaW5nO1xuICAgIGRlZmF1bHRDYXRlZ29yeTogc3RyaW5nO1xuICAgIHJvdXRlczogUm91dGVCdWlsZGVyW107XG4gICAgbWlkZGxld2FyZXM6IE1pZGRsZXdhcmVbXTtcbiAgfT4ge1xuICAgIHJldHVybiB7XG4gICAgICByYXc6IHRoaXMucmF3LFxuICAgICAgcmF0ZWxpbWl0OiB0aGlzLnJhdGVsaW1pdCxcbiAgICAgIHBhdGg6IHRoaXMucGF0aCxcbiAgICAgIGRlZmF1bHRDYXRlZ29yeTogdGhpcy5uYW1lLFxuICAgICAgcm91dGVzOiB0aGlzLnJvdXRlcyxcbiAgICAgIG1pZGRsZXdhcmVzOiB0aGlzLm1pZGRsZXdhcmVzLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoZSBncm91cC5cbiAgICovXG4gIHB1YmxpYyB2YWxpZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucm91dGVzLmxlbmd0aCkgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcignTm8gcm91dGVzIHByb3ZpZGVkJyk7XG5cbiAgICB0aGlzLnJvdXRlcy5mb3JFYWNoKChyb3V0ZSkgPT4gcm91dGUudmFsaWRhdGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyB0aGUgcm91dGVzIGFuZCBlbmRwb2ludHMgZGF0YS5cbiAgICogQHJldHVybnMgVGhlIGV4cG9ydGVkIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IFJlYWRvbmx5PEV4cG9ydGVkR3JvdXA+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgcGF0aDogdGhpcy5wYXRoLFxuICAgICAgcm91dGVzOiB0aGlzLnJvdXRlcy5tYXAoKHJvdXRlKSA9PiByb3V0ZS5leHBvcnQoKSksXG4gICAgfTtcbiAgfVxufVxuIl19