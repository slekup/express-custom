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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUlqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sT0FBTyxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sYUFBYSxNQUFNLFVBQVUsQ0FBQztBQUVyQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLE9BQWlCO0lBQ2xELEdBQUcsR0FBVyxNQUFNLEVBQUUsQ0FBQztJQUN0QixJQUFJLENBQWE7SUFDakIsSUFBSSxDQUFTO0lBQ2IsV0FBVyxDQUFTO0lBQ3BCLFNBQVMsR0FBc0IsRUFBRSxDQUFDO0lBRTFDOzs7Ozs7T0FNRztJQUNILFlBQW1CLEVBQ2pCLElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxHQUtaO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFFUixNQUFNLGlCQUFpQixHQUFHLElBQUksYUFBYSxFQUFFO2FBQzFDLFNBQVMsQ0FBQztZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDO2FBQ0QsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLEVBQUU7U0FDUixDQUFDO2FBQ0QsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLGFBQWE7WUFDbkIsUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQyxDQUFDO1FBRUwsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3RFLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtnQkFDNUIsTUFBTSxJQUFJLFlBQVksQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLE1BQU0sTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksV0FBVyxDQUFDLFFBQXlCO1FBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLGdEQUFnRDtRQUNoRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztRQUVoQyxNQUFNLEdBQUcsR0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FDM0QsZ0JBQWdCLEVBQ2hCLEdBQUcsQ0FDSixDQUFDO1FBRUYsUUFBUSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLEtBQUssS0FBSztnQkFDUixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFDUixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0QyxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEMsTUFBTTtZQUNSO2dCQUNFLE1BQU0sSUFBSSxZQUFZLENBQUMsa0JBQWtCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGVBQWUsQ0FBQyxZQUE2QztRQUNsRSxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUM3QixNQUFNLElBQUksWUFBWSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksbUJBQW1CLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQy9ELENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuXHJcbmltcG9ydCB7IFBhdGhTdHJpbmcgfSBmcm9tICdAdHlwaW5ncy9jb3JlJztcclxuaW1wb3J0IHsgRXhwb3J0ZWRSb3V0ZSB9IGZyb20gJ0B0eXBpbmdzL2V4cG9ydHMnO1xyXG5pbXBvcnQgeyBQYWNrYWdlRXJyb3IgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgQmFzZUFwcCBmcm9tICcuL0Jhc2UvQmFzZUFwcCc7XHJcbmltcG9ydCBFbmRwb2ludEJ1aWxkZXIgZnJvbSAnLi9FbmRwb2ludCc7XHJcbmltcG9ydCBTY2hlbWFCdWlsZGVyIGZyb20gJy4vU2NoZW1hJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgcm91dGUgYnVpbGRlciBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlQnVpbGRlciBleHRlbmRzIEJhc2VBcHA8J3JvdXRlcic+IHtcclxuICBwdWJsaWMgcmF3OiBSb3V0ZXIgPSBSb3V0ZXIoKTtcclxuICBwcml2YXRlIHBhdGg6IFBhdGhTdHJpbmc7XHJcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHByaXZhdGUgZW5kcG9pbnRzOiBFbmRwb2ludEJ1aWxkZXJbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IHJvdXRlLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIGZvciB0aGUgcm91dGUuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMucGF0aCBUaGUgcGF0aCBvZiB0aGUgcm91dGUuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMubmFtZSBUaGUgbmFtZSBvZiB0aGUgcm91dGUuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMuZGVzY3JpcHRpb24gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSByb3V0ZS5cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xyXG4gICAgcGF0aCxcclxuICAgIG5hbWUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICB9OiB7XHJcbiAgICBwYXRoOiBQYXRoU3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICB9KSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIGNvbnN0IGNvbnN0cnVjdG9yU2NoZW1hID0gbmV3IFNjaGVtYUJ1aWxkZXIoKVxyXG4gICAgICAuYWRkU3RyaW5nKHtcclxuICAgICAgICBuYW1lOiAncGF0aCcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgbWluOiAxLFxyXG4gICAgICAgIG1heDogMTAwLFxyXG4gICAgICAgIHRlc3Q6ICdwYXRoJyxcclxuICAgICAgfSlcclxuICAgICAgLmFkZFN0cmluZyh7XHJcbiAgICAgICAgbmFtZTogJ25hbWUnLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAgICBtYXg6IDUwLFxyXG4gICAgICB9KVxyXG4gICAgICAuYWRkU3RyaW5nKHtcclxuICAgICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAgICBtYXg6IDEwMDAsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yU2NoZW1hLnZhbGlkYXRlKHsgbmFtZSwgZGVzY3JpcHRpb24sIHBhdGggfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJylcclxuICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKGBSb3V0ZSAoJHtuYW1lIHx8IHBhdGh9KTogJHtyZXN1bHR9YCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYW4gZW5kcG9pbnQgdG8gdGhlIHJvdXRlLlxyXG4gICAqIEBwYXJhbSBlbmRwb2ludCBUaGUgZW5kcG9pbnQgdG8gYWRkIHRvIHRoZSByb3V0ZS5cclxuICAgKiBAcmV0dXJucyBUaGUgcm91dGUgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkRW5kcG9pbnQoZW5kcG9pbnQ6IEVuZHBvaW50QnVpbGRlcik6IHRoaXMge1xyXG4gICAgdGhpcy5lbmRwb2ludHMucHVzaChlbmRwb2ludCk7XHJcblxyXG4gICAgLy8gUmVwbGFjZSBtdWx0aXBsZSBzbGFzaGVzIHdpdGggYSBzaW5nbGUgc2xhc2guXHJcbiAgICBjb25zdCBkb3VibGVTbGFzaFJlZ2V4ID0gL1xcLysvZztcclxuXHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IGAke3RoaXMucGF0aH0ke2VuZHBvaW50LnBhdGh9YC5yZXBsYWNlQWxsKFxyXG4gICAgICBkb3VibGVTbGFzaFJlZ2V4LFxyXG4gICAgICAnLydcclxuICAgICk7XHJcblxyXG4gICAgc3dpdGNoIChlbmRwb2ludC5tZXRob2QpIHtcclxuICAgICAgY2FzZSAnR0VUJzpcclxuICAgICAgICB0aGlzLnJhdy5nZXQodXJsLCBlbmRwb2ludC5leGVjdXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnUE9TVCc6XHJcbiAgICAgICAgdGhpcy5yYXcucG9zdCh1cmwsIGVuZHBvaW50LmV4ZWN1dGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdQVVQnOlxyXG4gICAgICAgIHRoaXMucmF3LnB1dCh1cmwsIGVuZHBvaW50LmV4ZWN1dGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdQQVRDSCc6XHJcbiAgICAgICAgdGhpcy5yYXcucGF0Y2godXJsLCBlbmRwb2ludC5leGVjdXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnREVMRVRFJzpcclxuICAgICAgICB0aGlzLnJhdy5kZWxldGUodXJsLCBlbmRwb2ludC5leGVjdXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnT1BUSU9OUyc6XHJcbiAgICAgICAgdGhpcy5yYXcub3B0aW9ucyh1cmwsIGVuZHBvaW50LmV4ZWN1dGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoYEludmFsaWQgbWV0aG9kICR7U3RyaW5nKGVuZHBvaW50Lm1ldGhvZCl9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGFsbCBlbmRwb2ludHMgZnJvbSBhbiBlbmRwb2ludCBmaWxlIHRvIHRoZSByb3V0ZS5cclxuICAgKiBAcGFyYW0gZW5kcG9pbnRGaWxlIFRoZSBlbmRwb2ludCBmaWxlIHRvIGFkZCBlbmRwb2ludHMgZnJvbS5cclxuICAgKiBAcmV0dXJucyBUaGUgcm91dGUgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkRW5kcG9pbnRGaWxlKGVuZHBvaW50RmlsZTogUmVjb3JkPHN0cmluZywgRW5kcG9pbnRCdWlsZGVyPik6IHRoaXMge1xyXG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBPYmplY3QudmFsdWVzKGVuZHBvaW50RmlsZSkpIHtcclxuICAgICAgdGhpcy5hZGRFbmRwb2ludCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0ZXMgdGhlIHJvdXRlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB2YWxpZGF0ZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmVuZHBvaW50cy5sZW5ndGggPT09IDApXHJcbiAgICAgIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoYFJvdXRlICR7dGhpcy5uYW1lfSBoYXMgbm8gZW5kcG9pbnRzYCk7XHJcblxyXG4gICAgdGhpcy5lbmRwb2ludHMuZm9yRWFjaCgoZW5kcG9pbnQpID0+IGVuZHBvaW50LnZhbGlkYXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhwb3J0cyB0aGUgcm91dGUuXHJcbiAgICogQHJldHVybnMgVGhlIGV4cG9ydGVkIHJvdXRlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBleHBvcnQoKTogUmVhZG9ubHk8RXhwb3J0ZWRSb3V0ZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcclxuICAgICAgcGF0aDogdGhpcy5wYXRoLFxyXG4gICAgICBlbmRwb2ludHM6IHRoaXMuZW5kcG9pbnRzLm1hcCgoZW5kcG9pbnQpID0+IGVuZHBvaW50LmV4cG9ydCgpKSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==