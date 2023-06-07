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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvRW5kcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxhQUFhLE1BQU0sVUFBVSxDQUFDO0FBRXJDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFlO0lBQzNCLFFBQVEsQ0FBVTtJQUNsQixJQUFJLENBQVM7SUFDYixXQUFXLENBQVM7SUFDcEIsSUFBSSxDQUFhO0lBQ2pCLE1BQU0sQ0FBZ0I7SUFDdEIsS0FBSyxDQUFpQjtJQUN0QixXQUFXLENBQWlCO0lBQzVCLFdBQVcsQ0FBaUI7SUFDNUIsVUFBVSxDQUFpQjtJQUMzQixTQUFTLENBQXFCO0lBQzlCLFVBQVUsQ0FBNkQ7SUFDdkUsU0FBUyxDQUFzQjtJQUV0Qzs7Ozs7Ozs7Ozs7T0FXRztJQUNILFlBQW1CLE9BU2xCO1FBQ0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxPQUFPLENBQUMsVUFBVTtZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFDckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxD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Q0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IENsaWVudFNlc3Npb24gfSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xsZXJUeXBlLFxyXG4gIEVuZHBvaW50Tm90ZSxcclxuICBFbmRwb2ludFJlc3BvbnNlLFxyXG4gIFBhdGhTdHJpbmcsXHJcbiAgUmF0ZUxpbWl0LFxyXG4gIFJlcXVlc3RNZXRob2QsXHJcbn0gZnJvbSAnQHR5cGluZ3MvY29yZSc7XHJcbmltcG9ydCB7IEV4cG9ydGVkRW5kcG9pbnQgfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcclxuaW1wb3J0IHsgUGFja2FnZUVycm9yLCBsb2dnZXIgfSBmcm9tICdAdXRpbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyB3aXRoRXJyb3JIYW5kbGluZyB9IGZyb20gJ0B1dGlscy9taWRkbGV3YXJlJztcclxuaW1wb3J0IFNjaGVtYUJ1aWxkZXIgZnJvbSAnLi9TY2hlbWEnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBlbmRwb2ludCBidWlsZGVyIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5kcG9pbnRCdWlsZGVyIHtcclxuICBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBwdWJsaWMgcGF0aDogUGF0aFN0cmluZztcclxuICBwdWJsaWMgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kO1xyXG4gIHB1YmxpYyBub3RlczogRW5kcG9pbnROb3RlW107XHJcbiAgcHVibGljIHBhcmFtU2NoZW1hPzogU2NoZW1hQnVpbGRlcjtcclxuICBwdWJsaWMgcXVlcnlTY2hlbWE/OiBTY2hlbWFCdWlsZGVyO1xyXG4gIHB1YmxpYyBib2R5U2NoZW1hPzogU2NoZW1hQnVpbGRlcjtcclxuICBwdWJsaWMgcmVzcG9uc2VzOiBFbmRwb2ludFJlc3BvbnNlW107XHJcbiAgcHVibGljIGNvbnRyb2xsZXI/OiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHZvaWQ7XHJcbiAgcHVibGljIHJhdGVsaW1pdD86IFBhcnRpYWw8UmF0ZUxpbWl0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBlbmRwb2ludC5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgdGhlIGVuZHBvaW50LlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLm5hbWUgVGhlIG5hbWUgb2YgdGhlIGVuZHBvaW50LlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmRlc2NyaXB0aW9uIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZW5kcG9pbnQuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMucGF0aCBUaGUgcGF0aCBvZiB0aGUgZW5kcG9pbnQuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMubWV0aG9kIFRoZSBtZXRob2Qgb2YgdGhlIGVuZHBvaW50LlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmNvbnRyb2xsZXIgVGhlIGNvbnRyb2xsZXIgb2YgdGhlIGVuZHBvaW50LlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLm5vdGVzIFRoZSBub3RlcyBvZiB0aGUgZW5kcG9pbnQuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMucmVzcG9uc2VzIFRoZSByZXNwb25zZXMgb2YgdGhlIGVuZHBvaW50LlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmRpc2FibGVkIFRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgZW5kcG9pbnQuXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBwYXRoOiBQYXRoU3RyaW5nO1xyXG4gICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kO1xyXG4gICAgY29udHJvbGxlcj86IENvbnRyb2xsZXJUeXBlO1xyXG4gICAgbm90ZXM/OiBFbmRwb2ludE5vdGVbXTtcclxuICAgIHJlc3BvbnNlcz86IEVuZHBvaW50UmVzcG9uc2VbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICB9KSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gb3B0aW9ucy5kaXNhYmxlZCA/PyBmYWxzZTtcclxuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBvcHRpb25zLmRlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5wYXRoID0gb3B0aW9ucy5wYXRoO1xyXG4gICAgdGhpcy5tZXRob2QgPSBvcHRpb25zLm1ldGhvZDtcclxuICAgIGlmIChvcHRpb25zLmNvbnRyb2xsZXIpXHJcbiAgICAgIHRoaXMuY29udHJvbGxlciA9IHdpdGhFcnJvckhhbmRsaW5nKG9wdGlvbnMuY29udHJvbGxlcik7XHJcbiAgICBlbHNlIHRoaXMuY29udHJvbGxlciA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMubm90ZXMgPSBvcHRpb25zLm5vdGVzID8/IFtdO1xyXG4gICAgdGhpcy5yZXNwb25zZXMgPSBvcHRpb25zLnJlc3BvbnNlcyA/PyBbXTtcclxuXHJcbiAgICBjb25zdCBjb25zdHJ1Y3RvclNjaGVtYSA9IG5ldyBTY2hlbWFCdWlsZGVyKClcclxuICAgICAgLmFkZEJvb2xlYW4oe1xyXG4gICAgICAgIG5hbWU6ICdkaXNhYmxlZCcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXHJcbiAgICAgIH0pXHJcbiAgICAgIC5hZGRTdHJpbmcoe1xyXG4gICAgICAgIG5hbWU6ICduYW1lJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiA1MCxcclxuICAgICAgfSlcclxuICAgICAgLmFkZFN0cmluZyh7XHJcbiAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiAxMDAwLFxyXG4gICAgICB9KVxyXG4gICAgICAuYWRkU3RyaW5nKHtcclxuICAgICAgICBuYW1lOiAncGF0aCcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgbWluOiAxLFxyXG4gICAgICAgIG1heDogMTAwLFxyXG4gICAgICAgIHRlc3Q6ICdwYXRoJyxcclxuICAgICAgfSlcclxuICAgICAgLmFkZFN0cmluZyh7XHJcbiAgICAgICAgbmFtZTogJ21ldGhvZCcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgbWluOiAxLFxyXG4gICAgICAgIG1heDogMTAwLFxyXG4gICAgICAgIG9wdGlvbnM6IFsnR0VUJywgJ1BPU1QnLCAnUEFUQ0gnLCAnUFVUJywgJ0RFTEVURScsICdPUFRJT05TJ10sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yU2NoZW1hLnZhbGlkYXRlKG9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcihcclxuICAgICAgICAgIGBFbmRwb2ludCAoJHtvcHRpb25zLm5hbWUgfHwgb3B0aW9ucy5wYXRofSk6ICR7cmVzdWx0fWBcclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBub3RlcyBvZiB0aGUgZW5kcG9pbnQuXHJcbiAgICogQHBhcmFtIG5vdGVzIFRoZSBub3RlcyBvZiB0aGUgZW5kcG9pbnQuXHJcbiAgICogQHJldHVybnMgVGhlIGVuZHBvaW50IGJ1aWxkZXIuXHJcbiAgICovXHJcbiAgcHVibGljIHNldE5vdGVzKG5vdGVzOiBFbmRwb2ludE5vdGVbXSk6IHRoaXMge1xyXG4gICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBzY2hlbWEgdG8gdmFsaWRhdGUgdGhlIHByb3ZpZGVkIHJlcXVlc3QgcGFyYW1ldGVycyBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gYnVpbGQgdGhlIHNjaGVtYS5cclxuICAgKiBAcmV0dXJucyBUaGUgZW5kcG9pbnQgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgc2V0UGFyYW1TY2hlbWEoY2FsbGJhY2s6IChzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpID0+IHZvaWQpOiB0aGlzIHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IG5ldyBTY2hlbWFCdWlsZGVyKCk7XHJcbiAgICBjYWxsYmFjayhzY2hlbWEpO1xyXG4gICAgdGhpcy5wYXJhbVNjaGVtYSA9IHNjaGVtYTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgc2NoZW1hIHRvIHZhbGlkYXRlIHRoZSBwcm92aWRlZCByZXF1ZXN0IHF1ZXJpZXMgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGJ1aWxkIHRoZSBzY2hlbWEuXHJcbiAgICogQHJldHVybnMgVGhlIGVuZHBvaW50IGJ1aWxkZXIuXHJcbiAgICovXHJcbiAgcHVibGljIHNldFF1ZXJ5U2NoZW1hKGNhbGxiYWNrOiAoc2NoZW1hOiBTY2hlbWFCdWlsZGVyKSA9PiB2b2lkKTogdGhpcyB7XHJcbiAgICBjb25zdCBzY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpO1xyXG4gICAgY2FsbGJhY2soc2NoZW1hKTtcclxuICAgIHRoaXMucXVlcnlTY2hlbWEgPSBzY2hlbWE7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHNjaGVtYSB0byB2YWxpZGF0ZSB0aGUgcHJvdmlkZWQgcmVxdWVzdCBib2R5IGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBidWlsZCB0aGUgc2NoZW1hLlxyXG4gICAqIEByZXR1cm5zIFRoZSBlbmRwb2ludCBidWlsZGVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRCb2R5U2NoZW1hKGNhbGxiYWNrOiAoc2NoZW1hOiBTY2hlbWFCdWlsZGVyKSA9PiB2b2lkKTogdGhpcyB7XHJcbiAgICBjb25zdCBzY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpO1xyXG4gICAgY2FsbGJhY2soc2NoZW1hKTtcclxuICAgIHRoaXMuYm9keVNjaGVtYSA9IHNjaGVtYTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgcmVzcG9uc2VzIG9mIHRoZSBlbmRwb2ludC5cclxuICAgKiBAcGFyYW0gcmVzcG9uc2VzIFRoZSByZXNwb25zZXMgb2YgdGhlIGVuZHBvaW50LlxyXG4gICAqIEByZXR1cm5zIFRoZSBlbmRwb2ludCBidWlsZGVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRSZXNwb25zZXMocmVzcG9uc2VzOiBFbmRwb2ludFJlc3BvbnNlW10pOiB0aGlzIHtcclxuICAgIHRoaXMucmVzcG9uc2VzID0gcmVzcG9uc2VzO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBjb250cm9sZXIgdG8gcnVuLlxyXG4gICAqIEBwYXJhbSBjb250cm9sbGVyIFRoZSBjb250cm9sbGxlciBmdW5jdGlvbiB0byBydW4uXHJcbiAgICogQHJldHVybnMgVGhlIGVuZHBvaW50IGJ1aWxkZXIuXHJcbiAgICovXHJcbiAgcHVibGljIHNldENvbnRyb2xsZXIoXHJcbiAgICBjb250cm9sbGVyOiAoXHJcbiAgICAgIHJlcTogUmVxdWVzdCxcclxuICAgICAgcmVzOiBSZXNwb25zZSxcclxuICAgICAgc2Vzc2lvbjogQ2xpZW50U2Vzc2lvblxyXG4gICAgKSA9PiBQcm9taXNlPHVua25vd24+IHwgdW5rbm93blxyXG4gICk6IHRoaXMge1xyXG4gICAgdGhpcy5jb250cm9sbGVyID0gd2l0aEVycm9ySGFuZGxpbmcoY29udHJvbGxlcik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4ZWN1dGVzIHRoZSBlbmRwb2ludCBmdW5jdGlvbi5cclxuICAgKiBAcGFyYW0gcmVxIFRoZSByZXF1ZXN0LlxyXG4gICAqIEBwYXJhbSByZXMgVGhlIHJlc3BvbnNlLlxyXG4gICAqIEBwYXJhbSBuZXh0IFRoZSBuZXh0IGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBleGVjdXRlID0gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKTogdm9pZCA9PiB7XHJcbiAgICBsb2dnZXIuaW5mbygnW1RdIHJ1bm5pbmcgY29udHJvbGxlcicpO1xyXG5cclxuICAgIChhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gVmFsaWRhdGUgdGhlIHJlcXVlc3RcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLnBhcmFtU2NoZW1hICYmXHJcbiAgICAgICAgICAoYXdhaXQgdGhpcy5wYXJhbVNjaGVtYS52YWxpZGF0ZShyZXEucGFyYW1zLCB7IHJlcyB9KSlcclxuICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5xdWVyeVNjaGVtYSAmJlxyXG4gICAgICAgICAgKGF3YWl0IHRoaXMucXVlcnlTY2hlbWEudmFsaWRhdGUocmVxLnF1ZXJ5LCB7IHJlcyB9KSlcclxuICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5ib2R5U2NoZW1hICYmXHJcbiAgICAgICAgICAoYXdhaXQgdGhpcy5ib2R5U2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5IGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCB7XHJcbiAgICAgICAgICAgIHJlcyxcclxuICAgICAgICAgIH0pKVxyXG4gICAgICAgIClcclxuICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgbG9nZ2VyLmluZm8oJ1tUXSBydW5uaW5nIGNvbnRyb2xsZXIgIzInKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBleGVjdXRpb24gb2YgdGhlIGNvbnRyb2xsZXJcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyKSB7XHJcbiAgICAgICAgICBsb2dnZXIuaW5mbygnW1RdIHJ1bm5pbmcgY29udHJvbGxlciAjMycpO1xyXG4gICAgICAgICAgdGhpcy5jb250cm9sbGVyKHJlcSwgcmVzLCBuZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbG9nZ2VyLmluZm8oJ1tUXSBydW5uaW5nIGNvbnRyb2xsZXIgIzQnKTtcclxuICAgICAgICAgIGxvZ2dlci5lcnJvcihcclxuICAgICAgICAgICAgYEVuZHBvaW50ICgke3RoaXMubmFtZSB8fCB0aGlzLnBhdGh9KTogQ29udHJvbGxlciBub3Qgc2V0YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3RhdHVzOiA1MDAsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdDb250cm9sbGVyIG5vdCBzZXQgZm9yIGVuZHBvaW50LicsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0ZXMgdGhlIGVuZHBvaW50LlxyXG4gICAqL1xyXG4gIHB1YmxpYyB2YWxpZGF0ZSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5jb250cm9sbGVyKSB0aHJvdyBuZXcgUGFja2FnZUVycm9yKCdDb250cm9sbGVyIG5vdCBzZXQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cG9ydHMgdGhlIGVuZHBvaW50LlxyXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCBlbmRwb2ludC5cclxuICAgKi9cclxuICBwdWJsaWMgZXhwb3J0KCk6IFJlYWRvbmx5PEV4cG9ydGVkRW5kcG9pbnQ+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXHJcbiAgICAgIHBhdGg6IHRoaXMucGF0aCA9PT0gJy8nID8gJycgOiB0aGlzLnBhdGgsXHJcbiAgICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXHJcbiAgICAgIG5vdGVzOiB0aGlzLm5vdGVzLFxyXG4gICAgICBwYXJhbXM6IHRoaXMucGFyYW1TY2hlbWEgPyB0aGlzLnBhcmFtU2NoZW1hLmV4cG9ydCgpIDoge30sXHJcbiAgICAgIHF1ZXJpZXM6IHRoaXMucXVlcnlTY2hlbWEgPyB0aGlzLnF1ZXJ5U2NoZW1hLmV4cG9ydCgpIDoge30sXHJcbiAgICAgIGJvZHk6IHRoaXMuYm9keVNjaGVtYSA/IHRoaXMuYm9keVNjaGVtYS5leHBvcnQoKSA6IHt9LFxyXG4gICAgICByZXNwb25zZXM6IHRoaXMucmVzcG9uc2VzLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19