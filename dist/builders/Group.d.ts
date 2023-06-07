import { Router } from 'express';
import { Middleware, PathString, RateLimit } from '@typings/core';
import { ExportedGroup } from '@typings/exports';
import BaseApp from './Base/BaseApp';
import RouteBuilder from './Route';
/**
 * The group builder class, used to build a group of routes.
 */
export default class GroupBuilder extends BaseApp<'router'> {
    private path;
    private name;
    private routes;
    /**
     * Creates a new group builder.
     * @param params The group parameters.
     * @param params.path The path of the group.
     * @param params.name The name of the group.
     */
    constructor({ path, name }: {
        path: PathString;
        name: string;
    });
    /**
     * Uses a group.
     * @param route The group to use.
     * @returns The group builder.
     */
    addRoute(route: RouteBuilder): this;
    /**
     * Returns the group values.
     * @returns The group values.
     */
    values(): Readonly<{
        raw: Router;
        ratelimit?: Partial<RateLimit> | undefined;
        path: PathString;
        defaultCategory: string;
        routes: RouteBuilder[];
        middlewares: Middleware[];
    }>;
    /**
     * Validates the group.
     */
    validate(): void;
    /**
     * Exports the routes and endpoints data.
     * @returns The exported data.
     */
    export(): Readonly<ExportedGroup>;
}
//# sourceMappingURL=Group.d.ts.map