import { PackageError, logger } from '@utils/index';
import { withErrorHandling } from '@utils/middleware';
import SchemaBuilder from './Schema';
/**
 * The endpoint builder class.
 */
export default class EndpointBuilder {
    disabled;
    name;
    description;
    path;
    method;
    notes;
    paramSchema;
    querySchema;
    bodySchema;
    responses;
    controller;
    ratelimit;
    /**
     * Creates a new endpoint.
     * @param options The options for the endpoint.
     * @param options.name The name of the endpoint.
     * @param options.description The description of the endpoint.
     * @param options.path The path of the endpoint.
     * @param options.method The method of the endpoint.
     * @param options.controller The controller of the endpoint.
     * @param options.notes The notes of the endpoint.
     * @param options.responses The responses of the endpoint.
     * @param options.disabled The disabled state of the endpoint.
     */
    constructor(options) {
        this.disabled = options.disabled ?? false;
        this.name = options.name;
        this.description = options.description;
        this.path = options.path;
        this.method = options.method;
        if (options.controller)
            this.controller = withErrorHandling(options.controller);
        else
            this.controller = undefined;
        this.notes = options.notes ?? [];
        this.responses = options.responses ?? [];
        const constructorSchema = new SchemaBuilder()
            .addBoolean({
            name: 'disabled',
            required: false,
            defaultValue: false,
        })
            .addString({
            name: 'name',
            required: true,
            min: 1,
            max: 50,
        })
            .addString({
            name: 'description',
            required: true,
            min: 1,
            max: 1000,
        })
            .addString({
            name: 'path',
            required: true,
            min: 1,
            max: 100,
            test: 'path',
        })
            .addString({
            name: 'method',
            required: true,
            min: 1,
            max: 100,
            options: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        });
        constructorSchema.validate(options).then((result) => {
            if (typeof result === 'string')
                throw new PackageError(`Endpoint (${options.name || options.path}): ${result}`);
        });
    }
    /**
     * Sets the notes of the endpoint.
     * @param notes The notes of the endpoint.
     * @returns The endpoint builder.
     */
    setNotes(notes) {
        this.notes = notes;
        return this;
    }
    /**
     * Sets the schema to validate the provided request parameters against.
     * @param callback The callback to build the schema.
     * @returns The endpoint builder.
     */
    setParamSchema(callback) {
        const schema = new SchemaBuilder();
        callback(schema);
        this.paramSchema = schema;
        return this;
    }
    /**
     * Sets the schema to validate the provided request queries against.
     * @param callback The callback to build the schema.
     * @returns The endpoint builder.
     */
    setQuerySchema(callback) {
        const schema = new SchemaBuilder();
        callback(schema);
        this.querySchema = schema;
        return this;
    }
    /**
     * Sets the schema to validate the provided request body against.
     * @param callback The callback to build the schema.
     * @returns The endpoint builder.
     */
    setBodySchema(callback) {
        const schema = new SchemaBuilder();
        callback(schema);
        this.bodySchema = schema;
        return this;
    }
    /**
     * Sets the responses of the endpoint.
     * @param responses The responses of the endpoint.
     * @returns The endpoint builder.
     */
    setResponses(responses) {
        this.responses = responses;
        return this;
    }
    /**
     * Sets the controler to run.
     * @param controller The controlller function to run.
     * @returns The endpoint builder.
     */
    setController(controller) {
        this.controller = withErrorHandling(controller);
        return this;
    }
    /**
     * Executes the endpoint function.
     * @param req The request.
     * @param res The response.
     * @param next The next function.
     */
    execute = (req, res, next) => {
        logger.info('[T] running controller');
        (async () => {
            try {
                // Validate the request
                if (this.paramSchema &&
                    (await this.paramSchema.validate(req.params, { res })))
                    return;
                if (this.querySchema &&
                    (await this.querySchema.validate(req.query, { res })))
                    return;
                if (this.bodySchema &&
                    (await this.bodySchema.validate(req.body, {
                        res,
                    })))
                    return;
                logger.info('[T] running controller #2');
                // Return the execution of the controller
                if (this.controller) {
                    logger.info('[T] running controller #3');
                    this.controller(req, res, next);
                }
                else {
                    logger.info('[T] running controller #4');
                    logger.error(`Endpoint (${this.name || this.path}): Controller not set`);
                    res.status(500).json({
                        status: 500,
                        message: 'Controller not set for endpoint.',
                    });
                }
            }
            catch (error) {
                logger.error(error);
            }
        })();
    };
    /**
     * Validates the endpoint.
     */
    validate() {
        if (!this.controller)
            throw new PackageError('Controller not set');
    }
    /**
     * Exports the endpoint.
     * @returns The exported endpoint.
     */
    export() {
        return {
            name: this.name,
            description: this.description,
            path: this.path === '/' ? '' : this.path,
            method: this.method,
            notes: this.notes,
            params: this.paramSchema ? this.paramSchema.export() : {},
            queries: this.querySchema ? this.querySchema.export() : {},
            body: this.bodySchema ? this.bodySchema.export() : {},
            responses: this.responses,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvRW5kcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxhQUFhLE1BQU0sVUFBVSxDQUFDO0FBRXJDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFlO0lBQzNCLFFBQVEsQ0FBVTtJQUNsQixJQUFJLENBQVM7SUFDYixXQUFXLENBQVM7SUFDcEIsSUFBSSxDQUFhO0lBQ2pCLE1BQU0sQ0FBZ0I7SUFDdEIsS0FBSyxDQUFpQjtJQUN0QixXQUFXLENBQWlCO0lBQzVCLFdBQVcsQ0FBaUI7SUFDNUIsVUFBVSxDQUFpQjtJQUMzQixTQUFTLENBQXFCO0lBQzlCLFVBQVUsQ0FBNkQ7SUFDdkUsU0FBUyxDQUFzQjtJQUV0Qzs7Ozs7Ozs7Ozs7T0FXRztJQUNILFlBQW1CLE9BU2xCO1FBQ0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxPQUFPLENBQUMsVUFBVTtZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFDckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxD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Q0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBDbGllbnRTZXNzaW9uIH0gZnJvbSAnbW9uZ29vc2UnO1xuXG5pbXBvcnQge1xuICBDb250cm9sbGVyVHlwZSxcbiAgRW5kcG9pbnROb3RlLFxuICBFbmRwb2ludFJlc3BvbnNlLFxuICBQYXRoU3RyaW5nLFxuICBSYXRlTGltaXQsXG4gIFJlcXVlc3RNZXRob2QsXG59IGZyb20gJ0B0eXBpbmdzL2NvcmUnO1xuaW1wb3J0IHsgRXhwb3J0ZWRFbmRwb2ludCB9IGZyb20gJ0B0eXBpbmdzL2V4cG9ydHMnO1xuaW1wb3J0IHsgUGFja2FnZUVycm9yLCBsb2dnZXIgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHsgd2l0aEVycm9ySGFuZGxpbmcgfSBmcm9tICdAdXRpbHMvbWlkZGxld2FyZSc7XG5pbXBvcnQgU2NoZW1hQnVpbGRlciBmcm9tICcuL1NjaGVtYSc7XG5cbi8qKlxuICogVGhlIGVuZHBvaW50IGJ1aWxkZXIgY2xhc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZHBvaW50QnVpbGRlciB7XG4gIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHB1YmxpYyBwYXRoOiBQYXRoU3RyaW5nO1xuICBwdWJsaWMgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kO1xuICBwdWJsaWMgbm90ZXM6IEVuZHBvaW50Tm90ZVtdO1xuICBwdWJsaWMgcGFyYW1TY2hlbWE/OiBTY2hlbWFCdWlsZGVyO1xuICBwdWJsaWMgcXVlcnlTY2hlbWE/OiBTY2hlbWFCdWlsZGVyO1xuICBwdWJsaWMgYm9keVNjaGVtYT86IFNjaGVtYUJ1aWxkZXI7XG4gIHB1YmxpYyByZXNwb25zZXM6IEVuZHBvaW50UmVzcG9uc2VbXTtcbiAgcHVibGljIGNvbnRyb2xsZXI/OiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHZvaWQ7XG4gIHB1YmxpYyByYXRlbGltaXQ/OiBQYXJ0aWFsPFJhdGVMaW1pdD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZW5kcG9pbnQuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIGZvciB0aGUgZW5kcG9pbnQuXG4gICAqIEBwYXJhbSBvcHRpb25zLm5hbWUgVGhlIG5hbWUgb2YgdGhlIGVuZHBvaW50LlxuICAgKiBAcGFyYW0gb3B0aW9ucy5kZXNjcmlwdGlvbiBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGVuZHBvaW50LlxuICAgKiBAcGFyYW0gb3B0aW9ucy5wYXRoIFRoZSBwYXRoIG9mIHRoZSBlbmRwb2ludC5cbiAgICogQHBhcmFtIG9wdGlvbnMubWV0aG9kIFRoZSBtZXRob2Qgb2YgdGhlIGVuZHBvaW50LlxuICAgKiBAcGFyYW0gb3B0aW9ucy5jb250cm9sbGVyIFRoZSBjb250cm9sbGVyIG9mIHRoZSBlbmRwb2ludC5cbiAgICogQHBhcmFtIG9wdGlvbnMubm90ZXMgVGhlIG5vdGVzIG9mIHRoZSBlbmRwb2ludC5cbiAgICogQHBhcmFtIG9wdGlvbnMucmVzcG9uc2VzIFRoZSByZXNwb25zZXMgb2YgdGhlIGVuZHBvaW50LlxuICAgKiBAcGFyYW0gb3B0aW9ucy5kaXNhYmxlZCBUaGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGVuZHBvaW50LlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBwYXRoOiBQYXRoU3RyaW5nO1xuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZDtcbiAgICBjb250cm9sbGVyPzogQ29udHJvbGxlclR5cGU7XG4gICAgbm90ZXM/OiBFbmRwb2ludE5vdGVbXTtcbiAgICByZXNwb25zZXM/OiBFbmRwb2ludFJlc3BvbnNlW107XG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICB9KSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IG9wdGlvbnMuZGlzYWJsZWQgPz8gZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBvcHRpb25zLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMucGF0aCA9IG9wdGlvbnMucGF0aDtcbiAgICB0aGlzLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kO1xuICAgIGlmIChvcHRpb25zLmNvbnRyb2xsZXIpXG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB3aXRoRXJyb3JIYW5kbGluZyhvcHRpb25zLmNvbnRyb2xsZXIpO1xuICAgIGVsc2UgdGhpcy5jb250cm9sbGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubm90ZXMgPSBvcHRpb25zLm5vdGVzID8/IFtdO1xuICAgIHRoaXMucmVzcG9uc2VzID0gb3B0aW9ucy5yZXNwb25zZXMgPz8gW107XG5cbiAgICBjb25zdCBjb25zdHJ1Y3RvclNjaGVtYSA9IG5ldyBTY2hlbWFCdWlsZGVyKClcbiAgICAgIC5hZGRCb29sZWFuKHtcbiAgICAgICAgbmFtZTogJ2Rpc2FibGVkJyxcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSlcbiAgICAgIC5hZGRTdHJpbmcoe1xuICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIG1heDogNTAsXG4gICAgICB9KVxuICAgICAgLmFkZFN0cmluZyh7XG4gICAgICAgIG5hbWU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIG1heDogMTAwMCxcbiAgICAgIH0pXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ3BhdGgnLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgdGVzdDogJ3BhdGgnLFxuICAgICAgfSlcbiAgICAgIC5hZGRTdHJpbmcoe1xuICAgICAgICBuYW1lOiAnbWV0aG9kJyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIG9wdGlvbnM6IFsnR0VUJywgJ1BPU1QnLCAnUEFUQ0gnLCAnUFVUJywgJ0RFTEVURScsICdPUFRJT05TJ10sXG4gICAgICB9KTtcblxuICAgIGNvbnN0cnVjdG9yU2NoZW1hLnZhbGlkYXRlKG9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgUGFja2FnZUVycm9yKFxuICAgICAgICAgIGBFbmRwb2ludCAoJHtvcHRpb25zLm5hbWUgfHwgb3B0aW9ucy5wYXRofSk6ICR7cmVzdWx0fWBcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBub3RlcyBvZiB0aGUgZW5kcG9pbnQuXG4gICAqIEBwYXJhbSBub3RlcyBUaGUgbm90ZXMgb2YgdGhlIGVuZHBvaW50LlxuICAgKiBAcmV0dXJucyBUaGUgZW5kcG9pbnQgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBzZXROb3Rlcyhub3RlczogRW5kcG9pbnROb3RlW10pOiB0aGlzIHtcbiAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2NoZW1hIHRvIHZhbGlkYXRlIHRoZSBwcm92aWRlZCByZXF1ZXN0IHBhcmFtZXRlcnMgYWdhaW5zdC5cbiAgICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBidWlsZCB0aGUgc2NoZW1hLlxuICAgKiBAcmV0dXJucyBUaGUgZW5kcG9pbnQgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBzZXRQYXJhbVNjaGVtYShjYWxsYmFjazogKHNjaGVtYTogU2NoZW1hQnVpbGRlcikgPT4gdm9pZCk6IHRoaXMge1xuICAgIGNvbnN0IHNjaGVtYSA9IG5ldyBTY2hlbWFCdWlsZGVyKCk7XG4gICAgY2FsbGJhY2soc2NoZW1hKTtcbiAgICB0aGlzLnBhcmFtU2NoZW1hID0gc2NoZW1hO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNjaGVtYSB0byB2YWxpZGF0ZSB0aGUgcHJvdmlkZWQgcmVxdWVzdCBxdWVyaWVzIGFnYWluc3QuXG4gICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gYnVpbGQgdGhlIHNjaGVtYS5cbiAgICogQHJldHVybnMgVGhlIGVuZHBvaW50IGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0UXVlcnlTY2hlbWEoY2FsbGJhY2s6IChzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpID0+IHZvaWQpOiB0aGlzIHtcbiAgICBjb25zdCBzY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpO1xuICAgIGNhbGxiYWNrKHNjaGVtYSk7XG4gICAgdGhpcy5xdWVyeVNjaGVtYSA9IHNjaGVtYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzY2hlbWEgdG8gdmFsaWRhdGUgdGhlIHByb3ZpZGVkIHJlcXVlc3QgYm9keSBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGJ1aWxkIHRoZSBzY2hlbWEuXG4gICAqIEByZXR1cm5zIFRoZSBlbmRwb2ludCBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIHNldEJvZHlTY2hlbWEoY2FsbGJhY2s6IChzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpID0+IHZvaWQpOiB0aGlzIHtcbiAgICBjb25zdCBzY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpO1xuICAgIGNhbGxiYWNrKHNjaGVtYSk7XG4gICAgdGhpcy5ib2R5U2NoZW1hID0gc2NoZW1hO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHJlc3BvbnNlcyBvZiB0aGUgZW5kcG9pbnQuXG4gICAqIEBwYXJhbSByZXNwb25zZXMgVGhlIHJlc3BvbnNlcyBvZiB0aGUgZW5kcG9pbnQuXG4gICAqIEByZXR1cm5zIFRoZSBlbmRwb2ludCBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIHNldFJlc3BvbnNlcyhyZXNwb25zZXM6IEVuZHBvaW50UmVzcG9uc2VbXSk6IHRoaXMge1xuICAgIHRoaXMucmVzcG9uc2VzID0gcmVzcG9uc2VzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNvbnRyb2xlciB0byBydW4uXG4gICAqIEBwYXJhbSBjb250cm9sbGVyIFRoZSBjb250cm9sbGxlciBmdW5jdGlvbiB0byBydW4uXG4gICAqIEByZXR1cm5zIFRoZSBlbmRwb2ludCBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIHNldENvbnRyb2xsZXIoXG4gICAgY29udHJvbGxlcjogKFxuICAgICAgcmVxOiBSZXF1ZXN0LFxuICAgICAgcmVzOiBSZXNwb25zZSxcbiAgICAgIHNlc3Npb246IENsaWVudFNlc3Npb25cbiAgICApID0+IFByb21pc2U8dW5rbm93bj4gfCB1bmtub3duXG4gICk6IHRoaXMge1xuICAgIHRoaXMuY29udHJvbGxlciA9IHdpdGhFcnJvckhhbmRsaW5nKGNvbnRyb2xsZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHRoZSBlbmRwb2ludCBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHJlcSBUaGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHJlcyBUaGUgcmVzcG9uc2UuXG4gICAqIEBwYXJhbSBuZXh0IFRoZSBuZXh0IGZ1bmN0aW9uLlxuICAgKi9cbiAgcHVibGljIGV4ZWN1dGUgPSAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pOiB2b2lkID0+IHtcbiAgICBsb2dnZXIuaW5mbygnW1RdIHJ1bm5pbmcgY29udHJvbGxlcicpO1xuXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFZhbGlkYXRlIHRoZSByZXF1ZXN0XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnBhcmFtU2NoZW1hICYmXG4gICAgICAgICAgKGF3YWl0IHRoaXMucGFyYW1TY2hlbWEudmFsaWRhdGUocmVxLnBhcmFtcywgeyByZXMgfSkpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnF1ZXJ5U2NoZW1hICYmXG4gICAgICAgICAgKGF3YWl0IHRoaXMucXVlcnlTY2hlbWEudmFsaWRhdGUocmVxLnF1ZXJ5LCB7IHJlcyB9KSlcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuYm9keVNjaGVtYSAmJlxuICAgICAgICAgIChhd2FpdCB0aGlzLmJvZHlTY2hlbWEudmFsaWRhdGUocmVxLmJvZHkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHtcbiAgICAgICAgICAgIHJlcyxcbiAgICAgICAgICB9KSlcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsb2dnZXIuaW5mbygnW1RdIHJ1bm5pbmcgY29udHJvbGxlciAjMicpO1xuXG4gICAgICAgIC8vIFJldHVybiB0aGUgZXhlY3V0aW9uIG9mIHRoZSBjb250cm9sbGVyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbygnW1RdIHJ1bm5pbmcgY29udHJvbGxlciAjMycpO1xuICAgICAgICAgIHRoaXMuY29udHJvbGxlcihyZXEsIHJlcywgbmV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oJ1tUXSBydW5uaW5nIGNvbnRyb2xsZXIgIzQnKTtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICBgRW5kcG9pbnQgKCR7dGhpcy5uYW1lIHx8IHRoaXMucGF0aH0pOiBDb250cm9sbGVyIG5vdCBzZXRgXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgICAgICBzdGF0dXM6IDUwMCxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdDb250cm9sbGVyIG5vdCBzZXQgZm9yIGVuZHBvaW50LicsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfTtcblxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoZSBlbmRwb2ludC5cbiAgICovXG4gIHB1YmxpYyB2YWxpZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29udHJvbGxlcikgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcignQ29udHJvbGxlciBub3Qgc2V0Jyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyB0aGUgZW5kcG9pbnQuXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCBlbmRwb2ludC5cbiAgICovXG4gIHB1YmxpYyBleHBvcnQoKTogUmVhZG9ubHk8RXhwb3J0ZWRFbmRwb2ludD4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHBhdGg6IHRoaXMucGF0aCA9PT0gJy8nID8gJycgOiB0aGlzLnBhdGgsXG4gICAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxuICAgICAgbm90ZXM6IHRoaXMubm90ZXMsXG4gICAgICBwYXJhbXM6IHRoaXMucGFyYW1TY2hlbWEgPyB0aGlzLnBhcmFtU2NoZW1hLmV4cG9ydCgpIDoge30sXG4gICAgICBxdWVyaWVzOiB0aGlzLnF1ZXJ5U2NoZW1hID8gdGhpcy5xdWVyeVNjaGVtYS5leHBvcnQoKSA6IHt9LFxuICAgICAgYm9keTogdGhpcy5ib2R5U2NoZW1hID8gdGhpcy5ib2R5U2NoZW1hLmV4cG9ydCgpIDoge30sXG4gICAgICByZXNwb25zZXM6IHRoaXMucmVzcG9uc2VzLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==