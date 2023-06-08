import { PackageError } from '@utils/index';
import BaseApp from './Base/BaseApp';
import Schema from './Schema';
/**
 * The Group class, used to create a group of routes.
 */
export default class Group extends BaseApp {
    path;
    name;
    routes;
    /**
     * Creates a new instance of the Group class.
     * @param options Options for the Group instance.
     * @param options.path The path of the group.
     * @param options.name The name of the group.
     */
    constructor({ path, name }) {
        super();
        // Create the schema for the constructor options.
        const constructorSchema = new Schema()
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
        // Test the the constructor against the schema.
        constructorSchema.validate({ path, name }).then((result) => {
            if (typeof result === 'string')
                throw new PackageError(`Group (${name || path}): ${result}`);
        });
        // Assign the options to the instance.
        this.path = path;
        this.name = name;
        this.routes = [];
    }
    /**
     * Adds a route to the group.
     * @param route An instance of the Route class.
     * @returns The current Group instance.
     */
    addRoute(route) {
        this.routes.push(route);
        this.raw.use(this.path, route.raw);
        return this;
    }
    /**
     * Returns the current group instance values.
     * @returns The current group instance values.
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
     * Validates the group instance and all of its routes.
     * @throws Throws an error if the group instance is invalid.
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
//# sourceMappingURL=Group.js.map