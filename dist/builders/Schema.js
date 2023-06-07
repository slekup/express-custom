"use strict";
//  Disable the no-param-reassign rule as it is needed to assign default values to undefined parameters.
/* eslint-disable no-param-reassign */
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("@utils/validate");
const Value_1 = require("./Value");
/**
 * The Schema Builder class.
 */
class SchemaBuilder {
    schema;
    /**
     * Creates a new schema.
     */
    constructor() {
        this.schema = {};
    }
    /**
     * Adds a array value to the schema.
     * @param options The options of the array value.
     * @returns The schema builder.
     */
    addArray(options) {
        const value = new Value_1.ArrayValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a string value to the schema.
     * @param options The options of the string value.
     * @returns The schema builder.
     */
    addString(options) {
        const value = new Value_1.StringValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a number value to the schema.
     * @param options The options of the number value.
     * @returns The schema builder.
     */
    addNumber(options) {
        const value = new Value_1.NumberValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a integer value to the schema.
     * @param options The options of the integer value.
     * @returns The schema builder.
     */
    addInteger(options) {
        const value = new Value_1.IntegerValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a boolean value to the schema.
     * @param options The options of the boolean value.
     * @returns The schema builder.
     */
    addBoolean(options) {
        const value = new Value_1.BooleanValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a object value to the schema.
     * @param options The options of the object value.
     * @returns The schema builder.
     */
    addObject(options) {
        const value = new Value_1.ObjectValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a image value to the schema.
     * @param options The options of the image value.
     * @returns The schema builder.
     */
    addImage(options) {
        const value = new Value_1.ImageValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Validate an object against a schema.
     * @param data The object data to validate.
     * @param schema The schema to validate against.
     * @param properties Whether to validate the schema properties or not.
     * @returns A string if the validation fails, false otherwise.
     */
    async validateBase(data, schema, properties) {
        // Check if the data is an object
        if (typeof data !== 'object')
            return 'The data provided must be an object.';
        const schemaFields = properties
            ? Object.entries(schema)
            : Object.entries(schema);
        for (const [key, value] of schemaFields) {
            // Check if all required fields have been provided.
            // If the field has a default value as the required value is not provided, set the field to the default value.
            if (value.required) {
                if (!data[key] && value.defaultValue) {
                    data[key] = value.defaultValue;
                    break;
                }
                else if (!data[key]) {
                    return `The field "${key}" has not been provided.`;
                }
            }
            // For non required fields, if the value is not provided, set the field to the default value if it exists.
            if (!data[key] && value.defaultValue) {
                data[key] = value.defaultValue;
                return false;
            }
            else if (!data[key]) {
                return false;
            }
        }
        // Check if all provided fields are the correct type
        for (const [key, value] of schemaFields) {
            if (typeof data[key] !== value.type)
                return `The field "${key}" must be of type ${value.type}.`;
        }
        // Check if all provided fields are valid
        for (const [key, value] of schemaFields) {
            // Number validation
            if (value.type === 'number') {
                // If both min and max are provided, check if the schema value is within the range
                if (value.min &&
                    value.max &&
                    typeof data[key] === 'number' &&
                    (data[key] < value.min ||
                        data[key] > value.max))
                    return `The field "${key}" must be between ${value.min} and ${value.max}.`;
                // Check if the schema value is above the minimum required value
                if (value.min &&
                    typeof data[key] === 'number' &&
                    data[key] < value.min)
                    return `The field "${key}" must be at least ${value.min}.`;
                // Check if the schema value is below the maximum required value
                if (value.max &&
                    typeof data[key] === 'number' &&
                    data[key] > value.max)
                    return `The field "${key}" must be less than ${value.max}.`;
            }
            // Integer validation
            if (value.type === 'integer') {
                // If both min and max are provided, check if the schema value is within the range
                if (value.min &&
                    value.max &&
                    typeof data[key] === 'number' &&
                    (data[key] < value.min ||
                        data[key] > value.max))
                    return `The field "${key}" must be between ${value.min} and ${value.max}.`;
                // Check if the schema value is above the minimum required value
                if (value.min &&
                    typeof data[key] === 'number' &&
                    data[key] < value.min)
                    return `The field "${key}" must be at least ${value.min}.`;
                // Check if the schema value is below the maximum required value
                if (value.max &&
                    typeof data[key] === 'number' &&
                    data[key] > value.max)
                    return `The field "${key}" must be less than ${value.max}.`;
                // Check if the schema value is an integer
                if (typeof data[key] !== 'number' ||
                    !Number.isInteger(data[key]))
                    return `The field "${key}" must be an integer.`;
            }
            // String validation
            if (value.type === 'string') {
                const req = value;
                const testVal = data[key];
                // Check if the schema value is included in the schema options
                if (value.options && !value.options.includes(data[key]))
                    return `The field "${key}" is not a valid option.`;
                // If both min and max are provided, check if the schema value is within the range
                if (value.min &&
                    value.max &&
                    (testVal.length < value.min || testVal.length > value.max))
                    return `The field "${key}" must be between ${value.min} and ${value.max} characters.`;
                // Check if the schema value has the minimum required length
                if (value.min && testVal.length < value.min)
                    return `The field "${key}" must be at least ${value.min} characters.`;
                // Check if the schema value has the maximum required length
                if (value.max && testVal.length > value.max)
                    return `The field "${key}" must be less than ${value.max} characters.`;
                // Test if email is valid
                if (req.test === 'email' && !(0, validate_1.validateEmail)(testVal))
                    return `The field "${key}" must be a valid email address.`;
                // Test if username is valid
                if (req.test === 'username' && !(0, validate_1.validateUsername)(testVal))
                    return `The field "${key}" must be a valid username.`;
                // Test if password is valid
                if (req.test === 'passwordStrength' && !(0, validate_1.valiedatePassword)(testVal))
                    return `The field "${key}" is too weak to be a valid password.`;
                // Test if phone number is valid
                if (req.test === 'phoneNumber' && !(0, validate_1.validatePhoneNumber)(testVal))
                    return `The field "${key}" must be a valid phone number.`;
                // Test if IPv4 address is valid
                if (req.test === 'ipAddress' && !(0, validate_1.validateIpv4Address)(testVal))
                    return `The field "${key}" must be a valid IPv4 address.`;
                // Test if a url is valid
                if (req.test === 'url' && !(0, validate_1.validateUrl)(testVal))
                    return `The field "${key}" must be a valid IPv4 address.`;
                // Test if a path is valid
                if (req.test === 'path' && !(0, validate_1.validatePath)(testVal))
                    return `The field "${key}" must be a valid path.`;
                // Test if the schema value is a string
                if (typeof data[key] !== 'string')
                    return `The field "${key}" must be a string.`;
            }
            // Check if the schema value passes all checks
            if (value.checks)
                for (const check of value.checks) {
                    const passedCheck = await check[0](key);
                    if (!passedCheck)
                        return `${check[1]}.`;
                }
            // Boolean validation
            if (value.type === 'boolean') {
                // TODO: Check this works
                // Check if the schema value is a boolean
                if (typeof data[key] !== 'boolean')
                    return `The field "${key}" must be a boolean.`;
            }
            // Object validation
            if (value.type === 'object') {
                // TODO: Check this works
                // Check if the schema value is an object
                if (typeof data[key] !== 'object')
                    return `The field "${key}" must be an object.`;
                // Check if the schema value has the correct properties
                if (value.properties && Object.keys(value.properties).length > 0) {
                    const result = await this.validateBase(data[key], value.properties, true);
                    if (result)
                        return result;
                }
            }
            // Array validation
            if (value.type === 'array') {
                // TODO: Check this works
                // Check if the schema value is an array
                if (!Array.isArray(data[key]))
                    return `The field "${key}" must be an array.`;
                // TODO: Check if the schema value has the correct items
                /* if (value.items) {
                  for (const item of data[key] as unknown[]) {
                    if (typeof item !== value.items.type)
                      return `The field "${key}" must be an array of ${value.items.type}.`;
                    if (!value.items.options.includes(item))
                      return `The field "${key}" must be an array of valid options.`;
                  }
                } */
            }
            // Image validation
            if (value.type === 'image') {
                // TODO: Check this works
                // Check if the schema value is a string
                if (typeof data[key] !== 'string')
                    return `The field "${key}" must be a string.`;
                // Check if the schema value is a valid image
                if (!(0, validate_1.validateImage)(data[key]))
                    return `The field "${key}" must be a valid image.`;
            }
        }
        return false;
    }
    /**
     * Run the validation function, and if the response object is provided, send a response if the validation fails.
     * @param data The object data to validate.
     * @param options The options to use when validating.
     * @param options.res The response object.
     * @returns A JSON response meaning it's invalid, or null if it's valid.
     */
    async validate(data, options) {
        const result = await this.validateBase(data, this.schema);
        if (typeof result !== 'string')
            return null;
        if (options?.res)
            return options.res.status(400).json({ status: 400, message: result });
        return result;
    }
    /**
     * Export the schema.
     * @returns The exported schema.
     */
    export() {
        const exportSchema = {};
        Object.entries(this.schema).forEach(([key, value]) => {
            const exportedValue = value.export();
            exportSchema[key] = exportedValue;
        });
        return exportSchema;
    }
}
exports.default = SchemaBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2J1aWxkZXJzL1NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0dBQXdHO0FBQ3hHLHNDQUFzQzs7QUFNdEMsOENBU3lCO0FBQ3pCLG1DQVFpQjtBQW9CakI7O0dBRUc7QUFDSCxNQUFxQixhQUFhO0lBQ3pCLE1BQU0sQ0FBaUI7SUFFOUI7O09BRUc7SUFDSDtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksUUFBUSxDQUFDLE9BQTBCO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFNBQVMsQ0FBQyxPQUEyQjtRQUMxQyxNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsT0FBMkI7UUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksVUFBVSxDQUFDLE9BQTRCO1FBQzVDLE1BQU0sS0FBSyxHQUFHLElBQUksb0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4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QUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFFBQVEsQ0FDbkIsSUFBNkIsRUFDN0IsT0FBNEI7UUFFNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDNUMsSUFBSSxPQUFPLEVBQUUsR0FBRztZQUNkLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN4RSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNYLE1BQU0sWUFBWSxHQUFrRCxFQUFFLENBQUM7UUFFdkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNuRCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFtQyxDQUFDO1lBQ3RFLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUF2V0QsZ0NBdVdDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIERpc2FibGUgdGhlIG5vLXBhcmFtLXJlYXNzaWduIHJ1bGUgYXMgaXQgaXMgbmVlZGVkIHRvIGFzc2lnbiBkZWZhdWx0IHZhbHVlcyB0byB1bmRlZmluZWQgcGFyYW1ldGVycy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCB7IEV4cG9ydGVkU2NoZW1hLCBFeHBvcnRlZFZhbHVlIH0gZnJvbSAnQHR5cGluZ3MvZXhwb3J0cyc7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tICdAdHlwaW5ncy9zY2hlbWEnO1xuaW1wb3J0IHtcbiAgdmFsaWRhdGVFbWFpbCxcbiAgdmFsaWRhdGVJbWFnZSxcbiAgdmFsaWRhdGVJcHY0QWRkcmVzcyxcbiAgdmFsaWRhdGVQYXRoLFxuICB2YWxpZGF0ZVBob25lTnVtYmVyLFxuICB2YWxpZGF0ZVVybCxcbiAgdmFsaWRhdGVVc2VybmFtZSxcbiAgdmFsaWVkYXRlUGFzc3dvcmQsXG59IGZyb20gJ0B1dGlscy92YWxpZGF0ZSc7XG5pbXBvcnQge1xuICBBcnJheVZhbHVlLFxuICBCb29sZWFuVmFsdWUsXG4gIEltYWdlVmFsdWUsXG4gIEludGVnZXJWYWx1ZSxcbiAgTnVtYmVyVmFsdWUsXG4gIE9iamVjdFZhbHVlLFxuICBTdHJpbmdWYWx1ZSxcbn0gZnJvbSAnLi9WYWx1ZSc7XG5pbXBvcnQgeyBBcnJheVZhbHVlT3B0aW9ucyB9IGZyb20gJy4vVmFsdWUvQXJyYXlWYWx1ZSc7XG5pbXBvcnQgeyBCb29sZWFuVmFsdWVPcHRpb25zIH0gZnJvbSAnLi9WYWx1ZS9Cb29sZWFuVmFsdWUnO1xuaW1wb3J0IHsgSW1hZ2VWYWx1ZU9wdGlvbnMgfSBmcm9tICcuL1ZhbHVlL0ltYWdlVmFsdWUnO1xuaW1wb3J0IHsgSW50ZWdlclZhbHVlT3B0aW9ucyB9IGZyb20gJy4vVmFsdWUvSW50ZWdlclZhbHVlJztcbmltcG9ydCB7IE51bWJlclZhbHVlT3B0aW9ucyB9IGZyb20gJy4vVmFsdWUvTnVtYmVyVmFsdWUnO1xuaW1wb3J0IHsgT2JqZWN0VmFsdWVPcHRpb25zIH0gZnJvbSAnLi9WYWx1ZS9PYmplY3RWYWx1ZSc7XG5pbXBvcnQgeyBTdHJpbmdWYWx1ZU9wdGlvbnMgfSBmcm9tICcuL1ZhbHVlL1N0cmluZ1ZhbHVlJztcblxudHlwZSBWYWx1ZUJ1aWxkZXJzID1cbiAgfCBBcnJheVZhbHVlXG4gIHwgU3RyaW5nVmFsdWVcbiAgfCBOdW1iZXJWYWx1ZVxuICB8IEludGVnZXJWYWx1ZVxuICB8IEJvb2xlYW5WYWx1ZVxuICB8IE9iamVjdFZhbHVlPFZhbHVlQnVpbGRlcnM+XG4gIHwgSW1hZ2VWYWx1ZTtcblxuZXhwb3J0IHR5cGUgQnVpbGRlcnNTY2hlbWEgPSBSZWNvcmQ8c3RyaW5nLCBWYWx1ZUJ1aWxkZXJzPjtcblxuLyoqXG4gKiBUaGUgU2NoZW1hIEJ1aWxkZXIgY2xhc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjaGVtYUJ1aWxkZXIge1xuICBwdWJsaWMgc2NoZW1hOiBCdWlsZGVyc1NjaGVtYTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zY2hlbWEgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgYXJyYXkgdmFsdWUgdG8gdGhlIHNjaGVtYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGFycmF5IHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgc2NoZW1hIGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgYWRkQXJyYXkob3B0aW9uczogQXJyYXlWYWx1ZU9wdGlvbnMpOiB0aGlzIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBBcnJheVZhbHVlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2NoZW1hW3ZhbHVlLm5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHN0cmluZyB2YWx1ZSB0byB0aGUgc2NoZW1hLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgc3RyaW5nIHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgc2NoZW1hIGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgYWRkU3RyaW5nKG9wdGlvbnM6IFN0cmluZ1ZhbHVlT3B0aW9ucyk6IHRoaXMge1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IFN0cmluZ1ZhbHVlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2NoZW1hW3ZhbHVlLm5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG51bWJlciB2YWx1ZSB0byB0aGUgc2NoZW1hLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgbnVtYmVyIHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgc2NoZW1hIGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgYWRkTnVtYmVyKG9wdGlvbnM6IE51bWJlclZhbHVlT3B0aW9ucyk6IHRoaXMge1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IE51bWJlclZhbHVlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2NoZW1hW3ZhbHVlLm5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGludGVnZXIgdmFsdWUgdG8gdGhlIHNjaGVtYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGludGVnZXIgdmFsdWUuXG4gICAqIEByZXR1cm5zIFRoZSBzY2hlbWEgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBhZGRJbnRlZ2VyKG9wdGlvbnM6IEludGVnZXJWYWx1ZU9wdGlvbnMpOiB0aGlzIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBJbnRlZ2VyVmFsdWUob3B0aW9ucyk7XG4gICAgdGhpcy5zY2hlbWFbdmFsdWUubmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgYm9vbGVhbiB2YWx1ZSB0byB0aGUgc2NoZW1hLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgYm9vbGVhbiB2YWx1ZS5cbiAgICogQHJldHVybnMgVGhlIHNjaGVtYSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZEJvb2xlYW4ob3B0aW9uczogQm9vbGVhblZhbHVlT3B0aW9ucyk6IHRoaXMge1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IEJvb2xlYW5WYWx1ZShvcHRpb25zKTtcbiAgICB0aGlzLnNjaGVtYVt2YWx1ZS5uYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBvYmplY3QgdmFsdWUgdG8gdGhlIHNjaGVtYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIG9iamVjdCB2YWx1ZS5cbiAgICogQHJldHVybnMgVGhlIHNjaGVtYSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZE9iamVjdChvcHRpb25zOiBPYmplY3RWYWx1ZU9wdGlvbnMpOiB0aGlzIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBPYmplY3RWYWx1ZTxWYWx1ZUJ1aWxkZXJzPihvcHRpb25zKTtcbiAgICB0aGlzLnNjaGVtYVt2YWx1ZS5uYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBpbWFnZSB2YWx1ZSB0byB0aGUgc2NoZW1hLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgaW1hZ2UgdmFsdWUuXG4gICAqIEByZXR1cm5zIFRoZSBzY2hlbWEgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBhZGRJbWFnZShvcHRpb25zOiBJbWFnZVZhbHVlT3B0aW9ucyk6IHRoaXMge1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IEltYWdlVmFsdWUob3B0aW9ucyk7XG4gICAgdGhpcy5zY2hlbWFbdmFsdWUubmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBhbiBvYmplY3QgYWdhaW5zdCBhIHNjaGVtYS5cbiAgICogQHBhcmFtIGRhdGEgVGhlIG9iamVjdCBkYXRhIHRvIHZhbGlkYXRlLlxuICAgKiBAcGFyYW0gc2NoZW1hIFRoZSBzY2hlbWEgdG8gdmFsaWRhdGUgYWdhaW5zdC5cbiAgICogQHBhcmFtIHByb3BlcnRpZXMgV2hldGhlciB0byB2YWxpZGF0ZSB0aGUgc2NoZW1hIHByb3BlcnRpZXMgb3Igbm90LlxuICAgKiBAcmV0dXJucyBBIHN0cmluZyBpZiB0aGUgdmFsaWRhdGlvbiBmYWlscywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyB2YWxpZGF0ZUJhc2U8VCA9ICdzY2hlbWEnPihcbiAgICBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgICBzY2hlbWE6XG4gICAgICB8IChUIGV4dGVuZHMgJ3NjaGVtYScgPyBCdWlsZGVyc1NjaGVtYSA6IG5ldmVyKVxuICAgICAgfCAoVCBleHRlbmRzICdwcm9wZXJ0aWVzJyA/IFNjaGVtYSA6IG5ldmVyKSxcbiAgICBwcm9wZXJ0aWVzPzogYm9vbGVhblxuICApOiBQcm9taXNlPHN0cmluZyB8IGJvb2xlYW4+IHtcbiAgICAvLyBDaGVjayBpZiB0aGUgZGF0YSBpcyBhbiBvYmplY3RcbiAgICBpZiAodHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSByZXR1cm4gJ1RoZSBkYXRhIHByb3ZpZGVkIG11c3QgYmUgYW4gb2JqZWN0Lic7XG5cbiAgICBjb25zdCBzY2hlbWFGaWVsZHMgPSBwcm9wZXJ0aWVzXG4gICAgICA/IE9iamVjdC5lbnRyaWVzKHNjaGVtYSBhcyBTY2hlbWEpXG4gICAgICA6IE9iamVjdC5lbnRyaWVzKHNjaGVtYSBhcyBCdWlsZGVyc1NjaGVtYSk7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBzY2hlbWFGaWVsZHMpIHtcbiAgICAgIC8vIENoZWNrIGlmIGFsbCByZXF1aXJlZCBmaWVsZHMgaGF2ZSBiZWVuIHByb3ZpZGVkLlxuICAgICAgLy8gSWYgdGhlIGZpZWxkIGhhcyBhIGRlZmF1bHQgdmFsdWUgYXMgdGhlIHJlcXVpcmVkIHZhbHVlIGlzIG5vdCBwcm92aWRlZCwgc2V0IHRoZSBmaWVsZCB0byB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAgICAgIGlmICh2YWx1ZS5yZXF1aXJlZCkge1xuICAgICAgICBpZiAoIWRhdGFba2V5XSAmJiB2YWx1ZS5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZS5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoIWRhdGFba2V5XSkge1xuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgaGFzIG5vdCBiZWVuIHByb3ZpZGVkLmA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRm9yIG5vbiByZXF1aXJlZCBmaWVsZHMsIGlmIHRoZSB2YWx1ZSBpcyBub3QgcHJvdmlkZWQsIHNldCB0aGUgZmllbGQgdG8gdGhlIGRlZmF1bHQgdmFsdWUgaWYgaXQgZXhpc3RzLlxuICAgICAgaWYgKCFkYXRhW2tleV0gJiYgdmFsdWUuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGRhdGFba2V5XSA9IHZhbHVlLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghZGF0YVtrZXldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBhbGwgcHJvdmlkZWQgZmllbGRzIGFyZSB0aGUgY29ycmVjdCB0eXBlXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc2NoZW1hRmllbGRzKSB7XG4gICAgICBpZiAodHlwZW9mIGRhdGFba2V5XSAhPT0gdmFsdWUudHlwZSlcbiAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIG9mIHR5cGUgJHt2YWx1ZS50eXBlfS5gO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIGFsbCBwcm92aWRlZCBmaWVsZHMgYXJlIHZhbGlkXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc2NoZW1hRmllbGRzKSB7XG4gICAgICAvLyBOdW1iZXIgdmFsaWRhdGlvblxuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIC8vIElmIGJvdGggbWluIGFuZCBtYXggYXJlIHByb3ZpZGVkLCBjaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIHdpdGhpbiB0aGUgcmFuZ2VcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHZhbHVlLm1pbiAmJlxuICAgICAgICAgIHZhbHVlLm1heCAmJlxuICAgICAgICAgIHR5cGVvZiBkYXRhW2tleV0gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgKChkYXRhW2tleV0gYXMgbnVtYmVyKSA8IHZhbHVlLm1pbiB8fFxuICAgICAgICAgICAgKGRhdGFba2V5XSBhcyBudW1iZXIpID4gdmFsdWUubWF4KVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGJldHdlZW4gJHt2YWx1ZS5taW59IGFuZCAke3ZhbHVlLm1heH0uYDtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGFib3ZlIHRoZSBtaW5pbXVtIHJlcXVpcmVkIHZhbHVlXG4gICAgICAgIGlmIChcbiAgICAgICAgICB2YWx1ZS5taW4gJiZcbiAgICAgICAgICB0eXBlb2YgZGF0YVtrZXldID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgIChkYXRhW2tleV0gYXMgbnVtYmVyKSA8IHZhbHVlLm1pblxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGF0IGxlYXN0ICR7dmFsdWUubWlufS5gO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYmVsb3cgdGhlIG1heGltdW0gcmVxdWlyZWQgdmFsdWVcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHZhbHVlLm1heCAmJlxuICAgICAgICAgIHR5cGVvZiBkYXRhW2tleV0gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgKGRhdGFba2V5XSBhcyBudW1iZXIpID4gdmFsdWUubWF4XG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgbGVzcyB0aGFuICR7dmFsdWUubWF4fS5gO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnRlZ2VyIHZhbGlkYXRpb25cbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSAnaW50ZWdlcicpIHtcbiAgICAgICAgLy8gSWYgYm90aCBtaW4gYW5kIG1heCBhcmUgcHJvdmlkZWQsIGNoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgd2l0aGluIHRoZSByYW5nZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgdmFsdWUubWluICYmXG4gICAgICAgICAgdmFsdWUubWF4ICYmXG4gICAgICAgICAgdHlwZW9mIGRhdGFba2V5XSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAoKGRhdGFba2V5XSBhcyBudW1iZXIpIDwgdmFsdWUubWluIHx8XG4gICAgICAgICAgICAoZGF0YVtrZXldIGFzIG51bWJlcikgPiB2YWx1ZS5tYXgpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYmV0d2VlbiAke3ZhbHVlLm1pbn0gYW5kICR7dmFsdWUubWF4fS5gO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYWJvdmUgdGhlIG1pbmltdW0gcmVxdWlyZWQgdmFsdWVcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHZhbHVlLm1pbiAmJlxuICAgICAgICAgIHR5cGVvZiBkYXRhW2tleV0gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgKGRhdGFba2V5XSBhcyBudW1iZXIpIDwgdmFsdWUubWluXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYXQgbGVhc3QgJHt2YWx1ZS5taW59LmA7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBiZWxvdyB0aGUgbWF4aW11bSByZXF1aXJlZCB2YWx1ZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgdmFsdWUubWF4ICYmXG4gICAgICAgICAgdHlwZW9mIGRhdGFba2V5XSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAoZGF0YVtrZXldIGFzIG51bWJlcikgPiB2YWx1ZS5tYXhcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBsZXNzIHRoYW4gJHt2YWx1ZS5tYXh9LmA7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlb2YgZGF0YVtrZXldICE9PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKGRhdGFba2V5XSBhcyBudW1iZXIpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYW4gaW50ZWdlci5gO1xuICAgICAgfVxuXG4gICAgICAvLyBTdHJpbmcgdmFsaWRhdGlvblxuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHJlcSA9IHZhbHVlO1xuICAgICAgICBjb25zdCB0ZXN0VmFsID0gZGF0YVtrZXldIGFzIHN0cmluZztcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGluY2x1ZGVkIGluIHRoZSBzY2hlbWEgb3B0aW9uc1xuICAgICAgICBpZiAodmFsdWUub3B0aW9ucyAmJiAhdmFsdWUub3B0aW9ucy5pbmNsdWRlcyhkYXRhW2tleV0gYXMgc3RyaW5nKSlcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIGlzIG5vdCBhIHZhbGlkIG9wdGlvbi5gO1xuXG4gICAgICAgIC8vIElmIGJvdGggbWluIGFuZCBtYXggYXJlIHByb3ZpZGVkLCBjaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIHdpdGhpbiB0aGUgcmFuZ2VcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHZhbHVlLm1pbiAmJlxuICAgICAgICAgIHZhbHVlLm1heCAmJlxuICAgICAgICAgICh0ZXN0VmFsLmxlbmd0aCA8IHZhbHVlLm1pbiB8fCB0ZXN0VmFsLmxlbmd0aCA+IHZhbHVlLm1heClcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBiZXR3ZWVuICR7dmFsdWUubWlufSBhbmQgJHt2YWx1ZS5tYXh9IGNoYXJhY3RlcnMuYDtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGhhcyB0aGUgbWluaW11bSByZXF1aXJlZCBsZW5ndGhcbiAgICAgICAgaWYgKHZhbHVlLm1pbiAmJiB0ZXN0VmFsLmxlbmd0aCA8IHZhbHVlLm1pbilcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYXQgbGVhc3QgJHt2YWx1ZS5taW59IGNoYXJhY3RlcnMuYDtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGhhcyB0aGUgbWF4aW11bSByZXF1aXJlZCBsZW5ndGhcbiAgICAgICAgaWYgKHZhbHVlLm1heCAmJiB0ZXN0VmFsLmxlbmd0aCA+IHZhbHVlLm1heClcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgbGVzcyB0aGFuICR7dmFsdWUubWF4fSBjaGFyYWN0ZXJzLmA7XG5cbiAgICAgICAgLy8gVGVzdCBpZiBlbWFpbCBpcyB2YWxpZFxuICAgICAgICBpZiAocmVxLnRlc3QgPT09ICdlbWFpbCcgJiYgIXZhbGlkYXRlRW1haWwodGVzdFZhbCkpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5gO1xuXG4gICAgICAgIC8vIFRlc3QgaWYgdXNlcm5hbWUgaXMgdmFsaWRcbiAgICAgICAgaWYgKHJlcS50ZXN0ID09PSAndXNlcm5hbWUnICYmICF2YWxpZGF0ZVVzZXJuYW1lKHRlc3RWYWwpKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHZhbGlkIHVzZXJuYW1lLmA7XG5cbiAgICAgICAgLy8gVGVzdCBpZiBwYXNzd29yZCBpcyB2YWxpZFxuICAgICAgICBpZiAocmVxLnRlc3QgPT09ICdwYXNzd29yZFN0cmVuZ3RoJyAmJiAhdmFsaWVkYXRlUGFzc3dvcmQodGVzdFZhbCkpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBpcyB0b28gd2VhayB0byBiZSBhIHZhbGlkIHBhc3N3b3JkLmA7XG5cbiAgICAgICAgLy8gVGVzdCBpZiBwaG9uZSBudW1iZXIgaXMgdmFsaWRcbiAgICAgICAgaWYgKHJlcS50ZXN0ID09PSAncGhvbmVOdW1iZXInICYmICF2YWxpZGF0ZVBob25lTnVtYmVyKHRlc3RWYWwpKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHZhbGlkIHBob25lIG51bWJlci5gO1xuXG4gICAgICAgIC8vIFRlc3QgaWYgSVB2NCBhZGRyZXNzIGlzIHZhbGlkXG4gICAgICAgIGlmIChyZXEudGVzdCA9PT0gJ2lwQWRkcmVzcycgJiYgIXZhbGlkYXRlSXB2NEFkZHJlc3ModGVzdFZhbCkpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgdmFsaWQgSVB2NCBhZGRyZXNzLmA7XG5cbiAgICAgICAgLy8gVGVzdCBpZiBhIHVybCBpcyB2YWxpZFxuICAgICAgICBpZiAocmVxLnRlc3QgPT09ICd1cmwnICYmICF2YWxpZGF0ZVVybCh0ZXN0VmFsKSlcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYSB2YWxpZCBJUHY0IGFkZHJlc3MuYDtcblxuICAgICAgICAvLyBUZXN0IGlmIGEgcGF0aCBpcyB2YWxpZFxuICAgICAgICBpZiAocmVxLnRlc3QgPT09ICdwYXRoJyAmJiAhdmFsaWRhdGVQYXRoKHRlc3RWYWwpKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHZhbGlkIHBhdGguYDtcblxuICAgICAgICAvLyBUZXN0IGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYSBzdHJpbmdcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gIT09ICdzdHJpbmcnKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHN0cmluZy5gO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIHBhc3NlcyBhbGwgY2hlY2tzXG4gICAgICBpZiAodmFsdWUuY2hlY2tzKVxuICAgICAgICBmb3IgKGNvbnN0IGNoZWNrIG9mIHZhbHVlLmNoZWNrcykge1xuICAgICAgICAgIGNvbnN0IHBhc3NlZENoZWNrID0gYXdhaXQgY2hlY2tbMF0oa2V5KTtcbiAgICAgICAgICBpZiAoIXBhc3NlZENoZWNrKSByZXR1cm4gYCR7Y2hlY2tbMV19LmA7XG4gICAgICAgIH1cblxuICAgICAgLy8gQm9vbGVhbiB2YWxpZGF0aW9uXG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIC8vIFRPRE86IENoZWNrIHRoaXMgd29ya3NcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBhIGJvb2xlYW5cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gIT09ICdib29sZWFuJylcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYSBib29sZWFuLmA7XG4gICAgICB9XG5cbiAgICAgIC8vIE9iamVjdCB2YWxpZGF0aW9uXG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gVE9ETzogQ2hlY2sgdGhpcyB3b3Jrc1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGFuIG9iamVjdFxuICAgICAgICBpZiAodHlwZW9mIGRhdGFba2V5XSAhPT0gJ29iamVjdCcpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGFuIG9iamVjdC5gO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaGFzIHRoZSBjb3JyZWN0IHByb3BlcnRpZXNcbiAgICAgICAgaWYgKHZhbHVlLnByb3BlcnRpZXMgJiYgT2JqZWN0LmtleXModmFsdWUucHJvcGVydGllcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMudmFsaWRhdGVCYXNlPCdwcm9wZXJ0aWVzJz4oXG4gICAgICAgICAgICBkYXRhW2tleV0gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICAgICAgICAgICB2YWx1ZS5wcm9wZXJ0aWVzIGFzIFNjaGVtYSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQXJyYXkgdmFsaWRhdGlvblxuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgLy8gVE9ETzogQ2hlY2sgdGhpcyB3b3Jrc1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGFuIGFycmF5XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhbiBhcnJheS5gO1xuXG4gICAgICAgIC8vIFRPRE86IENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaGFzIHRoZSBjb3JyZWN0IGl0ZW1zXG4gICAgICAgIC8qIGlmICh2YWx1ZS5pdGVtcykge1xuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBkYXRhW2tleV0gYXMgdW5rbm93bltdKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gIT09IHZhbHVlLml0ZW1zLnR5cGUpXG4gICAgICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhbiBhcnJheSBvZiAke3ZhbHVlLml0ZW1zLnR5cGV9LmA7XG4gICAgICAgICAgICBpZiAoIXZhbHVlLml0ZW1zLm9wdGlvbnMuaW5jbHVkZXMoaXRlbSkpXG4gICAgICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhbiBhcnJheSBvZiB2YWxpZCBvcHRpb25zLmA7XG4gICAgICAgICAgfVxuICAgICAgICB9ICovXG4gICAgICB9XG5cbiAgICAgIC8vIEltYWdlIHZhbGlkYXRpb25cbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgIC8vIFRPRE86IENoZWNrIHRoaXMgd29ya3NcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBhIHN0cmluZ1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFba2V5XSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgc3RyaW5nLmA7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBhIHZhbGlkIGltYWdlXG4gICAgICAgIGlmICghdmFsaWRhdGVJbWFnZShkYXRhW2tleV0gYXMgc3RyaW5nKSlcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYSB2YWxpZCBpbWFnZS5gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW4gdGhlIHZhbGlkYXRpb24gZnVuY3Rpb24sIGFuZCBpZiB0aGUgcmVzcG9uc2Ugb2JqZWN0IGlzIHByb3ZpZGVkLCBzZW5kIGEgcmVzcG9uc2UgaWYgdGhlIHZhbGlkYXRpb24gZmFpbHMuXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBvYmplY3QgZGF0YSB0byB2YWxpZGF0ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gdXNlIHdoZW4gdmFsaWRhdGluZy5cbiAgICogQHBhcmFtIG9wdGlvbnMucmVzIFRoZSByZXNwb25zZSBvYmplY3QuXG4gICAqIEByZXR1cm5zIEEgSlNPTiByZXNwb25zZSBtZWFuaW5nIGl0J3MgaW52YWxpZCwgb3IgbnVsbCBpZiBpdCdzIHZhbGlkLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHZhbGlkYXRlKFxuICAgIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICAgIG9wdGlvbnM/OiB7IHJlcz86IFJlc3BvbnNlIH1cbiAgKTogUHJvbWlzZTxSZXNwb25zZSB8IG51bGwgfCBzdHJpbmc+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnZhbGlkYXRlQmFzZShkYXRhLCB0aGlzLnNjaGVtYSk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgIT09ICdzdHJpbmcnKSByZXR1cm4gbnVsbDtcbiAgICBpZiAob3B0aW9ucz8ucmVzKVxuICAgICAgcmV0dXJuIG9wdGlvbnMucmVzLnN0YXR1cyg0MDApLmpzb24oeyBzdGF0dXM6IDQwMCwgbWVzc2FnZTogcmVzdWx0IH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0IHRoZSBzY2hlbWEuXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IEV4cG9ydGVkU2NoZW1hIHtcbiAgICBjb25zdCBleHBvcnRTY2hlbWE6IFJlY29yZDxzdHJpbmcsIEV4cG9ydGVkVmFsdWU8RXhwb3J0ZWRTY2hlbWE+PiA9IHt9O1xuXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5zY2hlbWEpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgY29uc3QgZXhwb3J0ZWRWYWx1ZSA9IHZhbHVlLmV4cG9ydCgpIGFzIEV4cG9ydGVkVmFsdWU8RXhwb3J0ZWRTY2hlbWE+O1xuICAgICAgZXhwb3J0U2NoZW1hW2tleV0gPSBleHBvcnRlZFZhbHVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGV4cG9ydFNjaGVtYTtcbiAgfVxufVxuIl19