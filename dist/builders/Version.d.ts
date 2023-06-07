import { Router } from 'express';
import { Options } from 'express-rate-limit';
import { ExportedVersion } from '@typings/exports';
import BaseApp from './Base/BaseApp';
import GroupBuilder from './Group';
/**
 * The version builder class.
 */
export default class VersionBuilder extends BaseApp<'app'> {
    private version;
    private groups;
    /**
     * Creates a new version builder.
     * @param config The configuration of the API.
     * @param config.version The version of the API.
     */
    constructor({ version }: {
        version: number;
    });
    /**
     * Sets the global rate limit for the version.
     * @param options The options of the rate limit.
     * @param showInDocs Whether to show the rate limit in the docs.
     * @returns The API builder.
     */
    setRateLimit(options: Partial<Options>, showInDocs?: boolean): this;
    /**
     * Adds a group to the API.
     * @param group The group to add.
     * @returns The API builder.
     */
    addGroup(group: GroupBuilder): this;
    /**
     * Adds a group to the API.
     * @returns The API data.
     */
    export(): Readonly<ExportedVersion>;
    /**
     * Gets the version values.
     * @returns The API data.
     */
    values(): Readonly<{
        path: string;
        raw: Router;
        version: number;
    }>;
    /**
     * Validates the version builder.
     */
    validate(): void;
}
