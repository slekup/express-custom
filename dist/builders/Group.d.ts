import { Router } from 'express';
import { Middleware, PathString, RateLimit } from '@typings/core';
import { ExportedGroup } from '@typings/exports';
import BaseApp from './Base/BaseApp';
import Route from './Route';
/**
 * The Group class, used to create a group of routes.
 */
export default class Group extends BaseApp<'router'> {
    private path;
    private name;
    private routes;
    /**
     * Creates a new instance of the Group class.
     * @param options Options for the Group instance.
     * @param options.path The path of the group.
     * @param options.name The name of the group.
     */
    constructor({ path, name }: {
        path: PathString;
        name: string;
    });
    /**
     * Adds a route to the group.
     * @param route An instance of the Route class.
     * @returns The current Group instance.
     */
    addRoute(route: Route): this;
    /**
     * Returns the current group instance values.
     * @returns The current group instance values.
     */
    values(): Readonly<{
        raw: Router;
        ratelimit?: Partial<RateLimit> | undefined;
        path: PathString;
        defaultCategory: string;
        routes: Route[];
        middlewares: Middleware[];
    }>;
    /**
     * Validates the group instance and all of its routes.
     * @throws Throws an error if the group instance is invalid.
     */
    validate(): void;
    /**
     * Exports the routes and endpoints data.
     * @returns The exported data.
     */
    export(): Readonly<ExportedGroup>;
}
//# sourceMappingURL=Group.d.ts.map