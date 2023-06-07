//  Disable the no-param-reassign rule as it is needed to assign default values to undefined parameters.
/* eslint-disable no-param-reassign */
import { validateEmail, validateImage, validateIpv4Address, validatePath, validatePhoneNumber, validateUrl, validateUsername, valiedatePassword, } from '@utils/validate';
import { ArrayValue, BooleanValue, ImageValue, IntegerValue, NumberValue, ObjectValue, StringValue, } from './Value';
/**
 * The Schema Builder class.
 */
export default class SchemaBuilder {
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
        const value = new ArrayValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a string value to the schema.
     * @param options The options of the string value.
     * @returns The schema builder.
     */
    addString(options) {
        const value = new StringValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a number value to the schema.
     * @param options The options of the number value.
     * @returns The schema builder.
     */
    addNumber(options) {
        const value = new NumberValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a integer value to the schema.
     * @param options The options of the integer value.
     * @returns The schema builder.
     */
    addInteger(options) {
        const value = new IntegerValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a boolean value to the schema.
     * @param options The options of the boolean value.
     * @returns The schema builder.
     */
    addBoolean(options) {
        const value = new BooleanValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a object value to the schema.
     * @param options The options of the object value.
     * @returns The schema builder.
     */
    addObject(options) {
        const value = new ObjectValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a image value to the schema.
     * @param options The options of the image value.
     * @returns The schema builder.
     */
    addImage(options) {
        const value = new ImageValue(options);
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
                if (req.test === 'email' && !validateEmail(testVal))
                    return `The field "${key}" must be a valid email address.`;
                // Test if username is valid
                if (req.test === 'username' && !validateUsername(testVal))
                    return `The field "${key}" must be a valid username.`;
                // Test if password is valid
                if (req.test === 'passwordStrength' && !valiedatePassword(testVal))
                    return `The field "${key}" is too weak to be a valid password.`;
                // Test if phone number is valid
                if (req.test === 'phoneNumber' && !validatePhoneNumber(testVal))
                    return `The field "${key}" must be a valid phone number.`;
                // Test if IPv4 address is valid
                if (req.test === 'ipAddress' && !validateIpv4Address(testVal))
                    return `The field "${key}" must be a valid IPv4 address.`;
                // Test if a url is valid
                if (req.test === 'url' && !validateUrl(testVal))
                    return `The field "${key}" must be a valid IPv4 address.`;
                // Test if a path is valid
                if (req.test === 'path' && !validatePath(testVal))
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
                if (!validateImage(data[key]))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2J1aWxkZXJzL1NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3R0FBd0c7QUFDeEcsc0NBQXNDO0FBTXRDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsV0FBVyxFQUNYLFdBQVcsR0FDWixNQUFNLFNBQVMsQ0FBQztBQW9CakI7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWE7SUFDekIsTUFBTSxDQUFpQjtJQUU5Qjs7T0FFRztJQUNIO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRLENBQUMsT0FBMEI7UUFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsT0FBMkI7UUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsT0FBMkI7UUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFB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by1wYXJhbS1yZWFzc2lnbiBydWxlIGFzIGl0IGlzIG5lZWRlZCB0byBhc3NpZ24gZGVmYXVsdCB2YWx1ZXMgdG8gdW5kZWZpbmVkIHBhcmFtZXRlcnMuXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXHJcblxyXG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5cclxuaW1wb3J0IHsgRXhwb3J0ZWRTY2hlbWEsIEV4cG9ydGVkVmFsdWUgfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcclxuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcclxuaW1wb3J0IHtcclxuICB2YWxpZGF0ZUVtYWlsLFxyXG4gIHZhbGlkYXRlSW1hZ2UsXHJcbiAgdmFsaWRhdGVJcHY0QWRkcmVzcyxcclxuICB2YWxpZGF0ZVBhdGgsXHJcbiAgdmFsaWRhdGVQaG9uZU51bWJlcixcclxuICB2YWxpZGF0ZVVybCxcclxuICB2YWxpZGF0ZVVzZXJuYW1lLFxyXG4gIHZhbGllZGF0ZVBhc3N3b3JkLFxyXG59IGZyb20gJ0B1dGlscy92YWxpZGF0ZSc7XHJcbmltcG9ydCB7XHJcbiAgQXJyYXlWYWx1ZSxcclxuICBCb29sZWFuVmFsdWUsXHJcbiAgSW1hZ2VWYWx1ZSxcclxuICBJbnRlZ2VyVmFsdWUsXHJcbiAgTnVtYmVyVmFsdWUsXHJcbiAgT2JqZWN0VmFsdWUsXHJcbiAgU3RyaW5nVmFsdWUsXHJcbn0gZnJvbSAnLi9WYWx1ZSc7XHJcbmltcG9ydCB7IEFycmF5VmFsdWVPcHRpb25zIH0gZnJvbSAnLi9WYWx1ZS9BcnJheVZhbHVlJztcclxuaW1wb3J0IHsgQm9vbGVhblZhbHVlT3B0aW9ucyB9IGZyb20gJy4vVmFsdWUvQm9vbGVhblZhbHVlJztcclxuaW1wb3J0IHsgSW1hZ2VWYWx1ZU9wdGlvbnMgfSBmcm9tICcuL1ZhbHVlL0ltYWdlVmFsdWUnO1xyXG5pbXBvcnQgeyBJbnRlZ2VyVmFsdWVPcHRpb25zIH0gZnJvbSAnLi9WYWx1ZS9JbnRlZ2VyVmFsdWUnO1xyXG5pbXBvcnQgeyBOdW1iZXJWYWx1ZU9wdGlvbnMgfSBmcm9tICcuL1ZhbHVlL051bWJlclZhbHVlJztcclxuaW1wb3J0IHsgT2JqZWN0VmFsdWVPcHRpb25zIH0gZnJvbSAnLi9WYWx1ZS9PYmplY3RWYWx1ZSc7XHJcbmltcG9ydCB7IFN0cmluZ1ZhbHVlT3B0aW9ucyB9IGZyb20gJy4vVmFsdWUvU3RyaW5nVmFsdWUnO1xyXG5cclxudHlwZSBWYWx1ZUJ1aWxkZXJzID1cclxuICB8IEFycmF5VmFsdWVcclxuICB8IFN0cmluZ1ZhbHVlXHJcbiAgfCBOdW1iZXJWYWx1ZVxyXG4gIHwgSW50ZWdlclZhbHVlXHJcbiAgfCBCb29sZWFuVmFsdWVcclxuICB8IE9iamVjdFZhbHVlPFZhbHVlQnVpbGRlcnM+XHJcbiAgfCBJbWFnZVZhbHVlO1xyXG5cclxuZXhwb3J0IHR5cGUgQnVpbGRlcnNTY2hlbWEgPSBSZWNvcmQ8c3RyaW5nLCBWYWx1ZUJ1aWxkZXJzPjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgU2NoZW1hIEJ1aWxkZXIgY2xhc3MuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2hlbWFCdWlsZGVyIHtcclxuICBwdWJsaWMgc2NoZW1hOiBCdWlsZGVyc1NjaGVtYTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zY2hlbWEgPSB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBhcnJheSB2YWx1ZSB0byB0aGUgc2NoZW1hLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBhcnJheSB2YWx1ZS5cclxuICAgKiBAcmV0dXJucyBUaGUgc2NoZW1hIGJ1aWxkZXIuXHJcbiAgICovXHJcbiAgcHVibGljIGFkZEFycmF5KG9wdGlvbnM6IEFycmF5VmFsdWVPcHRpb25zKTogdGhpcyB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBBcnJheVZhbHVlKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5zY2hlbWFbdmFsdWUubmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHN0cmluZyB2YWx1ZSB0byB0aGUgc2NoZW1hLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBzdHJpbmcgdmFsdWUuXHJcbiAgICogQHJldHVybnMgVGhlIHNjaGVtYSBidWlsZGVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRTdHJpbmcob3B0aW9uczogU3RyaW5nVmFsdWVPcHRpb25zKTogdGhpcyB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBTdHJpbmdWYWx1ZShvcHRpb25zKTtcclxuICAgIHRoaXMuc2NoZW1hW3ZhbHVlLm5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBudW1iZXIgdmFsdWUgdG8gdGhlIHNjaGVtYS5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgbnVtYmVyIHZhbHVlLlxyXG4gICAqIEByZXR1cm5zIFRoZSBzY2hlbWEgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkTnVtYmVyKG9wdGlvbnM6IE51bWJlclZhbHVlT3B0aW9ucyk6IHRoaXMge1xyXG4gICAgY29uc3QgdmFsdWUgPSBuZXcgTnVtYmVyVmFsdWUob3B0aW9ucyk7XHJcbiAgICB0aGlzLnNjaGVtYVt2YWx1ZS5uYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgaW50ZWdlciB2YWx1ZSB0byB0aGUgc2NoZW1hLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBpbnRlZ2VyIHZhbHVlLlxyXG4gICAqIEByZXR1cm5zIFRoZSBzY2hlbWEgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkSW50ZWdlcihvcHRpb25zOiBJbnRlZ2VyVmFsdWVPcHRpb25zKTogdGhpcyB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBJbnRlZ2VyVmFsdWUob3B0aW9ucyk7XHJcbiAgICB0aGlzLnNjaGVtYVt2YWx1ZS5uYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgYm9vbGVhbiB2YWx1ZSB0byB0aGUgc2NoZW1hLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBib29sZWFuIHZhbHVlLlxyXG4gICAqIEByZXR1cm5zIFRoZSBzY2hlbWEgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkQm9vbGVhbihvcHRpb25zOiBCb29sZWFuVmFsdWVPcHRpb25zKTogdGhpcyB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBCb29sZWFuVmFsdWUob3B0aW9ucyk7XHJcbiAgICB0aGlzLnNjaGVtYVt2YWx1ZS5uYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgb2JqZWN0IHZhbHVlIHRvIHRoZSBzY2hlbWEuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIG9iamVjdCB2YWx1ZS5cclxuICAgKiBAcmV0dXJucyBUaGUgc2NoZW1hIGJ1aWxkZXIuXHJcbiAgICovXHJcbiAgcHVibGljIGFkZE9iamVjdChvcHRpb25zOiBPYmplY3RWYWx1ZU9wdGlvbnMpOiB0aGlzIHtcclxuICAgIGNvbnN0IHZhbHVlID0gbmV3IE9iamVjdFZhbHVlPFZhbHVlQnVpbGRlcnM+KG9wdGlvbnMpO1xyXG4gICAgdGhpcy5zY2hlbWFbdmFsdWUubmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIGltYWdlIHZhbHVlIHRvIHRoZSBzY2hlbWEuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGltYWdlIHZhbHVlLlxyXG4gICAqIEByZXR1cm5zIFRoZSBzY2hlbWEgYnVpbGRlci5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkSW1hZ2Uob3B0aW9uczogSW1hZ2VWYWx1ZU9wdGlvbnMpOiB0aGlzIHtcclxuICAgIGNvbnN0IHZhbHVlID0gbmV3IEltYWdlVmFsdWUob3B0aW9ucyk7XHJcbiAgICB0aGlzLnNjaGVtYVt2YWx1ZS5uYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0ZSBhbiBvYmplY3QgYWdhaW5zdCBhIHNjaGVtYS5cclxuICAgKiBAcGFyYW0gZGF0YSBUaGUgb2JqZWN0IGRhdGEgdG8gdmFsaWRhdGUuXHJcbiAgICogQHBhcmFtIHNjaGVtYSBUaGUgc2NoZW1hIHRvIHZhbGlkYXRlIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgV2hldGhlciB0byB2YWxpZGF0ZSB0aGUgc2NoZW1hIHByb3BlcnRpZXMgb3Igbm90LlxyXG4gICAqIEByZXR1cm5zIEEgc3RyaW5nIGlmIHRoZSB2YWxpZGF0aW9uIGZhaWxzLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyB2YWxpZGF0ZUJhc2U8VCA9ICdzY2hlbWEnPihcclxuICAgIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxyXG4gICAgc2NoZW1hOlxyXG4gICAgICB8IChUIGV4dGVuZHMgJ3NjaGVtYScgPyBCdWlsZGVyc1NjaGVtYSA6IG5ldmVyKVxyXG4gICAgICB8IChUIGV4dGVuZHMgJ3Byb3BlcnRpZXMnID8gU2NoZW1hIDogbmV2ZXIpLFxyXG4gICAgcHJvcGVydGllcz86IGJvb2xlYW5cclxuICApOiBQcm9taXNlPHN0cmluZyB8IGJvb2xlYW4+IHtcclxuICAgIC8vIENoZWNrIGlmIHRoZSBkYXRhIGlzIGFuIG9iamVjdFxyXG4gICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JykgcmV0dXJuICdUaGUgZGF0YSBwcm92aWRlZCBtdXN0IGJlIGFuIG9iamVjdC4nO1xyXG5cclxuICAgIGNvbnN0IHNjaGVtYUZpZWxkcyA9IHByb3BlcnRpZXNcclxuICAgICAgPyBPYmplY3QuZW50cmllcyhzY2hlbWEgYXMgU2NoZW1hKVxyXG4gICAgICA6IE9iamVjdC5lbnRyaWVzKHNjaGVtYSBhcyBCdWlsZGVyc1NjaGVtYSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc2NoZW1hRmllbGRzKSB7XHJcbiAgICAgIC8vIENoZWNrIGlmIGFsbCByZXF1aXJlZCBmaWVsZHMgaGF2ZSBiZWVuIHByb3ZpZGVkLlxyXG4gICAgICAvLyBJZiB0aGUgZmllbGQgaGFzIGEgZGVmYXVsdCB2YWx1ZSBhcyB0aGUgcmVxdWlyZWQgdmFsdWUgaXMgbm90IHByb3ZpZGVkLCBzZXQgdGhlIGZpZWxkIHRvIHRoZSBkZWZhdWx0IHZhbHVlLlxyXG4gICAgICBpZiAodmFsdWUucmVxdWlyZWQpIHtcclxuICAgICAgICBpZiAoIWRhdGFba2V5XSAmJiB2YWx1ZS5kZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWRhdGFba2V5XSkge1xyXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBoYXMgbm90IGJlZW4gcHJvdmlkZWQuYDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEZvciBub24gcmVxdWlyZWQgZmllbGRzLCBpZiB0aGUgdmFsdWUgaXMgbm90IHByb3ZpZGVkLCBzZXQgdGhlIGZpZWxkIHRvIHRoZSBkZWZhdWx0IHZhbHVlIGlmIGl0IGV4aXN0cy5cclxuICAgICAgaWYgKCFkYXRhW2tleV0gJiYgdmFsdWUuZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgZGF0YVtrZXldID0gdmFsdWUuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSBlbHNlIGlmICghZGF0YVtrZXldKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgYWxsIHByb3ZpZGVkIGZpZWxkcyBhcmUgdGhlIGNvcnJlY3QgdHlwZVxyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc2NoZW1hRmllbGRzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgZGF0YVtrZXldICE9PSB2YWx1ZS50eXBlKVxyXG4gICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBvZiB0eXBlICR7dmFsdWUudHlwZX0uYDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbGwgcHJvdmlkZWQgZmllbGRzIGFyZSB2YWxpZFxyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc2NoZW1hRmllbGRzKSB7XHJcbiAgICAgIC8vIE51bWJlciB2YWxpZGF0aW9uXHJcbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIC8vIElmIGJvdGggbWluIGFuZCBtYXggYXJlIHByb3ZpZGVkLCBjaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIHdpdGhpbiB0aGUgcmFuZ2VcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB2YWx1ZS5taW4gJiZcclxuICAgICAgICAgIHZhbHVlLm1heCAmJlxyXG4gICAgICAgICAgdHlwZW9mIGRhdGFba2V5XSA9PT0gJ251bWJlcicgJiZcclxuICAgICAgICAgICgoZGF0YVtrZXldIGFzIG51bWJlcikgPCB2YWx1ZS5taW4gfHxcclxuICAgICAgICAgICAgKGRhdGFba2V5XSBhcyBudW1iZXIpID4gdmFsdWUubWF4KVxyXG4gICAgICAgIClcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBiZXR3ZWVuICR7dmFsdWUubWlufSBhbmQgJHt2YWx1ZS5tYXh9LmA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYWJvdmUgdGhlIG1pbmltdW0gcmVxdWlyZWQgdmFsdWVcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB2YWx1ZS5taW4gJiZcclxuICAgICAgICAgIHR5cGVvZiBkYXRhW2tleV0gPT09ICdudW1iZXInICYmXHJcbiAgICAgICAgICAoZGF0YVtrZXldIGFzIG51bWJlcikgPCB2YWx1ZS5taW5cclxuICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYXQgbGVhc3QgJHt2YWx1ZS5taW59LmA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYmVsb3cgdGhlIG1heGltdW0gcmVxdWlyZWQgdmFsdWVcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB2YWx1ZS5tYXggJiZcclxuICAgICAgICAgIHR5cGVvZiBkYXRhW2tleV0gPT09ICdudW1iZXInICYmXHJcbiAgICAgICAgICAoZGF0YVtrZXldIGFzIG51bWJlcikgPiB2YWx1ZS5tYXhcclxuICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgbGVzcyB0aGFuICR7dmFsdWUubWF4fS5gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJbnRlZ2VyIHZhbGlkYXRpb25cclxuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdpbnRlZ2VyJykge1xyXG4gICAgICAgIC8vIElmIGJvdGggbWluIGFuZCBtYXggYXJlIHByb3ZpZGVkLCBjaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIHdpdGhpbiB0aGUgcmFuZ2VcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB2YWx1ZS5taW4gJiZcclxuICAgICAgICAgIHZhbHVlLm1heCAmJlxyXG4gICAgICAgICAgdHlwZW9mIGRhdGFba2V5XSA9PT0gJ251bWJlcicgJiZcclxuICAgICAgICAgICgoZGF0YVtrZXldIGFzIG51bWJlcikgPCB2YWx1ZS5taW4gfHxcclxuICAgICAgICAgICAgKGRhdGFba2V5XSBhcyBudW1iZXIpID4gdmFsdWUubWF4KVxyXG4gICAgICAgIClcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBiZXR3ZWVuICR7dmFsdWUubWlufSBhbmQgJHt2YWx1ZS5tYXh9LmA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYWJvdmUgdGhlIG1pbmltdW0gcmVxdWlyZWQgdmFsdWVcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB2YWx1ZS5taW4gJiZcclxuICAgICAgICAgIHR5cGVvZiBkYXRhW2tleV0gPT09ICdudW1iZXInICYmXHJcbiAgICAgICAgICAoZGF0YVtrZXldIGFzIG51bWJlcikgPCB2YWx1ZS5taW5cclxuICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYXQgbGVhc3QgJHt2YWx1ZS5taW59LmA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYmVsb3cgdGhlIG1heGltdW0gcmVxdWlyZWQgdmFsdWVcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB2YWx1ZS5tYXggJiZcclxuICAgICAgICAgIHR5cGVvZiBkYXRhW2tleV0gPT09ICdudW1iZXInICYmXHJcbiAgICAgICAgICAoZGF0YVtrZXldIGFzIG51bWJlcikgPiB2YWx1ZS5tYXhcclxuICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgbGVzcyB0aGFuICR7dmFsdWUubWF4fS5gO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGFuIGludGVnZXJcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0eXBlb2YgZGF0YVtrZXldICE9PSAnbnVtYmVyJyB8fFxyXG4gICAgICAgICAgIU51bWJlci5pc0ludGVnZXIoZGF0YVtrZXldIGFzIG51bWJlcilcclxuICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYW4gaW50ZWdlci5gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTdHJpbmcgdmFsaWRhdGlvblxyXG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBjb25zdCByZXEgPSB2YWx1ZTtcclxuICAgICAgICBjb25zdCB0ZXN0VmFsID0gZGF0YVtrZXldIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBpbmNsdWRlZCBpbiB0aGUgc2NoZW1hIG9wdGlvbnNcclxuICAgICAgICBpZiAodmFsdWUub3B0aW9ucyAmJiAhdmFsdWUub3B0aW9ucy5pbmNsdWRlcyhkYXRhW2tleV0gYXMgc3RyaW5nKSlcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgaXMgbm90IGEgdmFsaWQgb3B0aW9uLmA7XHJcblxyXG4gICAgICAgIC8vIElmIGJvdGggbWluIGFuZCBtYXggYXJlIHByb3ZpZGVkLCBjaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIHdpdGhpbiB0aGUgcmFuZ2VcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB2YWx1ZS5taW4gJiZcclxuICAgICAgICAgIHZhbHVlLm1heCAmJlxyXG4gICAgICAgICAgKHRlc3RWYWwubGVuZ3RoIDwgdmFsdWUubWluIHx8IHRlc3RWYWwubGVuZ3RoID4gdmFsdWUubWF4KVxyXG4gICAgICAgIClcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBiZXR3ZWVuICR7dmFsdWUubWlufSBhbmQgJHt2YWx1ZS5tYXh9IGNoYXJhY3RlcnMuYDtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBoYXMgdGhlIG1pbmltdW0gcmVxdWlyZWQgbGVuZ3RoXHJcbiAgICAgICAgaWYgKHZhbHVlLm1pbiAmJiB0ZXN0VmFsLmxlbmd0aCA8IHZhbHVlLm1pbilcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhdCBsZWFzdCAke3ZhbHVlLm1pbn0gY2hhcmFjdGVycy5gO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGhhcyB0aGUgbWF4aW11bSByZXF1aXJlZCBsZW5ndGhcclxuICAgICAgICBpZiAodmFsdWUubWF4ICYmIHRlc3RWYWwubGVuZ3RoID4gdmFsdWUubWF4KVxyXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGxlc3MgdGhhbiAke3ZhbHVlLm1heH0gY2hhcmFjdGVycy5gO1xyXG5cclxuICAgICAgICAvLyBUZXN0IGlmIGVtYWlsIGlzIHZhbGlkXHJcbiAgICAgICAgaWYgKHJlcS50ZXN0ID09PSAnZW1haWwnICYmICF2YWxpZGF0ZUVtYWlsKHRlc3RWYWwpKVxyXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5gO1xyXG5cclxuICAgICAgICAvLyBUZXN0IGlmIHVzZXJuYW1lIGlzIHZhbGlkXHJcbiAgICAgICAgaWYgKHJlcS50ZXN0ID09PSAndXNlcm5hbWUnICYmICF2YWxpZGF0ZVVzZXJuYW1lKHRlc3RWYWwpKVxyXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgdmFsaWQgdXNlcm5hbWUuYDtcclxuXHJcbiAgICAgICAgLy8gVGVzdCBpZiBwYXNzd29yZCBpcyB2YWxpZFxyXG4gICAgICAgIGlmIChyZXEudGVzdCA9PT0gJ3Bhc3N3b3JkU3RyZW5ndGgnICYmICF2YWxpZWRhdGVQYXNzd29yZCh0ZXN0VmFsKSlcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgaXMgdG9vIHdlYWsgdG8gYmUgYSB2YWxpZCBwYXNzd29yZC5gO1xyXG5cclxuICAgICAgICAvLyBUZXN0IGlmIHBob25lIG51bWJlciBpcyB2YWxpZFxyXG4gICAgICAgIGlmIChyZXEudGVzdCA9PT0gJ3Bob25lTnVtYmVyJyAmJiAhdmFsaWRhdGVQaG9uZU51bWJlcih0ZXN0VmFsKSlcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHZhbGlkIHBob25lIG51bWJlci5gO1xyXG5cclxuICAgICAgICAvLyBUZXN0IGlmIElQdjQgYWRkcmVzcyBpcyB2YWxpZFxyXG4gICAgICAgIGlmIChyZXEudGVzdCA9PT0gJ2lwQWRkcmVzcycgJiYgIXZhbGlkYXRlSXB2NEFkZHJlc3ModGVzdFZhbCkpXHJcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYSB2YWxpZCBJUHY0IGFkZHJlc3MuYDtcclxuXHJcbiAgICAgICAgLy8gVGVzdCBpZiBhIHVybCBpcyB2YWxpZFxyXG4gICAgICAgIGlmIChyZXEudGVzdCA9PT0gJ3VybCcgJiYgIXZhbGlkYXRlVXJsKHRlc3RWYWwpKVxyXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgdmFsaWQgSVB2NCBhZGRyZXNzLmA7XHJcblxyXG4gICAgICAgIC8vIFRlc3QgaWYgYSBwYXRoIGlzIHZhbGlkXHJcbiAgICAgICAgaWYgKHJlcS50ZXN0ID09PSAncGF0aCcgJiYgIXZhbGlkYXRlUGF0aCh0ZXN0VmFsKSlcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHZhbGlkIHBhdGguYDtcclxuXHJcbiAgICAgICAgLy8gVGVzdCBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGEgc3RyaW5nXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gIT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgc3RyaW5nLmA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgcGFzc2VzIGFsbCBjaGVja3NcclxuICAgICAgaWYgKHZhbHVlLmNoZWNrcylcclxuICAgICAgICBmb3IgKGNvbnN0IGNoZWNrIG9mIHZhbHVlLmNoZWNrcykge1xyXG4gICAgICAgICAgY29uc3QgcGFzc2VkQ2hlY2sgPSBhd2FpdCBjaGVja1swXShrZXkpO1xyXG4gICAgICAgICAgaWYgKCFwYXNzZWRDaGVjaykgcmV0dXJuIGAke2NoZWNrWzFdfS5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIC8vIEJvb2xlYW4gdmFsaWRhdGlvblxyXG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgLy8gVE9ETzogQ2hlY2sgdGhpcyB3b3Jrc1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYSBib29sZWFuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gIT09ICdib29sZWFuJylcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIGJvb2xlYW4uYDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gT2JqZWN0IHZhbGlkYXRpb25cclxuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgLy8gVE9ETzogQ2hlY2sgdGhpcyB3b3Jrc1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYW4gb2JqZWN0XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gIT09ICdvYmplY3QnKVxyXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGFuIG9iamVjdC5gO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGhhcyB0aGUgY29ycmVjdCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgaWYgKHZhbHVlLnByb3BlcnRpZXMgJiYgT2JqZWN0LmtleXModmFsdWUucHJvcGVydGllcykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy52YWxpZGF0ZUJhc2U8J3Byb3BlcnRpZXMnPihcclxuICAgICAgICAgICAgZGF0YVtrZXldIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxyXG4gICAgICAgICAgICB2YWx1ZS5wcm9wZXJ0aWVzIGFzIFNjaGVtYSxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBcnJheSB2YWxpZGF0aW9uXHJcbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSAnYXJyYXknKSB7XHJcbiAgICAgICAgLy8gVE9ETzogQ2hlY2sgdGhpcyB3b3Jrc1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYW4gYXJyYXlcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSlcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhbiBhcnJheS5gO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGhhcyB0aGUgY29ycmVjdCBpdGVtc1xyXG4gICAgICAgIC8qIGlmICh2YWx1ZS5pdGVtcykge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGRhdGFba2V5XSBhcyB1bmtub3duW10pIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtICE9PSB2YWx1ZS5pdGVtcy50eXBlKVxyXG4gICAgICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhbiBhcnJheSBvZiAke3ZhbHVlLml0ZW1zLnR5cGV9LmA7XHJcbiAgICAgICAgICAgIGlmICghdmFsdWUuaXRlbXMub3B0aW9ucy5pbmNsdWRlcyhpdGVtKSlcclxuICAgICAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYW4gYXJyYXkgb2YgdmFsaWQgb3B0aW9ucy5gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gKi9cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSW1hZ2UgdmFsaWRhdGlvblxyXG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgIC8vIFRPRE86IENoZWNrIHRoaXMgd29ya3NcclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGEgc3RyaW5nXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gIT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgc3RyaW5nLmA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYSB2YWxpZCBpbWFnZVxyXG4gICAgICAgIGlmICghdmFsaWRhdGVJbWFnZShkYXRhW2tleV0gYXMgc3RyaW5nKSlcclxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHZhbGlkIGltYWdlLmA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSdW4gdGhlIHZhbGlkYXRpb24gZnVuY3Rpb24sIGFuZCBpZiB0aGUgcmVzcG9uc2Ugb2JqZWN0IGlzIHByb3ZpZGVkLCBzZW5kIGEgcmVzcG9uc2UgaWYgdGhlIHZhbGlkYXRpb24gZmFpbHMuXHJcbiAgICogQHBhcmFtIGRhdGEgVGhlIG9iamVjdCBkYXRhIHRvIHZhbGlkYXRlLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIHRvIHVzZSB3aGVuIHZhbGlkYXRpbmcuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMucmVzIFRoZSByZXNwb25zZSBvYmplY3QuXHJcbiAgICogQHJldHVybnMgQSBKU09OIHJlc3BvbnNlIG1lYW5pbmcgaXQncyBpbnZhbGlkLCBvciBudWxsIGlmIGl0J3MgdmFsaWQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHZhbGlkYXRlKFxyXG4gICAgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXHJcbiAgICBvcHRpb25zPzogeyByZXM/OiBSZXNwb25zZSB9XHJcbiAgKTogUHJvbWlzZTxSZXNwb25zZSB8IG51bGwgfCBzdHJpbmc+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMudmFsaWRhdGVCYXNlKGRhdGEsIHRoaXMuc2NoZW1hKTtcclxuICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSAnc3RyaW5nJykgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAob3B0aW9ucz8ucmVzKVxyXG4gICAgICByZXR1cm4gb3B0aW9ucy5yZXMuc3RhdHVzKDQwMCkuanNvbih7IHN0YXR1czogNDAwLCBtZXNzYWdlOiByZXN1bHQgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhwb3J0IHRoZSBzY2hlbWEuXHJcbiAgICogQHJldHVybnMgVGhlIGV4cG9ydGVkIHNjaGVtYS5cclxuICAgKi9cclxuICBwdWJsaWMgZXhwb3J0KCk6IEV4cG9ydGVkU2NoZW1hIHtcclxuICAgIGNvbnN0IGV4cG9ydFNjaGVtYTogUmVjb3JkPHN0cmluZywgRXhwb3J0ZWRWYWx1ZTxFeHBvcnRlZFNjaGVtYT4+ID0ge307XHJcblxyXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5zY2hlbWEpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICBjb25zdCBleHBvcnRlZFZhbHVlID0gdmFsdWUuZXhwb3J0KCkgYXMgRXhwb3J0ZWRWYWx1ZTxFeHBvcnRlZFNjaGVtYT47XHJcbiAgICAgIGV4cG9ydFNjaGVtYVtrZXldID0gZXhwb3J0ZWRWYWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBleHBvcnRTY2hlbWE7XHJcbiAgfVxyXG59XHJcbiJdfQ==