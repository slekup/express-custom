"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@utils/index");
const middleware_1 = require("@utils/middleware");
const Schema_1 = __importDefault(require("./Schema"));
/**
 * The endpoint builder class.
 */
class EndpointBuilder {
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
            this.controller = (0, middleware_1.withErrorHandling)(options.controller);
        else
            this.controller = undefined;
        this.notes = options.notes ?? [];
        this.responses = options.responses ?? [];
        const constructorSchema = new Schema_1.default()
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
                throw new index_1.PackageError(`Endpoint (${options.name || options.path}): ${result}`);
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
        const schema = new Schema_1.default();
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
        const schema = new Schema_1.default();
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
        const schema = new Schema_1.default();
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
        this.controller = (0, middleware_1.withErrorHandling)(controller);
        return this;
    }
    /**
     * Executes the endpoint function.
     * @param req The request.
     * @param res The response.
     * @param next The next function.
     */
    execute = (req, res, next) => {
        index_1.logger.info('[T] running controller');
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
                index_1.logger.info('[T] running controller #2');
                // Return the execution of the controller
                if (this.controller) {
                    index_1.logger.info('[T] running controller #3');
                    this.controller(req, res, next);
                }
                else {
                    index_1.logger.info('[T] running controller #4');
                    index_1.logger.error(`Endpoint (${this.name || this.path}): Controller not set`);
                    res.status(500).json({
                        status: 500,
                        message: 'Controller not set for endpoint.',
                    });
                }
            }
            catch (error) {
                index_1.logger.error(error);
            }
        })();
    };
    /**
     * Validates the endpoint.
     */
    validate() {
        if (!this.controller)
            throw new index_1.PackageError('Controller not set');
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
exports.default = EndpointBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvRW5kcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFZQSx3Q0FBb0Q7QUFDcEQsa0RBQXNEO0FBQ3RELHNEQUFxQztBQUVyQzs7R0FFRztBQUNILE1BQXFCLGVBQWU7SUFDM0IsUUFBUSxDQUFVO0lBQ2xCLElBQUksQ0FBUztJQUNiLFdBQVcsQ0FBUztJQUNwQixJQUFJLENBQWE7SUFDakIsTUFBTSxDQUFnQjtJQUN0QixLQUFLLENBQWlCO0lBQ3RCLFdBQVcsQ0FBaUI7SUFDNUIsV0FBVyxDQUFpQjtJQUM1QixVQUFVLENBQWlCO0lBQzNCLFNBQVMsQ0FBcUI7SUFDOUIsVUFBVSxDQUE2RDtJQUN2RSxTQUFTLENBQXNCO0lBRXRDOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsWUFBbUIsT0FTbEI7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLE9BQU8sQ0FBQyxVQUFVO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBQSw4QkFBaUIsRUFBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O1lBQ3JELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVB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dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgQ2xpZW50U2Vzc2lvbiB9IGZyb20gJ21vbmdvb3NlJztcblxuaW1wb3J0IHtcbiAgQ29udHJvbGxlclR5cGUsXG4gIEVuZHBvaW50Tm90ZSxcbiAgRW5kcG9pbnRSZXNwb25zZSxcbiAgUGF0aFN0cmluZyxcbiAgUmF0ZUxpbWl0LFxuICBSZXF1ZXN0TWV0aG9kLFxufSBmcm9tICdAdHlwaW5ncy9jb3JlJztcbmltcG9ydCB7IEV4cG9ydGVkRW5kcG9pbnQgfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcbmltcG9ydCB7IFBhY2thZ2VFcnJvciwgbG9nZ2VyIH0gZnJvbSAnQHV0aWxzL2luZGV4JztcbmltcG9ydCB7IHdpdGhFcnJvckhhbmRsaW5nIH0gZnJvbSAnQHV0aWxzL21pZGRsZXdhcmUnO1xuaW1wb3J0IFNjaGVtYUJ1aWxkZXIgZnJvbSAnLi9TY2hlbWEnO1xuXG4vKipcbiAqIFRoZSBlbmRwb2ludCBidWlsZGVyIGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRwb2ludEJ1aWxkZXIge1xuICBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgcGF0aDogUGF0aFN0cmluZztcbiAgcHVibGljIG1ldGhvZDogUmVxdWVzdE1ldGhvZDtcbiAgcHVibGljIG5vdGVzOiBFbmRwb2ludE5vdGVbXTtcbiAgcHVibGljIHBhcmFtU2NoZW1hPzogU2NoZW1hQnVpbGRlcjtcbiAgcHVibGljIHF1ZXJ5U2NoZW1hPzogU2NoZW1hQnVpbGRlcjtcbiAgcHVibGljIGJvZHlTY2hlbWE/OiBTY2hlbWFCdWlsZGVyO1xuICBwdWJsaWMgcmVzcG9uc2VzOiBFbmRwb2ludFJlc3BvbnNlW107XG4gIHB1YmxpYyBjb250cm9sbGVyPzogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB2b2lkO1xuICBwdWJsaWMgcmF0ZWxpbWl0PzogUGFydGlhbDxSYXRlTGltaXQ+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGVuZHBvaW50LlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgdGhlIGVuZHBvaW50LlxuICAgKiBAcGFyYW0gb3B0aW9ucy5uYW1lIFRoZSBuYW1lIG9mIHRoZSBlbmRwb2ludC5cbiAgICogQHBhcmFtIG9wdGlvbnMuZGVzY3JpcHRpb24gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBlbmRwb2ludC5cbiAgICogQHBhcmFtIG9wdGlvbnMucGF0aCBUaGUgcGF0aCBvZiB0aGUgZW5kcG9pbnQuXG4gICAqIEBwYXJhbSBvcHRpb25zLm1ldGhvZCBUaGUgbWV0aG9kIG9mIHRoZSBlbmRwb2ludC5cbiAgICogQHBhcmFtIG9wdGlvbnMuY29udHJvbGxlciBUaGUgY29udHJvbGxlciBvZiB0aGUgZW5kcG9pbnQuXG4gICAqIEBwYXJhbSBvcHRpb25zLm5vdGVzIFRoZSBub3RlcyBvZiB0aGUgZW5kcG9pbnQuXG4gICAqIEBwYXJhbSBvcHRpb25zLnJlc3BvbnNlcyBUaGUgcmVzcG9uc2VzIG9mIHRoZSBlbmRwb2ludC5cbiAgICogQHBhcmFtIG9wdGlvbnMuZGlzYWJsZWQgVGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBlbmRwb2ludC5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgcGF0aDogUGF0aFN0cmluZztcbiAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2Q7XG4gICAgY29udHJvbGxlcj86IENvbnRyb2xsZXJUeXBlO1xuICAgIG5vdGVzPzogRW5kcG9pbnROb3RlW107XG4gICAgcmVzcG9uc2VzPzogRW5kcG9pbnRSZXNwb25zZVtdO1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgfSkge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBvcHRpb25zLmRpc2FibGVkID8/IGZhbHNlO1xuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gb3B0aW9ucy5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLnBhdGggPSBvcHRpb25zLnBhdGg7XG4gICAgdGhpcy5tZXRob2QgPSBvcHRpb25zLm1ldGhvZDtcbiAgICBpZiAob3B0aW9ucy5jb250cm9sbGVyKVxuICAgICAgdGhpcy5jb250cm9sbGVyID0gd2l0aEVycm9ySGFuZGxpbmcob3B0aW9ucy5jb250cm9sbGVyKTtcbiAgICBlbHNlIHRoaXMuY29udHJvbGxlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm5vdGVzID0gb3B0aW9ucy5ub3RlcyA/PyBbXTtcbiAgICB0aGlzLnJlc3BvbnNlcyA9IG9wdGlvbnMucmVzcG9uc2VzID8/IFtdO1xuXG4gICAgY29uc3QgY29uc3RydWN0b3JTY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpXG4gICAgICAuYWRkQm9vbGVhbih7XG4gICAgICAgIG5hbWU6ICdkaXNhYmxlZCcsXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDUwLFxuICAgICAgfSlcbiAgICAgIC5hZGRTdHJpbmcoe1xuICAgICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDEwMDAsXG4gICAgICB9KVxuICAgICAgLmFkZFN0cmluZyh7XG4gICAgICAgIG5hbWU6ICdwYXRoJyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIHRlc3Q6ICdwYXRoJyxcbiAgICAgIH0pXG4gICAgICAuYWRkU3RyaW5nKHtcbiAgICAgICAgbmFtZTogJ21ldGhvZCcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIG1heDogMTAwLFxuICAgICAgICBvcHRpb25zOiBbJ0dFVCcsICdQT1NUJywgJ1BBVENIJywgJ1BVVCcsICdERUxFVEUnLCAnT1BUSU9OUyddLFxuICAgICAgfSk7XG5cbiAgICBjb25zdHJ1Y3RvclNjaGVtYS52YWxpZGF0ZShvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IFBhY2thZ2VFcnJvcihcbiAgICAgICAgICBgRW5kcG9pbnQgKCR7b3B0aW9ucy5uYW1lIHx8IG9wdGlvbnMucGF0aH0pOiAke3Jlc3VsdH1gXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbm90ZXMgb2YgdGhlIGVuZHBvaW50LlxuICAgKiBAcGFyYW0gbm90ZXMgVGhlIG5vdGVzIG9mIHRoZSBlbmRwb2ludC5cbiAgICogQHJldHVybnMgVGhlIGVuZHBvaW50IGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0Tm90ZXMobm90ZXM6IEVuZHBvaW50Tm90ZVtdKTogdGhpcyB7XG4gICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNjaGVtYSB0byB2YWxpZGF0ZSB0aGUgcHJvdmlkZWQgcmVxdWVzdCBwYXJhbWV0ZXJzIGFnYWluc3QuXG4gICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gYnVpbGQgdGhlIHNjaGVtYS5cbiAgICogQHJldHVybnMgVGhlIGVuZHBvaW50IGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0UGFyYW1TY2hlbWEoY2FsbGJhY2s6IChzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpID0+IHZvaWQpOiB0aGlzIHtcbiAgICBjb25zdCBzY2hlbWEgPSBuZXcgU2NoZW1hQnVpbGRlcigpO1xuICAgIGNhbGxiYWNrKHNjaGVtYSk7XG4gICAgdGhpcy5wYXJhbVNjaGVtYSA9IHNjaGVtYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzY2hlbWEgdG8gdmFsaWRhdGUgdGhlIHByb3ZpZGVkIHJlcXVlc3QgcXVlcmllcyBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGJ1aWxkIHRoZSBzY2hlbWEuXG4gICAqIEByZXR1cm5zIFRoZSBlbmRwb2ludCBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIHNldFF1ZXJ5U2NoZW1hKGNhbGxiYWNrOiAoc2NoZW1hOiBTY2hlbWFCdWlsZGVyKSA9PiB2b2lkKTogdGhpcyB7XG4gICAgY29uc3Qgc2NoZW1hID0gbmV3IFNjaGVtYUJ1aWxkZXIoKTtcbiAgICBjYWxsYmFjayhzY2hlbWEpO1xuICAgIHRoaXMucXVlcnlTY2hlbWEgPSBzY2hlbWE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2NoZW1hIHRvIHZhbGlkYXRlIHRoZSBwcm92aWRlZCByZXF1ZXN0IGJvZHkgYWdhaW5zdC5cbiAgICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBidWlsZCB0aGUgc2NoZW1hLlxuICAgKiBAcmV0dXJucyBUaGUgZW5kcG9pbnQgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBzZXRCb2R5U2NoZW1hKGNhbGxiYWNrOiAoc2NoZW1hOiBTY2hlbWFCdWlsZGVyKSA9PiB2b2lkKTogdGhpcyB7XG4gICAgY29uc3Qgc2NoZW1hID0gbmV3IFNjaGVtYUJ1aWxkZXIoKTtcbiAgICBjYWxsYmFjayhzY2hlbWEpO1xuICAgIHRoaXMuYm9keVNjaGVtYSA9IHNjaGVtYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSByZXNwb25zZXMgb2YgdGhlIGVuZHBvaW50LlxuICAgKiBAcGFyYW0gcmVzcG9uc2VzIFRoZSByZXNwb25zZXMgb2YgdGhlIGVuZHBvaW50LlxuICAgKiBAcmV0dXJucyBUaGUgZW5kcG9pbnQgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBzZXRSZXNwb25zZXMocmVzcG9uc2VzOiBFbmRwb2ludFJlc3BvbnNlW10pOiB0aGlzIHtcbiAgICB0aGlzLnJlc3BvbnNlcyA9IHJlc3BvbnNlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjb250cm9sZXIgdG8gcnVuLlxuICAgKiBAcGFyYW0gY29udHJvbGxlciBUaGUgY29udHJvbGxsZXIgZnVuY3Rpb24gdG8gcnVuLlxuICAgKiBAcmV0dXJucyBUaGUgZW5kcG9pbnQgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBzZXRDb250cm9sbGVyKFxuICAgIGNvbnRyb2xsZXI6IChcbiAgICAgIHJlcTogUmVxdWVzdCxcbiAgICAgIHJlczogUmVzcG9uc2UsXG4gICAgICBzZXNzaW9uOiBDbGllbnRTZXNzaW9uXG4gICAgKSA9PiBQcm9taXNlPHVua25vd24+IHwgdW5rbm93blxuICApOiB0aGlzIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSB3aXRoRXJyb3JIYW5kbGluZyhjb250cm9sbGVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgZW5kcG9pbnQgZnVuY3Rpb24uXG4gICAqIEBwYXJhbSByZXEgVGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSByZXMgVGhlIHJlc3BvbnNlLlxuICAgKiBAcGFyYW0gbmV4dCBUaGUgbmV4dCBmdW5jdGlvbi5cbiAgICovXG4gIHB1YmxpYyBleGVjdXRlID0gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKTogdm9pZCA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ1tUXSBydW5uaW5nIGNvbnRyb2xsZXInKTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBWYWxpZGF0ZSB0aGUgcmVxdWVzdFxuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5wYXJhbVNjaGVtYSAmJlxuICAgICAgICAgIChhd2FpdCB0aGlzLnBhcmFtU2NoZW1hLnZhbGlkYXRlKHJlcS5wYXJhbXMsIHsgcmVzIH0pKVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5xdWVyeVNjaGVtYSAmJlxuICAgICAgICAgIChhd2FpdCB0aGlzLnF1ZXJ5U2NoZW1hLnZhbGlkYXRlKHJlcS5xdWVyeSwgeyByZXMgfSkpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmJvZHlTY2hlbWEgJiZcbiAgICAgICAgICAoYXdhaXQgdGhpcy5ib2R5U2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5IGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCB7XG4gICAgICAgICAgICByZXMsXG4gICAgICAgICAgfSkpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgbG9nZ2VyLmluZm8oJ1tUXSBydW5uaW5nIGNvbnRyb2xsZXIgIzInKTtcblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGV4ZWN1dGlvbiBvZiB0aGUgY29udHJvbGxlclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyKSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oJ1tUXSBydW5uaW5nIGNvbnRyb2xsZXIgIzMnKTtcbiAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIocmVxLCByZXMsIG5leHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKCdbVF0gcnVubmluZyBjb250cm9sbGVyICM0Jyk7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgYEVuZHBvaW50ICgke3RoaXMubmFtZSB8fCB0aGlzLnBhdGh9KTogQ29udHJvbGxlciBub3Qgc2V0YFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICAgICAgICBtZXNzYWdlOiAnQ29udHJvbGxlciBub3Qgc2V0IGZvciBlbmRwb2ludC4nLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgfVxuICAgIH0pKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgZW5kcG9pbnQuXG4gICAqL1xuICBwdWJsaWMgdmFsaWRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRyb2xsZXIpIHRocm93IG5ldyBQYWNrYWdlRXJyb3IoJ0NvbnRyb2xsZXIgbm90IHNldCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIGVuZHBvaW50LlxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgZW5kcG9pbnQuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IFJlYWRvbmx5PEV4cG9ydGVkRW5kcG9pbnQ+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBwYXRoOiB0aGlzLnBhdGggPT09ICcvJyA/ICcnIDogdGhpcy5wYXRoLFxuICAgICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcbiAgICAgIG5vdGVzOiB0aGlzLm5vdGVzLFxuICAgICAgcGFyYW1zOiB0aGlzLnBhcmFtU2NoZW1hID8gdGhpcy5wYXJhbVNjaGVtYS5leHBvcnQoKSA6IHt9LFxuICAgICAgcXVlcmllczogdGhpcy5xdWVyeVNjaGVtYSA/IHRoaXMucXVlcnlTY2hlbWEuZXhwb3J0KCkgOiB7fSxcbiAgICAgIGJvZHk6IHRoaXMuYm9keVNjaGVtYSA/IHRoaXMuYm9keVNjaGVtYS5leHBvcnQoKSA6IHt9LFxuICAgICAgcmVzcG9uc2VzOiB0aGlzLnJlc3BvbnNlcyxcbiAgICB9O1xuICB9XG59XG4iXX0=