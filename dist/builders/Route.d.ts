import { PathString } from '@typings/core';
import { ExportedRoute } from '@typings/exports';
import BaseApp from './Base/BaseApp';
import EndpointBuilder from './Endpoint';
/**
 * The route builder class.
 */
export default class RouteBuilder extends BaseApp<'router'> {
    private path;
    private name;
    private description;
    private endpoints;
    /**
     * Creates a new route.
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
     * @param endpoint The endpoint to add to the route.
     * @returns The route builder.
     */
    addEndpoint(endpoint: EndpointBuilder): this;
    /**
     * Adds all endpoints from an endpoint file to the route.
     * @param endpointFile The endpoint file to add endpoints from.
     * @returns The route builder.
     */
    addEndpointFile(endpointFile: Record<string, EndpointBuilder>): this;
    /**
     * Validates the route.
     */
    validate(): void;
    /**
     * Exports the route.
     * @returns The exported route.
     */
    export(): Readonly<ExportedRoute>;
}
//# sourceMappingURL=Route.d.ts.map