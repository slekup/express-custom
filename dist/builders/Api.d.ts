/// <reference types="node" />
import { Server } from 'http';
import { Config, ExportedApi } from '@typings/exports';
import BaseApp from './Base/BaseApp';
import GroupBuilder from './Group';
import StructureBuilder from './Structure';
import VersionBuilder from './Version';
/**
 * The ApiBuilder class is used to build the API.
 */
export default class Api extends BaseApp<'app'> {
    private port;
    private versions;
    private groups;
    private baseUrl;
    private structures;
    private config?;
    /**
     * The constructor of the ApiBuilder class.
     * @param options The configuration of the API.
     * @param options.url The base URL of the API.
     * @param options.port The port of the API.
     * @param options.structures The structures of the API.
     */
    constructor(options: {
        url: string;
        port: number;
        structures?: StructureBuilder[];
    });
    /**
     * Adds a version to the API.
     * @param version The version to add.
     * @returns The API builder.
     */
    addVersion(version: VersionBuilder): this;
    /**
     * Adds a group directly to the API without a version.
     * @param group An instance of the GroupBuilder class.
     * @returns The API builder.
     */
    addGroup(group: GroupBuilder): this;
    /**
     * Initializes the API.
     * @param callback The callback to run when the API is initialized.
     * @returns The server.
     */
    start(callback?: (() => void) | (() => Promise<void>)): Server;
    /**
     * Loads the configuration of the API.
     * @returns The configuration of the API.
     */
    private loadConfig;
    /**
     * Gets the configuration of the API.
     * @returns The configuration of the API.
     */
    getConfig(): Promise<Readonly<Config>>;
    /**
     * Validates the API instance.
     */
    private validate;
    /**
     * Adds a group to the API.
     * @returns The API data.
     */
    export(): Promise<Readonly<ExportedApi>>;
}
