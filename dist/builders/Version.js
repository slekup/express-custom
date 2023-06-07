"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const PackageError_1 = __importDefault(require("@utils/PackageError"));
const BaseApp_1 = __importDefault(require("./Base/BaseApp"));
const Schema_1 = __importDefault(require("./Schema"));
/**
 * The version builder class.
 */
class VersionBuilder extends BaseApp_1.default {
    version;
    groups;
    /**
     * Creates a new version builder.
     * @param config The configuration of the API.
     * @param config.version The version of the API.
     */
    constructor({ version }) {
        super('app');
        const constructorSchema = new Schema_1.default().addNumber({
            name: 'version',
            required: true,
            min: 1,
            max: 10_000,
        });
        constructorSchema.validate({ version }).then((result) => {
            if (typeof result === 'string')
                throw new PackageError_1.default(result);
        });
        this.groups = [];
        this.version = version;
    }
    /**
     * Sets the global rate limit for the version.
     * @param options The options of the rate limit.
     * @param showInDocs Whether to show the rate limit in the docs.
     * @returns The API builder.
     */
    setRateLimit(options, showInDocs) {
        // If showInDocs is undefined, it will default to true.
        if (showInDocs || showInDocs === undefined)
            this.ratelimit = {
                statusCode: options.statusCode ?? 429,
                ...(typeof options.windowMs === 'number'
                    ? { window: options.windowMs }
                    : {}),
                ...(typeof options.max === 'number' ? { max: options.max } : {}),
            };
        // Use the express-rate-limit middleware.
        this.raw.use(`v${this.version}`, (0, express_rate_limit_1.default)(options));
        return this;
    }
    /**
     * Adds a group to the API.
     * @param group The group to add.
     * @returns The API builder.
     */
    addGroup(group) {
        this.groups.push(group);
        const groupValues = group.values();
        this.raw.use(`v${this.version}`, groupValues.raw);
        return this;
    }
    /**
     * Adds a group to the API.
     * @returns The API data.
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
     * @returns The API data.
     */
    values() {
        return {
            path: `/v${this.version}`,
            raw: this.raw,
            version: this.version,
        };
    }
    /**
     * Validates the version builder.
     */
    validate() {
        if (!this.groups.length)
            throw new PackageError_1.default('No groups provided');
        this.groups.forEach((group) => group.validate());
    }
}
exports.default = VersionBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWlsZGVycy9WZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNEVBQXdEO0FBR3hELHVFQUErQztBQUMvQyw2REFBcUM7QUFFckMsc0RBQXFDO0FBRXJDOztHQUVHO0FBQ0gsTUFBcUIsY0FBZSxTQUFRLGlCQUFjO0lBQ2hELE9BQU8sQ0FBUztJQUNoQixNQUFNLENBQWlCO0lBRS9COzs7O09BSUc7SUFDSCxZQUFtQixFQUFFLE9BQU8sRUFBdUI7UUFDakQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGdCQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDdEQsSUFBSSxFQUFFLFNBQVM7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLE1BQU07U0FDWixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3RELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtnQkFBRSxNQUFNLElBQUksc0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFlBQVksQ0FBQyxPQUF5QixFQUFFLFVBQW9CO1FBQ2pFLHVEQUF1RDtRQUN2RCxJQUFJLFVBQVUsSUFBSSxVQUFVLEtBQUssU0FBUztZQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHO2dCQUNmLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVSxJQUFJLEdBQUc7Z0JBQ3JDLEdBQUcsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUTtvQkFDdEMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7b0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ1AsR0FBRyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ2pFLENBQUM7UUFFSix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBQSw0QkFBUyxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFckQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBQyxLQUFtQjtRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNuRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFLWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN6QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLHNCQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNGO0FBakdELGlDQWlHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHJhdGVMaW1pdCwgeyBPcHRpb25zIH0gZnJvbSAnZXhwcmVzcy1yYXRlLWxpbWl0JztcblxuaW1wb3J0IHsgRXhwb3J0ZWRWZXJzaW9uIH0gZnJvbSAnQHR5cGluZ3MvZXhwb3J0cyc7XG5pbXBvcnQgUGFja2FnZUVycm9yIGZyb20gJ0B1dGlscy9QYWNrYWdlRXJyb3InO1xuaW1wb3J0IEJhc2VBcHAgZnJvbSAnLi9CYXNlL0Jhc2VBcHAnO1xuaW1wb3J0IEdyb3VwQnVpbGRlciBmcm9tICcuL0dyb3VwJztcbmltcG9ydCBTY2hlbWFCdWlsZGVyIGZyb20gJy4vU2NoZW1hJztcblxuLyoqXG4gKiBUaGUgdmVyc2lvbiBidWlsZGVyIGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJzaW9uQnVpbGRlciBleHRlbmRzIEJhc2VBcHA8J2FwcCc+IHtcbiAgcHJpdmF0ZSB2ZXJzaW9uOiBudW1iZXI7XG4gIHByaXZhdGUgZ3JvdXBzOiBHcm91cEJ1aWxkZXJbXTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB2ZXJzaW9uIGJ1aWxkZXIuXG4gICAqIEBwYXJhbSBjb25maWcgVGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIEFQSS5cbiAgICogQHBhcmFtIGNvbmZpZy52ZXJzaW9uIFRoZSB2ZXJzaW9uIG9mIHRoZSBBUEkuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoeyB2ZXJzaW9uIH06IHsgdmVyc2lvbjogbnVtYmVyIH0pIHtcbiAgICBzdXBlcignYXBwJyk7XG5cbiAgICBjb25zdCBjb25zdHJ1Y3RvclNjaGVtYSA9IG5ldyBTY2hlbWFCdWlsZGVyKCkuYWRkTnVtYmVyKHtcbiAgICAgIG5hbWU6ICd2ZXJzaW9uJyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgbWluOiAxLFxuICAgICAgbWF4OiAxMF8wMDAsXG4gICAgfSk7XG5cbiAgICBjb25zdHJ1Y3RvclNjaGVtYS52YWxpZGF0ZSh7IHZlcnNpb24gfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHRocm93IG5ldyBQYWNrYWdlRXJyb3IocmVzdWx0KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBnbG9iYWwgcmF0ZSBsaW1pdCBmb3IgdGhlIHZlcnNpb24uXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSByYXRlIGxpbWl0LlxuICAgKiBAcGFyYW0gc2hvd0luRG9jcyBXaGV0aGVyIHRvIHNob3cgdGhlIHJhdGUgbGltaXQgaW4gdGhlIGRvY3MuXG4gICAqIEByZXR1cm5zIFRoZSBBUEkgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBzZXRSYXRlTGltaXQob3B0aW9uczogUGFydGlhbDxPcHRpb25zPiwgc2hvd0luRG9jcz86IGJvb2xlYW4pOiB0aGlzIHtcbiAgICAvLyBJZiBzaG93SW5Eb2NzIGlzIHVuZGVmaW5lZCwgaXQgd2lsbCBkZWZhdWx0IHRvIHRydWUuXG4gICAgaWYgKHNob3dJbkRvY3MgfHwgc2hvd0luRG9jcyA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy5yYXRlbGltaXQgPSB7XG4gICAgICAgIHN0YXR1c0NvZGU6IG9wdGlvbnMuc3RhdHVzQ29kZSA/PyA0MjksXG4gICAgICAgIC4uLih0eXBlb2Ygb3B0aW9ucy53aW5kb3dNcyA9PT0gJ251bWJlcidcbiAgICAgICAgICA/IHsgd2luZG93OiBvcHRpb25zLndpbmRvd01zIH1cbiAgICAgICAgICA6IHt9KSxcbiAgICAgICAgLi4uKHR5cGVvZiBvcHRpb25zLm1heCA9PT0gJ251bWJlcicgPyB7IG1heDogb3B0aW9ucy5tYXggfSA6IHt9KSxcbiAgICAgIH07XG5cbiAgICAvLyBVc2UgdGhlIGV4cHJlc3MtcmF0ZS1saW1pdCBtaWRkbGV3YXJlLlxuICAgIHRoaXMucmF3LnVzZShgdiR7dGhpcy52ZXJzaW9ufWAsIHJhdGVMaW1pdChvcHRpb25zKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgZ3JvdXAgdG8gdGhlIEFQSS5cbiAgICogQHBhcmFtIGdyb3VwIFRoZSBncm91cCB0byBhZGQuXG4gICAqIEByZXR1cm5zIFRoZSBBUEkgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBhZGRHcm91cChncm91cDogR3JvdXBCdWlsZGVyKTogdGhpcyB7XG4gICAgdGhpcy5ncm91cHMucHVzaChncm91cCk7XG4gICAgY29uc3QgZ3JvdXBWYWx1ZXMgPSBncm91cC52YWx1ZXMoKTtcbiAgICB0aGlzLnJhdy51c2UoYHYke3RoaXMudmVyc2lvbn1gLCBncm91cFZhbHVlcy5yYXcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBncm91cCB0byB0aGUgQVBJLlxuICAgKiBAcmV0dXJucyBUaGUgQVBJIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IFJlYWRvbmx5PEV4cG9ydGVkVmVyc2lvbj4ge1xuICAgIHJldHVybiB7XG4gICAgICB2ZXJzaW9uOiB0aGlzLnZlcnNpb24sXG4gICAgICByYXRlTGltaXQ6IHRoaXMucmF0ZWxpbWl0LFxuICAgICAgZ3JvdXBzOiB0aGlzLmdyb3Vwcy5tYXAoKGdyb3VwKSA9PiBncm91cC5leHBvcnQoKSksXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2ZXJzaW9uIHZhbHVlcy5cbiAgICogQHJldHVybnMgVGhlIEFQSSBkYXRhLlxuICAgKi9cbiAgcHVibGljIHZhbHVlcygpOiBSZWFkb25seTx7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIHJhdzogUm91dGVyO1xuICAgIHZlcnNpb246IG51bWJlcjtcbiAgfT4ge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBgL3Yke3RoaXMudmVyc2lvbn1gLFxuICAgICAgcmF3OiB0aGlzLnJhdyxcbiAgICAgIHZlcnNpb246IHRoaXMudmVyc2lvbixcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgdmVyc2lvbiBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIHZhbGlkYXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ncm91cHMubGVuZ3RoKSB0aHJvdyBuZXcgUGFja2FnZUVycm9yKCdObyBncm91cHMgcHJvdmlkZWQnKTtcbiAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4gZ3JvdXAudmFsaWRhdGUoKSk7XG4gIH1cbn1cbiJdfQ==