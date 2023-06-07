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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWlsZGVycy9WZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sU0FBc0IsTUFBTSxvQkFBb0IsQ0FBQztBQUd4RCxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLGFBQWEsTUFBTSxVQUFVLENBQUM7QUFFckM7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxPQUFjO0lBQ2hELE9BQU8sQ0FBUztJQUNoQixNQUFNLENBQWlCO0lBRS9COzs7O09BSUc7SUFDSCxZQUFtQixFQUFFLE9BQU8sRUFBdUI7UUFDakQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUN0RCxJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsTUFBTTtTQUNaLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO2dCQUFFLE1BQU0sSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxZQUFZLENBQUMsT0FBeUIsRUFBRSxVQUFvQjtRQUNqRSx1REFBdUQ7UUFDdkQsSUFBSSxVQUFVLElBQUksVUFBVSxLQUFLLFNBQVM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRztnQkFDZixVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVUsSUFBSSxHQUFHO2dCQUNyQyxHQUFHLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVE7b0JBQ3RDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNQLEdBQUcsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUNqRSxDQUFDO1FBRUoseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXJELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRLENBQUMsS0FBbUI7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkQsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBS1gsT0FBTztZQUNMLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDekIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgcmF0ZUxpbWl0LCB7IE9wdGlvbnMgfSBmcm9tICdleHByZXNzLXJhdGUtbGltaXQnO1xuXG5pbXBvcnQgeyBFeHBvcnRlZFZlcnNpb24gfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcbmltcG9ydCBQYWNrYWdlRXJyb3IgZnJvbSAnQHV0aWxzL1BhY2thZ2VFcnJvcic7XG5pbXBvcnQgQmFzZUFwcCBmcm9tICcuL0Jhc2UvQmFzZUFwcCc7XG5pbXBvcnQgR3JvdXBCdWlsZGVyIGZyb20gJy4vR3JvdXAnO1xuaW1wb3J0IFNjaGVtYUJ1aWxkZXIgZnJvbSAnLi9TY2hlbWEnO1xuXG4vKipcbiAqIFRoZSB2ZXJzaW9uIGJ1aWxkZXIgY2xhc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnNpb25CdWlsZGVyIGV4dGVuZHMgQmFzZUFwcDwnYXBwJz4ge1xuICBwcml2YXRlIHZlcnNpb246IG51bWJlcjtcbiAgcHJpdmF0ZSBncm91cHM6IEdyb3VwQnVpbGRlcltdO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHZlcnNpb24gYnVpbGRlci5cbiAgICogQHBhcmFtIGNvbmZpZyBUaGUgY29uZmlndXJhdGlvbiBvZiB0aGUgQVBJLlxuICAgKiBAcGFyYW0gY29uZmlnLnZlcnNpb24gVGhlIHZlcnNpb24gb2YgdGhlIEFQSS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7IHZlcnNpb24gfTogeyB2ZXJzaW9uOiBudW1iZXIgfSkge1xuICAgIHN1cGVyKCdhcHAnKTtcblxuICAgIGNvbnN0IGNvbnN0cnVjdG9yU2NoZW1hID0gbmV3IFNjaGVtYUJ1aWxkZXIoKS5hZGROdW1iZXIoe1xuICAgICAgbmFtZTogJ3ZlcnNpb24nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBtaW46IDEsXG4gICAgICBtYXg6IDEwXzAwMCxcbiAgICB9KTtcblxuICAgIGNvbnN0cnVjdG9yU2NoZW1hLnZhbGlkYXRlKHsgdmVyc2lvbiB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcihyZXN1bHQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGdsb2JhbCByYXRlIGxpbWl0IGZvciB0aGUgdmVyc2lvbi5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIHJhdGUgbGltaXQuXG4gICAqIEBwYXJhbSBzaG93SW5Eb2NzIFdoZXRoZXIgdG8gc2hvdyB0aGUgcmF0ZSBsaW1pdCBpbiB0aGUgZG9jcy5cbiAgICogQHJldHVybnMgVGhlIEFQSSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIHNldFJhdGVMaW1pdChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+LCBzaG93SW5Eb2NzPzogYm9vbGVhbik6IHRoaXMge1xuICAgIC8vIElmIHNob3dJbkRvY3MgaXMgdW5kZWZpbmVkLCBpdCB3aWxsIGRlZmF1bHQgdG8gdHJ1ZS5cbiAgICBpZiAoc2hvd0luRG9jcyB8fCBzaG93SW5Eb2NzID09PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLnJhdGVsaW1pdCA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogb3B0aW9ucy5zdGF0dXNDb2RlID8/IDQyOSxcbiAgICAgICAgLi4uKHR5cGVvZiBvcHRpb25zLndpbmRvd01zID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8geyB3aW5kb3c6IG9wdGlvbnMud2luZG93TXMgfVxuICAgICAgICAgIDoge30pLFxuICAgICAgICAuLi4odHlwZW9mIG9wdGlvbnMubWF4ID09PSAnbnVtYmVyJyA/IHsgbWF4OiBvcHRpb25zLm1heCB9IDoge30pLFxuICAgICAgfTtcblxuICAgIC8vIFVzZSB0aGUgZXhwcmVzcy1yYXRlLWxpbWl0IG1pZGRsZXdhcmUuXG4gICAgdGhpcy5yYXcudXNlKGB2JHt0aGlzLnZlcnNpb259YCwgcmF0ZUxpbWl0KG9wdGlvbnMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBncm91cCB0byB0aGUgQVBJLlxuICAgKiBAcGFyYW0gZ3JvdXAgVGhlIGdyb3VwIHRvIGFkZC5cbiAgICogQHJldHVybnMgVGhlIEFQSSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZEdyb3VwKGdyb3VwOiBHcm91cEJ1aWxkZXIpOiB0aGlzIHtcbiAgICB0aGlzLmdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICBjb25zdCBncm91cFZhbHVlcyA9IGdyb3VwLnZhbHVlcygpO1xuICAgIHRoaXMucmF3LnVzZShgdiR7dGhpcy52ZXJzaW9ufWAsIGdyb3VwVmFsdWVzLnJhdyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGdyb3VwIHRvIHRoZSBBUEkuXG4gICAqIEByZXR1cm5zIFRoZSBBUEkgZGF0YS5cbiAgICovXG4gIHB1YmxpYyBleHBvcnQoKTogUmVhZG9ubHk8RXhwb3J0ZWRWZXJzaW9uPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZlcnNpb246IHRoaXMudmVyc2lvbixcbiAgICAgIHJhdGVMaW1pdDogdGhpcy5yYXRlbGltaXQsXG4gICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLm1hcCgoZ3JvdXApID0+IGdyb3VwLmV4cG9ydCgpKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHZlcnNpb24gdmFsdWVzLlxuICAgKiBAcmV0dXJucyBUaGUgQVBJIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgdmFsdWVzKCk6IFJlYWRvbmx5PHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgcmF3OiBSb3V0ZXI7XG4gICAgdmVyc2lvbjogbnVtYmVyO1xuICB9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IGAvdiR7dGhpcy52ZXJzaW9ufWAsXG4gICAgICByYXc6IHRoaXMucmF3LFxuICAgICAgdmVyc2lvbjogdGhpcy52ZXJzaW9uLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoZSB2ZXJzaW9uIGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgdmFsaWRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmdyb3Vwcy5sZW5ndGgpIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoJ05vIGdyb3VwcyBwcm92aWRlZCcpO1xuICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiBncm91cC52YWxpZGF0ZSgpKTtcbiAgfVxufVxuIl19