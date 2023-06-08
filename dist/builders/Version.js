import rateLimit from 'express-rate-limit';
import ExpressCustomError from '@utils/ExpressCustomError';
import BaseApp from './Base/BaseApp';
import Schema from './Schema';
/**
 * The Version class, used to create a version of the API.
 */
export default class Version extends BaseApp {
    version;
    groups;
    /**
     * Creates a new instance of the Version class.
     * @param options The options for the Version class.
     * @param options.version The version number of the API.
     */
    constructor({ version }) {
        super('app');
        // The constructor schema.
        const constructorSchema = new Schema().addNumber({
            name: 'version',
            required: true,
            min: 1,
            max: 10_000,
        });
        // Test the the constructor against the schema.
        constructorSchema.validate({ version }).then((result) => {
            if (typeof result === 'string')
                throw new ExpressCustomError(result);
        });
        // Assign the options to the instance.
        this.groups = [];
        this.version = version;
    }
    /**
     * Sets the global rate limit for the version.
     * @param options The options of the rate limit.
     * @returns The current Version instance.
     */
    setRateLimit(options) {
        this.ratelimit = {
            statusCode: options.statusCode ?? 429,
            ...(typeof options.windowMs === 'number'
                ? { window: options.windowMs }
                : {}),
            ...(typeof options.max === 'number' ? { max: options.max } : {}),
        };
        // Use the express-rate-limit middleware.
        this.raw.use(`v${this.version}`, rateLimit(options));
        return this;
    }
    /**
     * Adds a group to the version.
     * @param group An instance of the Group class.
     * @returns The current Version instance.
     */
    addGroup(group) {
        this.groups.push(group);
        const groupValues = group.values();
        this.raw.use(groupValues.raw);
        return this;
    }
    /**
     * Exports the version as a JSON object.
     * @returns The Version instance properties as a JSON object.
     */
    export() {
        return {
            version: this.version,
            rateLimit: this.ratelimit,
            groups: this.groups.map((group) => group.export()),
        };
    }
    /**
     * Gets the version values.
     * @returns The Version instance values.
     */
    values() {
        return {
            path: `/v${this.version}`,
            raw: this.raw,
            version: this.version,
        };
    }
    /**
     * Validates the current instance of the Version class.
     * @throws Throws an error if the validation fails.
     */
    validate() {
        if (!this.groups.length)
            throw new ExpressCustomError('No groups provided');
        this.groups.forEach((group) => group.validate());
    }
}
//# sourceMappingURL=Version.js.map