import { Router } from 'express';
import { Options } from 'express-rate-limit';
import { ExportedVersion } from '@typings/exports';
import BaseApp from './Base/BaseApp';
import Group from './Group';
/**
 * The Version class, used to create a version of the API.
 */
export default class Version extends BaseApp<'app'> {
    private version;
    private groups;
    /**
     * Creates a new instance of the Version class.
     * @param options The options for the Version class.
     * @param options.version The version number of the API.
     */
    constructor({ version }: {
        version: number;
    });
    /**
     * Sets the global rate limit for the version.
     * @param options The options of the rate limit.
     * @returns The current Version instance.
     */
    setRateLimit(options: Partial<Options>): this;
    /**
     * Adds a group to the version.
     * @param group An instance of the Group class.
     * @returns The current Version instance.
     */
    addGroup(group: Group): this;
    /**
     * Exports the version as a JSON object.
     * @returns The Version instance properties as a JSON object.
     */
    export(): Readonly<ExportedVersion>;
    /**
     * Gets the version values.
     * @returns The Version instance values.
     */
    values(): Readonly<{
        path: string;
        raw: Router;
        version: number;
    }>;
    /**
     * Validates the current instance of the Version class.
     * @throws Throws an error if the validation fails.
     */
    validate(): void;
}
//# sourceMappingURL=Version.d.ts.map