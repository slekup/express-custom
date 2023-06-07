import rateLimit from 'express-rate-limit';
import PackageError from '@utils/PackageError';
import BaseApp from './Base/BaseApp';
import SchemaBuilder from './Schema';
/**
 * The version builder class.
 */
export default class VersionBuilder extends BaseApp {
    version;
    groups;
    /**
     * Creates a new version builder.
     * @param config The configuration of the API.
     * @param config.version The version of the API.
     */
    constructor({ version }) {
        super('app');
        const constructorSchema = new SchemaBuilder().addNumber({
            name: 'version',
            required: true,
            min: 1,
            max: 10_000,
        });
        constructorSchema.validate({ version }).then((result) => {
            if (typeof result === 'string')
                throw new PackageError(result);
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
        this.raw.use(`v${this.version}`, rateLimit(options));
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
            throw new PackageError('No groups provided');
        this.groups.forEach((group) => group.validate());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWlsZGVycy9WZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sU0FBc0IsTUFBTSxvQkFBb0IsQ0FBQztBQUd4RCxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLGFBQWEsTUFBTSxVQUFVLENBQUM7QUFFckM7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxPQUFjO0lBQ2hELE9BQU8sQ0FBUztJQUNoQixNQUFNLENBQWlCO0lBRS9COzs7O09BSUc7SUFDSCxZQUFtQixFQUFFLE9BQU8sRUFBdUI7UUFDakQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUN0RCxJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsTUFBTTtTQUNaLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO2dCQUFFLE1BQU0sSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxZQUFZLENBQUMsT0FBeUIsRUFBRSxVQUFvQjtRQUNqRSx1REFBdUQ7UUFDdkQsSUFBSSxVQUFVLElBQUksVUFBVSxLQUFLLFNBQVM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRztnQkFDZixVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVUsSUFBSSxHQUFHO2dCQUNyQyxHQUFHLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVE7b0JBQ3RDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNQLEdBQUcsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUNqRSxDQUFDO1FBRUoseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXJELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRLENBQUMsS0FBbUI7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkQsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBS1gsT0FBTztZQUNMLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDekIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCByYXRlTGltaXQsIHsgT3B0aW9ucyB9IGZyb20gJ2V4cHJlc3MtcmF0ZS1saW1pdCc7XHJcblxyXG5pbXBvcnQgeyBFeHBvcnRlZFZlcnNpb24gfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcclxuaW1wb3J0IFBhY2thZ2VFcnJvciBmcm9tICdAdXRpbHMvUGFja2FnZUVycm9yJztcclxuaW1wb3J0IEJhc2VBcHAgZnJvbSAnLi9CYXNlL0Jhc2VBcHAnO1xyXG5pbXBvcnQgR3JvdXBCdWlsZGVyIGZyb20gJy4vR3JvdXAnO1xyXG5pbXBvcnQgU2NoZW1hQnVpbGRlciBmcm9tICcuL1NjaGVtYSc7XHJcblxyXG4vKipcclxuICogVGhlIHZlcnNpb24gYnVpbGRlciBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnNpb25CdWlsZGVyIGV4dGVuZHMgQmFzZUFwcDwnYXBwJz4ge1xyXG4gIHByaXZhdGUgdmVyc2lvbjogbnVtYmVyO1xyXG4gIHByaXZhdGUgZ3JvdXBzOiBHcm91cEJ1aWxkZXJbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyB2ZXJzaW9uIGJ1aWxkZXIuXHJcbiAgICogQHBhcmFtIGNvbmZpZyBUaGUgY29uZmlndXJhdGlvbiBvZiB0aGUgQVBJLlxyXG4gICAqIEBwYXJhbSBjb25maWcudmVyc2lvbiBUaGUgdmVyc2lvbiBvZiB0aGUgQVBJLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7IHZlcnNpb24gfTogeyB2ZXJzaW9uOiBudW1iZXIgfSkge1xyXG4gICAgc3VwZXIoJ2FwcCcpO1xyXG5cclxuICAgIGNvbnN0IGNvbnN0cnVjdG9yU2NoZW1hID0gbmV3IFNjaGVtYUJ1aWxkZXIoKS5hZGROdW1iZXIoe1xyXG4gICAgICBuYW1lOiAndmVyc2lvbicsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW46IDEsXHJcbiAgICAgIG1heDogMTBfMDAwLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3RydWN0b3JTY2hlbWEudmFsaWRhdGUoeyB2ZXJzaW9uIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHRocm93IG5ldyBQYWNrYWdlRXJyb3IocmVzdWx0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZ3JvdXBzID0gW107XHJcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgZ2xvYmFsIHJhdGUgbGltaXQgZm9yIHRoZSB2ZXJzaW9uLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSByYXRlIGxpbWl0LlxyXG4gICAqIEBwYXJhbSBzaG93SW5Eb2NzIFdoZXRoZXIgdG8gc2hvdyB0aGUgcmF0ZSBsaW1pdCBpbiB0aGUgZG9jcy5cclxuICAgKiBAcmV0dXJucyBUaGUgQVBJIGJ1aWxkZXIuXHJcbiAgICovXHJcbiAgcHVibGljIHNldFJhdGVMaW1pdChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+LCBzaG93SW5Eb2NzPzogYm9vbGVhbik6IHRoaXMge1xyXG4gICAgLy8gSWYgc2hvd0luRG9jcyBpcyB1bmRlZmluZWQsIGl0IHdpbGwgZGVmYXVsdCB0byB0cnVlLlxyXG4gICAgaWYgKHNob3dJbkRvY3MgfHwgc2hvd0luRG9jcyA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICB0aGlzLnJhdGVsaW1pdCA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBvcHRpb25zLnN0YXR1c0NvZGUgPz8gNDI5LFxyXG4gICAgICAgIC4uLih0eXBlb2Ygb3B0aW9ucy53aW5kb3dNcyA9PT0gJ251bWJlcidcclxuICAgICAgICAgID8geyB3aW5kb3c6IG9wdGlvbnMud2luZG93TXMgfVxyXG4gICAgICAgICAgOiB7fSksXHJcbiAgICAgICAgLi4uKHR5cGVvZiBvcHRpb25zLm1heCA9PT0gJ251bWJlcicgPyB7IG1heDogb3B0aW9ucy5tYXggfSA6IHt9KSxcclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBVc2UgdGhlIGV4cHJlc3MtcmF0ZS1saW1pdCBtaWRkbGV3YXJlLlxyXG4gICAgdGhpcy5yYXcudXNlKGB2JHt0aGlzLnZlcnNpb259YCwgcmF0ZUxpbWl0KG9wdGlvbnMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBncm91cCB0byB0aGUgQVBJLlxyXG4gICAqIEBwYXJhbSBncm91cCBUaGUgZ3JvdXAgdG8gYWRkLlxyXG4gICAqIEByZXR1cm5zIFRoZSBBUEkgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkR3JvdXAoZ3JvdXA6IEdyb3VwQnVpbGRlcik6IHRoaXMge1xyXG4gICAgdGhpcy5ncm91cHMucHVzaChncm91cCk7XHJcbiAgICBjb25zdCBncm91cFZhbHVlcyA9IGdyb3VwLnZhbHVlcygpO1xyXG4gICAgdGhpcy5yYXcudXNlKGB2JHt0aGlzLnZlcnNpb259YCwgZ3JvdXBWYWx1ZXMucmF3KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIGdyb3VwIHRvIHRoZSBBUEkuXHJcbiAgICogQHJldHVybnMgVGhlIEFQSSBkYXRhLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBleHBvcnQoKTogUmVhZG9ubHk8RXhwb3J0ZWRWZXJzaW9uPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2ZXJzaW9uOiB0aGlzLnZlcnNpb24sXHJcbiAgICAgIHJhdGVMaW1pdDogdGhpcy5yYXRlbGltaXQsXHJcbiAgICAgIGdyb3VwczogdGhpcy5ncm91cHMubWFwKChncm91cCkgPT4gZ3JvdXAuZXhwb3J0KCkpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHZlcnNpb24gdmFsdWVzLlxyXG4gICAqIEByZXR1cm5zIFRoZSBBUEkgZGF0YS5cclxuICAgKi9cclxuICBwdWJsaWMgdmFsdWVzKCk6IFJlYWRvbmx5PHtcclxuICAgIHBhdGg6IHN0cmluZztcclxuICAgIHJhdzogUm91dGVyO1xyXG4gICAgdmVyc2lvbjogbnVtYmVyO1xyXG4gIH0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBhdGg6IGAvdiR7dGhpcy52ZXJzaW9ufWAsXHJcbiAgICAgIHJhdzogdGhpcy5yYXcsXHJcbiAgICAgIHZlcnNpb246IHRoaXMudmVyc2lvbixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0ZXMgdGhlIHZlcnNpb24gYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgdmFsaWRhdGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZ3JvdXBzLmxlbmd0aCkgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcignTm8gZ3JvdXBzIHByb3ZpZGVkJyk7XHJcbiAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4gZ3JvdXAudmFsaWRhdGUoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==