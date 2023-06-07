"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("@utils/index");
const BaseApp_1 = __importDefault(require("./Base/BaseApp"));
const Schema_1 = __importDefault(require("./Schema"));
/**
 * The route builder class.
 */
class RouteBuilder extends BaseApp_1.default {
    raw = (0, express_1.Router)();
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
        })
            .addString({
            name: 'description',
            required: true,
            min: 1,
            max: 1000,
        });
        constructorSchema.validate({ name, description, path }).then((result) => {
            if (typeof result === 'string')
                throw new index_1.PackageError(`Route (${name || path}): ${result}`);
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
                throw new index_1.PackageError(`Invalid method ${String(endpoint.method)}`);
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
            throw new index_1.PackageError(`Route ${this.name} has no endpoints`);
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
exports.default = RouteBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBaUM7QUFJakMsd0NBQTRDO0FBQzVDLDZEQUFxQztBQUVyQyxzREFBcUM7QUFFckM7O0dBRUc7QUFDSCxNQUFxQixZQUFhLFNBQVEsaUJBQWlCO0lBQ2xELEdBQUcsR0FBVyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztJQUN0QixJQUFJLENBQWE7SUFDakIsSUFBSSxDQUFTO0lBQ2IsV0FBVyxDQUFTO0lBQ3BCLFNBQVMsR0FBc0IsRUFBRSxDQUFDO0lBRTFDOzs7Ozs7T0FNRztJQUNILFlBQW1CLEVBQ2pCLElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxHQUtaO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFFUixNQUFNLGlCQUFpQixHQUFHLElBQUksZ0JBQWEsRUFBRTthQUMxQyxTQUFTLENBQUM7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQzthQUNELFNBQVMsQ0FBQztZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxFQUFFO1NBQ1IsQ0FBQzthQUNELFNBQVMsQ0FBQztZQUNULElBQUksRUFBRSxhQUFhO1lBQ25CLFFBQVEsRUFBRSxJQUFJO1lBQ2QsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsSUFBSTtTQUNWLENBQUMsQ0FBQztRQUVMLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN0RSxJQUFJLE9BQU8s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QUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMvRCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBcklELCtCQXFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgeyBQYXRoU3RyaW5nIH0gZnJvbSAnQHR5cGluZ3MvY29yZSc7XG5pbXBvcnQgeyBFeHBvcnRlZFJvdXRlIH0gZnJvbSAnQHR5cGluZ3MvZXhwb3J0cyc7XG5pbXBvcnQgeyBQYWNrYWdlRXJyb3IgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xuaW1wb3J0IEJhc2VBcHAgZnJvbSAnLi9CYXNlL0Jhc2VBcHAnO1xuaW1wb3J0IEVuZHBvaW50QnVpbGRlciBmcm9tICcuL0VuZHBvaW50JztcbmltcG9ydCBTY2hlbWFCdWlsZGVyIGZyb20gJy4vU2NoZW1hJztcblxuLyoqXG4gKiBUaGUgcm91dGUgYnVpbGRlciBjbGFzcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVCdWlsZGVyIGV4dGVuZHMgQmFzZUFwcDwncm91dGVyJz4ge1xuICBwdWJsaWMgcmF3OiBSb3V0ZXIgPSBSb3V0ZXIoKTtcbiAgcHJpdmF0ZSBwYXRoOiBQYXRoU3RyaW5nO1xuICBwcml2YXRlIG5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwcml2YXRlIGVuZHBvaW50czogRW5kcG9pbnRCdWlsZGVyW10gPSBbXTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyByb3V0ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIHRoZSByb3V0ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMucGF0aCBUaGUgcGF0aCBvZiB0aGUgcm91dGUuXG4gICAqIEBwYXJhbSBvcHRpb25zLm5hbWUgVGhlIG5hbWUgb2YgdGhlIHJvdXRlLlxuICAgKiBAcGFyYW0gb3B0aW9ucy5kZXNjcmlwdGlvbiBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIHJvdXRlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBwYXRoLFxuICAgIG5hbWUsXG4gICAgZGVzY3JpcHRpb24sXG4gIH06IHtcbiAgICBwYXRoOiBQYXRoU3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICB9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGNvbnN0IGNvbnN0cnVjdG9yU2NoZW1hID0gbmV3IFNjaGVtYUJ1aWxkZXIoKVxuICAgICAgLmFkZFN0cmluZyh7XG4gICAgICAgIG5hbWU6ICdwYXRoJyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIHRlc3Q6ICdwYXRoJyxcbiAgICAgIH0pXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDUwLFxuICAgICAgfSlcbiAgICAgIC5hZGRTdHJpbmcoe1xuICAgICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDEwMDAsXG4gICAgICB9KTtcblxuICAgIGNvbnN0cnVjdG9yU2NoZW1hLnZhbGlkYXRlKHsgbmFtZSwgZGVzY3JpcHRpb24sIHBhdGggfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoYFJvdXRlICgke25hbWUgfHwgcGF0aH0pOiAke3Jlc3VsdH1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBlbmRwb2ludCB0byB0aGUgcm91dGUuXG4gICAqIEBwYXJhbSBlbmRwb2ludCBUaGUgZW5kcG9pbnQgdG8gYWRkIHRvIHRoZSByb3V0ZS5cbiAgICogQHJldHVybnMgVGhlIHJvdXRlIGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgYWRkRW5kcG9pbnQoZW5kcG9pbnQ6IEVuZHBvaW50QnVpbGRlcik6IHRoaXMge1xuICAgIHRoaXMuZW5kcG9pbnRzLnB1c2goZW5kcG9pbnQpO1xuXG4gICAgLy8gUmVwbGFjZSBtdWx0aXBsZSBzbGFzaGVzIHdpdGggYSBzaW5nbGUgc2xhc2guXG4gICAgY29uc3QgZG91YmxlU2xhc2hSZWdleCA9IC9cXC8rL2c7XG5cbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IGAke3RoaXMucGF0aH0ke2VuZHBvaW50LnBhdGh9YC5yZXBsYWNlQWxsKFxuICAgICAgZG91YmxlU2xhc2hSZWdleCxcbiAgICAgICcvJ1xuICAgICk7XG5cbiAgICBzd2l0Y2ggKGVuZHBvaW50Lm1ldGhvZCkge1xuICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgdGhpcy5yYXcuZ2V0KHVybCwgZW5kcG9pbnQuZXhlY3V0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUE9TVCc6XG4gICAgICAgIHRoaXMucmF3LnBvc3QodXJsLCBlbmRwb2ludC5leGVjdXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQVVQnOlxuICAgICAgICB0aGlzLnJhdy5wdXQodXJsLCBlbmRwb2ludC5leGVjdXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQQVRDSCc6XG4gICAgICAgIHRoaXMucmF3LnBhdGNoKHVybCwgZW5kcG9pbnQuZXhlY3V0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnREVMRVRFJzpcbiAgICAgICAgdGhpcy5yYXcuZGVsZXRlKHVybCwgZW5kcG9pbnQuZXhlY3V0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnT1BUSU9OUyc6XG4gICAgICAgIHRoaXMucmF3Lm9wdGlvbnModXJsLCBlbmRwb2ludC5leGVjdXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGBJbnZhbGlkIG1ldGhvZCAke1N0cmluZyhlbmRwb2ludC5tZXRob2QpfWApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYWxsIGVuZHBvaW50cyBmcm9tIGFuIGVuZHBvaW50IGZpbGUgdG8gdGhlIHJvdXRlLlxuICAgKiBAcGFyYW0gZW5kcG9pbnRGaWxlIFRoZSBlbmRwb2ludCBmaWxlIHRvIGFkZCBlbmRwb2ludHMgZnJvbS5cbiAgICogQHJldHVybnMgVGhlIHJvdXRlIGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgYWRkRW5kcG9pbnRGaWxlKGVuZHBvaW50RmlsZTogUmVjb3JkPHN0cmluZywgRW5kcG9pbnRCdWlsZGVyPik6IHRoaXMge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgT2JqZWN0LnZhbHVlcyhlbmRwb2ludEZpbGUpKSB7XG4gICAgICB0aGlzLmFkZEVuZHBvaW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgdGhlIHJvdXRlLlxuICAgKi9cbiAgcHVibGljIHZhbGlkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVuZHBvaW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGBSb3V0ZSAke3RoaXMubmFtZX0gaGFzIG5vIGVuZHBvaW50c2ApO1xuXG4gICAgdGhpcy5lbmRwb2ludHMuZm9yRWFjaCgoZW5kcG9pbnQpID0+IGVuZHBvaW50LnZhbGlkYXRlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHJvdXRlLlxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgcm91dGUuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IFJlYWRvbmx5PEV4cG9ydGVkUm91dGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBwYXRoOiB0aGlzLnBhdGgsXG4gICAgICBlbmRwb2ludHM6IHRoaXMuZW5kcG9pbnRzLm1hcCgoZW5kcG9pbnQpID0+IGVuZHBvaW50LmV4cG9ydCgpKSxcbiAgICB9O1xuICB9XG59XG4iXX0=