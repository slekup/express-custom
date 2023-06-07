import { Router } from 'express';
import { PackageError } from '@utils/index';
import BaseApp from './Base/BaseApp';
import SchemaBuilder from './Schema';
/**
 * The route builder class.
 */
export default class RouteBuilder extends BaseApp {
    raw = Router();
    path;
    name;
    description;
    endpoints = [];
    /**
     * Creates a new route.
     * @param options The options for the route.
     * @param options.path The path of the route.
     * @param options.name The name of the route.
     * @param options.description The description of the route.
     */
    constructor({ path, name, description, }) {
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
        })
            .addString({
            name: 'description',
            required: true,
            min: 1,
            max: 1000,
        });
        constructorSchema.validate({ name, description, path }).then((result) => {
            if (typeof result === 'string')
                throw new PackageError(`Route (${name || path}): ${result}`);
        });
        this.path = path;
        this.name = name;
        this.description = description;
    }
    /**
     * Adds an endpoint to the route.
     * @param endpoint The endpoint to add to the route.
     * @returns The route builder.
     */
    addEndpoint(endpoint) {
        this.endpoints.push(endpoint);
        // Replace multiple slashes with a single slash.
        const doubleSlashRegex = /\/+/g;
        const url = `${this.path}${endpoint.path}`.replaceAll(doubleSlashRegex, '/');
        switch (endpoint.method) {
            case 'GET':
                this.raw.get(url, endpoint.execute);
                break;
            case 'POST':
                this.raw.post(url, endpoint.execute);
                break;
            case 'PUT':
                this.raw.put(url, endpoint.execute);
                break;
            case 'PATCH':
                this.raw.patch(url, endpoint.execute);
                break;
            case 'DELETE':
                this.raw.delete(url, endpoint.execute);
                break;
            case 'OPTIONS':
                this.raw.options(url, endpoint.execute);
                break;
            default:
                throw new PackageError(`Invalid method ${String(endpoint.method)}`);
        }
        return this;
    }
    /**
     * Adds all endpoints from an endpoint file to the route.
     * @param endpointFile The endpoint file to add endpoints from.
     * @returns The route builder.
     */
    addEndpointFile(endpointFile) {
        for (const value of Object.values(endpointFile)) {
            this.addEndpoint(value);
        }
        return this;
    }
    /**
     * Validates the route.
     */
    validate() {
        if (this.endpoints.length === 0)
            throw new PackageError(`Route ${this.name} has no endpoints`);
        this.endpoints.forEach((endpoint) => endpoint.validate());
    }
    /**
     * Exports the route.
     * @returns The exported route.
     */
    export() {
        return {
            name: this.name,
            description: this.description,
            path: this.path,
            endpoints: this.endpoints.map((endpoint) => endpoint.export()),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUlqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sT0FBTyxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sYUFBYSxNQUFNLFVBQVUsQ0FBQztBQUVyQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLE9BQWlCO0lBQ2xELEdBQUcsR0FBVyxNQUFNLEVBQUUsQ0FBQztJQUN0QixJQUFJLENBQWE7SUFDakIsSUFBSSxDQUFTO0lBQ2IsV0FBVyxDQUFTO0lBQ3BCLFNBQVMsR0FBc0IsRUFBRSxDQUFDO0lBRTFDOzs7Ozs7T0FNRztJQUNILFlBQW1CLEVBQ2pCLElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxHQUtaO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFFUixNQUFNLGlCQUFpQixHQUFHLElBQUksYUFBYSxFQUFFO2FBQzFDLFNBQVMsQ0FBQztZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDO2FBQ0QsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLEVBQUU7U0FDUixDQUFDO2FBQ0QsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLGFBQWE7WUFDbkIsUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQyxDQUFDO1FBRUwsaUJBQWlCLENBQUMsUUFBUSxD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LElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQy9ELENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcblxuaW1wb3J0IHsgUGF0aFN0cmluZyB9IGZyb20gJ0B0eXBpbmdzL2NvcmUnO1xuaW1wb3J0IHsgRXhwb3J0ZWRSb3V0ZSB9IGZyb20gJ0B0eXBpbmdzL2V4cG9ydHMnO1xuaW1wb3J0IHsgUGFja2FnZUVycm9yIH0gZnJvbSAnQHV0aWxzL2luZGV4JztcbmltcG9ydCBCYXNlQXBwIGZyb20gJy4vQmFzZS9CYXNlQXBwJztcbmltcG9ydCBFbmRwb2ludEJ1aWxkZXIgZnJvbSAnLi9FbmRwb2ludCc7XG5pbXBvcnQgU2NoZW1hQnVpbGRlciBmcm9tICcuL1NjaGVtYSc7XG5cbi8qKlxuICogVGhlIHJvdXRlIGJ1aWxkZXIgY2xhc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlQnVpbGRlciBleHRlbmRzIEJhc2VBcHA8J3JvdXRlcic+IHtcbiAgcHVibGljIHJhdzogUm91dGVyID0gUm91dGVyKCk7XG4gIHByaXZhdGUgcGF0aDogUGF0aFN0cmluZztcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcHJpdmF0ZSBlbmRwb2ludHM6IEVuZHBvaW50QnVpbGRlcltdID0gW107XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgcm91dGUuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIGZvciB0aGUgcm91dGUuXG4gICAqIEBwYXJhbSBvcHRpb25zLnBhdGggVGhlIHBhdGggb2YgdGhlIHJvdXRlLlxuICAgKiBAcGFyYW0gb3B0aW9ucy5uYW1lIFRoZSBuYW1lIG9mIHRoZSByb3V0ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMuZGVzY3JpcHRpb24gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSByb3V0ZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgcGF0aCxcbiAgICBuYW1lLFxuICAgIGRlc2NyaXB0aW9uLFxuICB9OiB7XG4gICAgcGF0aDogUGF0aFN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCBjb25zdHJ1Y3RvclNjaGVtYSA9IG5ldyBTY2hlbWFCdWlsZGVyKClcbiAgICAgIC5hZGRTdHJpbmcoe1xuICAgICAgICBuYW1lOiAncGF0aCcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIG1heDogMTAwLFxuICAgICAgICB0ZXN0OiAncGF0aCcsXG4gICAgICB9KVxuICAgICAgLmFkZFN0cmluZyh7XG4gICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiA1MCxcbiAgICAgIH0pXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiAxMDAwLFxuICAgICAgfSk7XG5cbiAgICBjb25zdHJ1Y3RvclNjaGVtYS52YWxpZGF0ZSh7IG5hbWUsIGRlc2NyaXB0aW9uLCBwYXRoIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGBSb3V0ZSAoJHtuYW1lIHx8IHBhdGh9KTogJHtyZXN1bHR9YCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZW5kcG9pbnQgdG8gdGhlIHJvdXRlLlxuICAgKiBAcGFyYW0gZW5kcG9pbnQgVGhlIGVuZHBvaW50IHRvIGFkZCB0byB0aGUgcm91dGUuXG4gICAqIEByZXR1cm5zIFRoZSByb3V0ZSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZEVuZHBvaW50KGVuZHBvaW50OiBFbmRwb2ludEJ1aWxkZXIpOiB0aGlzIHtcbiAgICB0aGlzLmVuZHBvaW50cy5wdXNoKGVuZHBvaW50KTtcblxuICAgIC8vIFJlcGxhY2UgbXVsdGlwbGUgc2xhc2hlcyB3aXRoIGEgc2luZ2xlIHNsYXNoLlxuICAgIGNvbnN0IGRvdWJsZVNsYXNoUmVnZXggPSAvXFwvKy9nO1xuXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSBgJHt0aGlzLnBhdGh9JHtlbmRwb2ludC5wYXRofWAucmVwbGFjZUFsbChcbiAgICAgIGRvdWJsZVNsYXNoUmVnZXgsXG4gICAgICAnLydcbiAgICApO1xuXG4gICAgc3dpdGNoIChlbmRwb2ludC5tZXRob2QpIHtcbiAgICAgIGNhc2UgJ0dFVCc6XG4gICAgICAgIHRoaXMucmF3LmdldCh1cmwsIGVuZHBvaW50LmV4ZWN1dGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BPU1QnOlxuICAgICAgICB0aGlzLnJhdy5wb3N0KHVybCwgZW5kcG9pbnQuZXhlY3V0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUFVUJzpcbiAgICAgICAgdGhpcy5yYXcucHV0KHVybCwgZW5kcG9pbnQuZXhlY3V0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUEFUQ0gnOlxuICAgICAgICB0aGlzLnJhdy5wYXRjaCh1cmwsIGVuZHBvaW50LmV4ZWN1dGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RFTEVURSc6XG4gICAgICAgIHRoaXMucmF3LmRlbGV0ZSh1cmwsIGVuZHBvaW50LmV4ZWN1dGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ09QVElPTlMnOlxuICAgICAgICB0aGlzLnJhdy5vcHRpb25zKHVybCwgZW5kcG9pbnQuZXhlY3V0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcihgSW52YWxpZCBtZXRob2QgJHtTdHJpbmcoZW5kcG9pbnQubWV0aG9kKX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFsbCBlbmRwb2ludHMgZnJvbSBhbiBlbmRwb2ludCBmaWxlIHRvIHRoZSByb3V0ZS5cbiAgICogQHBhcmFtIGVuZHBvaW50RmlsZSBUaGUgZW5kcG9pbnQgZmlsZSB0byBhZGQgZW5kcG9pbnRzIGZyb20uXG4gICAqIEByZXR1cm5zIFRoZSByb3V0ZSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZEVuZHBvaW50RmlsZShlbmRwb2ludEZpbGU6IFJlY29yZDxzdHJpbmcsIEVuZHBvaW50QnVpbGRlcj4pOiB0aGlzIHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIE9iamVjdC52YWx1ZXMoZW5kcG9pbnRGaWxlKSkge1xuICAgICAgdGhpcy5hZGRFbmRwb2ludCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoZSByb3V0ZS5cbiAgICovXG4gIHB1YmxpYyB2YWxpZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbmRwb2ludHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcihgUm91dGUgJHt0aGlzLm5hbWV9IGhhcyBubyBlbmRwb2ludHNgKTtcblxuICAgIHRoaXMuZW5kcG9pbnRzLmZvckVhY2goKGVuZHBvaW50KSA9PiBlbmRwb2ludC52YWxpZGF0ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIHRoZSByb3V0ZS5cbiAgICogQHJldHVybnMgVGhlIGV4cG9ydGVkIHJvdXRlLlxuICAgKi9cbiAgcHVibGljIGV4cG9ydCgpOiBSZWFkb25seTxFeHBvcnRlZFJvdXRlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgcGF0aDogdGhpcy5wYXRoLFxuICAgICAgZW5kcG9pbnRzOiB0aGlzLmVuZHBvaW50cy5tYXAoKGVuZHBvaW50KSA9PiBlbmRwb2ludC5leHBvcnQoKSksXG4gICAgfTtcbiAgfVxufVxuIl19