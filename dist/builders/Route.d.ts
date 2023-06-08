import { PathString } from '@typings/core';
import { ExportedRoute } from '@typings/exports';
import BaseApp from './Base/BaseApp';
import Endpoint from './Endpoint';
/**
 * The Route class, used to create a route with endpoints.
 */
export default class Route extends BaseApp<'router'> {
    private path;
    private name;
    private description;
    private endpoints;
    /**
     * Creates a new instance of the Route class.
     * @param options The options for the route.
     * @param options.path The path of the route.
     * @param options.name The name of the route.
     * @param options.description The description of the route.
     */
    constructor({ path, name, description, }: {
        path: PathString;
        name: string;
        description: string;
    });
    /**
     * Adds an endpoint to the route.
     * @param endpoint An instance of the Endpoint class.
     * @returns The current Route instance.
     */
    addEndpoint(endpoint: Endpoint): this;
    /**
     * Adds all endpoints from an endpoint file to the route.
     * @param endpointFile The endpoint file to add endpoints from.
     * @returns The current Route instance.
     */
    addEndpointFile(endpointFile: Record<string, Endpoint>): this;
    /**
     * Validates the current Route instance.
     * @throws Throws an error if the route is invalid.
     */
    validate(): void;
    /**
     * Exports the route to a JSON object.
     * @returns The exported route as a JSON object.
     */
    export(): Readonly<ExportedRoute>;
}
//# sourceMappingURL=Route.d.ts.map