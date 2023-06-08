/// <reference types="node" />
import { Server } from 'http';
import { Config, ExportedApi } from '@typings/exports';
import BaseApp from './Base/BaseApp';
import Group from './Group';
import Structure from './Structure';
import Version from './Version';
/**
 * The ApiBuilder class, used to build an API.
 */
export default class Api extends BaseApp<'app'> {
    private port;
    private versions;
    private groups;
    private url;
    private structures;
    private config?;
    /**
     * Creates a new instance of the ApiBuilder class.
     * @param options The ApiBuilder class options.
     * @param options.url The Base URL of the API to as the root (reference) for the API.
     * @param options.port The port the API will listen on when running the start() method.
     * @param options.structures The structures used in the API endpoint schemas.
     */
    constructor(options: {
        url: string;
        port: number;
        structures?: Structure[];
    });
    /**
     * Adds a version to the API.
     * @param version An instance of the Version class.
     * @returns The current Api instance.
     */
    addVersion(version: Version): this;
    /**
     * Adds a group directly to the API without a version.
     * @param group An instance of the Group class.
     * @returns The current Api instance.
     */
    addGroup(group: Group): this;
    /**
     * Starts the API server.
     * @param callback The callback function to run when the API is initialized. Can be async.
     * @returns The HTTP server (http.Server).
     */
    start(callback?: (() => void) | (() => Promise<void>)): Server;
    /**
     * Loads the configuration of the API from express-custom.json or package.json > "express-custom".
     * @returns The configuration of the API.
     */
    private loadConfig;
    /**
     * Gets the configuration of the API.
     * @returns The configuration of the API.
     */
    getConfig(): Promise<Readonly<Config>>;
    /**
     * Validates the API instance and all of it's children instances.
     * @throws An error if the API instance or any of it's children instances are invalid.
     */
    private validate;
    /**
     * Exports the Api class properties to a JSON object.
     * @returns The exported API as a JSON object.
     */
    export(): Promise<Readonly<ExportedApi>>;
}
//# sourceMappingURL=Api.d.ts.map