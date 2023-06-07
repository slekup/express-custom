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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2J1aWxkZXJzL1NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3R0FBd0c7QUFDeEcsc0NBQXNDO0FBTXRDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsV0FBVyxFQUNYLFdBQVcsR0FDWixNQUFNLFNBQVMsQ0FBQztBQW9CakI7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWE7SUFDekIsTUFBTSxDQUFpQjtJQUU5Qjs7T0FFRztJQUNIO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRLENBQUMsT0FBMEI7UUFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsT0FBMkI7UUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsT0FBMkI7UUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxVQUFVLENBQUMsT0FBNEI7UUFDNUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxVQUFVLENBQUMsT0FBNEI7UUFDNUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsT0FBMkI7UUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQWdCLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksUUFBUSxDQUFDLE9BQTBCO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxLQUFLLENBQUMsWUFBWSxDQUN4QixJQUE2QixFQUM3QixNQUU2QyxFQUM3QyxVQUFvQjtRQUVwQixpQ0FBaUM7UUFDakMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO1lBQUUsT0FBTyxzQ0FBc0MsQ0FBQztRQUU1RSxNQUFNLFlBQVksR0FBRyxVQUFVO1lBQzdCLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWdCLENBQUM7WUFDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBd0IsQ0FBQyxDQUFDO1FBRTdDLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxZQUFZLEVBQUU7WUFDdkMsbURBQW1EO1lBQ25ELDhHQUE4RztZQUM5RyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtvQkFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7b0JBQy9CLE1BQU07aUJBQ1A7cUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDckIsT0FBTyxjQUFjLEdBQUcsMEJBQTBCLENBQUM7aUJBQ3BEO2FBQ0Y7WUFFRCwwR0FBMEc7WUFDMUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztnQkFDL0IsT0FBTyxLQUFLLENBQUM7YUFDZDtpQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFFRCxvREFBb0Q7UUFDcEQsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLFlBQVksRUFBRTtZQUN2QyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJO2dCQUNqQyxPQUFPLGNBQWMsR0FBRyxxQkFBcUIsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDO1NBQzlEO1FBRUQseUNBQXlDO1FBQ3pDLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxZQUFZLEVBQUU7WUFDdkMsb0JBQW9CO1lBQ3BCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLGtGQUFrRjtnQkFDbEYsSUFDRSxLQUFLLENBQUMsR0FBRztvQkFDVCxLQUFLLENBQUMsR0FBRztvQkFDVCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO29CQUM3QixDQUFFLElBQUksQ0FBQyxHQUFHLENBQVksR0FBRyxLQUFLLENBQUMsR0FBRzt3QkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBWSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBRXBDLE9BQU8sY0FBYyxHQUFHLHFCQUFxQixLQUFLLENBQUMsR0FBRyxRQUFRLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFFN0UsZ0VBQWdFO2dCQUNoRSxJQUNFLEtBQUssQ0FBQyxHQUFHO29CQUNULE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7b0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQVksR0FBRyxLQUFLLENBQUMsR0FBRztvQkFFakMsT0FBTyxjQUFjLEdBQUcsc0JBQXNCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFFN0QsZ0VBQWdFO2dCQUNoRSxJQUNFLEtBQUssQ0FBQyxHQUFHO29CQUNULE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7b0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQVksR0FBRyxLQUFLLENBQUMsR0FBRztvQkFFakMsT0FBTyxjQUFjLEdBQUcsdUJBQXVCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUMvRDtZQUVELHFCQUFxQjtZQUNyQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUM1QixrRkFBa0Y7Z0JBQ2xGLElBQ0UsS0FBSyxDQUFDLEdBQUc7b0JBQ1QsS0FBSyxDQUFDLEdBQUc7b0JBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTtvQkFDN0IsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUc7d0JBQy9CLElBQUksQ0FBQyxHQUFHLENBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO29CQUVwQyxPQUFPLGNBQWMsR0FBRyxxQkFBcUIsS0FBSyxDQUFDLEdBQUcsUUFBUSxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBRTdFLGdFQUFnRTtnQkFDaEUsSUFDRSxLQUFLLENBQUMsR0FBRztvQkFDVCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO29CQUM1QixJQUFJLENBQUMsR0FBRyxDQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUc7b0JBRWpDLE9BQU8sY0FBYyxHQUFHLHNCQUFzQixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBRTdELGdFQUFnRTtnQkFDaEUsSUFDRSxLQUFLLENBQUMsR0FBRztvQkFDVCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO29CQUM1QixJQUFJLENBQUMsR0FBRyxDQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUc7b0JBRWpDLE9BQU8sY0FBYyxHQUFHLHVCQUF1QixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBRTlELDBDQUEwQztnQkFDMUMsSUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO29CQUM3QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVyxDQUFDO29CQUV0QyxPQUFPLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQzthQUNuRDtZQUVELG9CQUFvQjtZQUNwQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUMzQixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUM7Z0JBQ2xCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQVcsQ0FBQztnQkFFcEMsOERBQThEO2dCQUM5RCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLENBQUM7b0JBQy9ELE9BQU8sY0FBYyxHQUFHLDBCQUEwQixDQUFDO2dCQUVyRCxrRkFBa0Y7Z0JBQ2xGLElBQ0UsS0FBSyxDQUFDLEdBQUc7b0JBQ1QsS0FBSyxDQUFDLEdBQUc7b0JBQ1QsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO29CQUUxRCxPQUFPLGNBQWMsR0FBRyxxQkFBcUIsS0FBSyxDQUFDLEdBQUcsUUFBUSxLQUFLLENBQUMsR0FBRyxjQUFjLENBQUM7Z0JBRXhGLDREQUE0RDtnQkFDNUQsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUc7b0JBQ3pDLE9BQU8sY0FBYyxHQUFHLHNCQUFzQixLQUFLLENBQUMsR0FBRyxjQUFjLENBQUM7Z0JBRXhFLDREQUE0RDtnQkFDNUQsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUc7b0JBQ3pDLE9BQU8sY0FBYyxHQUFHLHVCQUF1QixLQUFLLENBQUMsR0FBRyxjQUFjLENBQUM7Z0JBRXpFLHlCQUF5QjtnQkFDekIsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7b0JBQ2pELE9BQU8sY0FBYyxHQUFHLGtDQUFrQyxDQUFDO2dCQUU3RCw0QkFBNEI7Z0JBQzVCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7b0JBQ3ZELE9BQU8sY0FBYyxHQUFHLDZCQUE2QixDQUFDO2dCQUV4RCw0QkFBNEI7Z0JBQzVCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxrQkFBa0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztvQkFDaEUsT0FBTyxjQUFjLEdBQUcsdUNBQXVDLENBQUM7Z0JBRWxFLGdDQUFnQztnQkFDaEMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGFBQWEsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztvQkFDN0QsT0FBTyxjQUFjLEdBQUcsaUNBQWlDLENBQUM7Z0JBRTVELGdDQUFnQztnQkFDaEMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztvQkFDM0QsT0FBTyxjQUFjLEdBQUcsaUNBQWlDLENBQUM7Z0JBRTVELHlCQUF5QjtnQkFDekIsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQzdDLE9BQU8sY0FBYyxHQUFHLGlDQUFpQyxDQUFDO2dCQUU1RCwwQkFBMEI7Z0JBQzFCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO29CQUMvQyxPQUFPLGNBQWMsR0FBRyx5QkFBeUIsQ0FBQztnQkFFcEQsdUNBQXVDO2dCQUN2QyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7b0JBQy9CLE9BQU8sY0FBYyxHQUFHLHFCQUFxQixDQUFDO2FBQ2pEO1lBRUQsOENBQThDO1lBQzlDLElBQUksS0FBSyxDQUFDLE1BQU07Z0JBQ2QsS0FBSyxNQUFNLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNoQyxNQUFNLFdBQVcsR0FBRyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFdBQVc7d0JBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2lCQUN6QztZQUVILHFCQUFxQjtZQUNyQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUM1Qix5QkFBeUI7Z0JBQ3pCLHlDQUF5QztnQkFDekMsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO29CQUNoQyxPQUFPLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQzthQUNsRDtZQUVELG9CQUFvQjtZQUNwQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUMzQix5QkFBeUI7Z0JBQ3pCLHlDQUF5QztnQkFDekMsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO29CQUMvQixPQUFPLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQztnQkFFakQsdURBQXVEO2dCQUN2RCxJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDaEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUNwQyxJQUFJLENBQUMsR0FBRyxDQUE0QixFQUNwQyxLQUFLLENBQUMsVUFBb0IsRUFDMUIsSUFBSSxDQUNMLENBQUM7b0JBQ0YsSUFBSSxNQUFNO3dCQUFFLE9BQU8sTUFBTSxDQUFDO2lCQUMzQjthQUNGO1lBRUQsbUJBQW1CO1lBQ25CLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQzFCLHlCQUF5QjtnQkFDekIsd0NBQXdDO2dCQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzNCLE9BQU8sY0FBYyxHQUFHLHFCQUFxQixDQUFDO2dCQUVoRCx3REFBd0Q7Z0JBQ3hEOzs7Ozs7O29CQU9JO2FBQ0w7WUFFRCxtQkFBbUI7WUFDbkIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDMUIseUJBQXlCO2dCQUN6Qix3Q0FBd0M7Z0JBQ3hDLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTtvQkFDL0IsT0FBTyxjQUFjLEdBQUcscUJBQXFCLENBQUM7Z0JBRWhELDZDQUE2QztnQkFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLENBQUM7b0JBQ3JDLE9BQU8sY0FBYyxHQUFHLDBCQUEwQixDQUFDO2FBQ3REO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsUUFBUSxDQUNuQixJQUE2QixFQUM3QixPQUE0QjtRQUU1QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQztRQUM1QyxJQUFJLE9BQU8sRUFBRSxHQUFHO1lBQ2QsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsTUFBTSxZQUFZLEdBQWtELEVBQUUsQ0FBQztRQUV2RSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ25ELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQW1DLENBQUM7WUFDdEUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vICBEaXNhYmxlIHRoZSBuby1wYXJhbS1yZWFzc2lnbiBydWxlIGFzIGl0IGlzIG5lZWRlZCB0byBhc3NpZ24gZGVmYXVsdCB2YWx1ZXMgdG8gdW5kZWZpbmVkIHBhcmFtZXRlcnMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgeyBFeHBvcnRlZFNjaGVtYSwgRXhwb3J0ZWRWYWx1ZSB9IGZyb20gJ0B0eXBpbmdzL2V4cG9ydHMnO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcbmltcG9ydCB7XG4gIHZhbGlkYXRlRW1haWwsXG4gIHZhbGlkYXRlSW1hZ2UsXG4gIHZhbGlkYXRlSXB2NEFkZHJlc3MsXG4gIHZhbGlkYXRlUGF0aCxcbiAgdmFsaWRhdGVQaG9uZU51bWJlcixcbiAgdmFsaWRhdGVVcmwsXG4gIHZhbGlkYXRlVXNlcm5hbWUsXG4gIHZhbGllZGF0ZVBhc3N3b3JkLFxufSBmcm9tICdAdXRpbHMvdmFsaWRhdGUnO1xuaW1wb3J0IHtcbiAgQXJyYXlWYWx1ZSxcbiAgQm9vbGVhblZhbHVlLFxuICBJbWFnZVZhbHVlLFxuICBJbnRlZ2VyVmFsdWUsXG4gIE51bWJlclZhbHVlLFxuICBPYmplY3RWYWx1ZSxcbiAgU3RyaW5nVmFsdWUsXG59IGZyb20gJy4vVmFsdWUnO1xuaW1wb3J0IHsgQXJyYXlWYWx1ZU9wdGlvbnMgfSBmcm9tICcuL1ZhbHVlL0FycmF5VmFsdWUnO1xuaW1wb3J0IHsgQm9vbGVhblZhbHVlT3B0aW9ucyB9IGZyb20gJy4vVmFsdWUvQm9vbGVhblZhbHVlJztcbmltcG9ydCB7IEltYWdlVmFsdWVPcHRpb25zIH0gZnJvbSAnLi9WYWx1ZS9JbWFnZVZhbHVlJztcbmltcG9ydCB7IEludGVnZXJWYWx1ZU9wdGlvbnMgfSBmcm9tICcuL1ZhbHVlL0ludGVnZXJWYWx1ZSc7XG5pbXBvcnQgeyBOdW1iZXJWYWx1ZU9wdGlvbnMgfSBmcm9tICcuL1ZhbHVlL051bWJlclZhbHVlJztcbmltcG9ydCB7IE9iamVjdFZhbHVlT3B0aW9ucyB9IGZyb20gJy4vVmFsdWUvT2JqZWN0VmFsdWUnO1xuaW1wb3J0IHsgU3RyaW5nVmFsdWVPcHRpb25zIH0gZnJvbSAnLi9WYWx1ZS9TdHJpbmdWYWx1ZSc7XG5cbnR5cGUgVmFsdWVCdWlsZGVycyA9XG4gIHwgQXJyYXlWYWx1ZVxuICB8IFN0cmluZ1ZhbHVlXG4gIHwgTnVtYmVyVmFsdWVcbiAgfCBJbnRlZ2VyVmFsdWVcbiAgfCBCb29sZWFuVmFsdWVcbiAgfCBPYmplY3RWYWx1ZTxWYWx1ZUJ1aWxkZXJzPlxuICB8IEltYWdlVmFsdWU7XG5cbmV4cG9ydCB0eXBlIEJ1aWxkZXJzU2NoZW1hID0gUmVjb3JkPHN0cmluZywgVmFsdWVCdWlsZGVycz47XG5cbi8qKlxuICogVGhlIFNjaGVtYSBCdWlsZGVyIGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2hlbWFCdWlsZGVyIHtcbiAgcHVibGljIHNjaGVtYTogQnVpbGRlcnNTY2hlbWE7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2NoZW1hID0ge307XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGFycmF5IHZhbHVlIHRvIHRoZSBzY2hlbWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBhcnJheSB2YWx1ZS5cbiAgICogQHJldHVybnMgVGhlIHNjaGVtYSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZEFycmF5KG9wdGlvbnM6IEFycmF5VmFsdWVPcHRpb25zKTogdGhpcyB7XG4gICAgY29uc3QgdmFsdWUgPSBuZXcgQXJyYXlWYWx1ZShvcHRpb25zKTtcbiAgICB0aGlzLnNjaGVtYVt2YWx1ZS5uYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBzdHJpbmcgdmFsdWUgdG8gdGhlIHNjaGVtYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIHN0cmluZyB2YWx1ZS5cbiAgICogQHJldHVybnMgVGhlIHNjaGVtYSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZFN0cmluZyhvcHRpb25zOiBTdHJpbmdWYWx1ZU9wdGlvbnMpOiB0aGlzIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBTdHJpbmdWYWx1ZShvcHRpb25zKTtcbiAgICB0aGlzLnNjaGVtYVt2YWx1ZS5uYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBudW1iZXIgdmFsdWUgdG8gdGhlIHNjaGVtYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIG51bWJlciB2YWx1ZS5cbiAgICogQHJldHVybnMgVGhlIHNjaGVtYSBidWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGFkZE51bWJlcihvcHRpb25zOiBOdW1iZXJWYWx1ZU9wdGlvbnMpOiB0aGlzIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBOdW1iZXJWYWx1ZShvcHRpb25zKTtcbiAgICB0aGlzLnNjaGVtYVt2YWx1ZS5uYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBpbnRlZ2VyIHZhbHVlIHRvIHRoZSBzY2hlbWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBpbnRlZ2VyIHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgc2NoZW1hIGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgYWRkSW50ZWdlcihvcHRpb25zOiBJbnRlZ2VyVmFsdWVPcHRpb25zKTogdGhpcyB7XG4gICAgY29uc3QgdmFsdWUgPSBuZXcgSW50ZWdlclZhbHVlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2NoZW1hW3ZhbHVlLm5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGJvb2xlYW4gdmFsdWUgdG8gdGhlIHNjaGVtYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGJvb2xlYW4gdmFsdWUuXG4gICAqIEByZXR1cm5zIFRoZSBzY2hlbWEgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBhZGRCb29sZWFuKG9wdGlvbnM6IEJvb2xlYW5WYWx1ZU9wdGlvbnMpOiB0aGlzIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBCb29sZWFuVmFsdWUob3B0aW9ucyk7XG4gICAgdGhpcy5zY2hlbWFbdmFsdWUubmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgb2JqZWN0IHZhbHVlIHRvIHRoZSBzY2hlbWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBvYmplY3QgdmFsdWUuXG4gICAqIEByZXR1cm5zIFRoZSBzY2hlbWEgYnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBhZGRPYmplY3Qob3B0aW9uczogT2JqZWN0VmFsdWVPcHRpb25zKTogdGhpcyB7XG4gICAgY29uc3QgdmFsdWUgPSBuZXcgT2JqZWN0VmFsdWU8VmFsdWVCdWlsZGVycz4ob3B0aW9ucyk7XG4gICAgdGhpcy5zY2hlbWFbdmFsdWUubmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgaW1hZ2UgdmFsdWUgdG8gdGhlIHNjaGVtYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGltYWdlIHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgc2NoZW1hIGJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgYWRkSW1hZ2Uob3B0aW9uczogSW1hZ2VWYWx1ZU9wdGlvbnMpOiB0aGlzIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBJbWFnZVZhbHVlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2NoZW1hW3ZhbHVlLm5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgYW4gb2JqZWN0IGFnYWluc3QgYSBzY2hlbWEuXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBvYmplY3QgZGF0YSB0byB2YWxpZGF0ZS5cbiAgICogQHBhcmFtIHNjaGVtYSBUaGUgc2NoZW1hIHRvIHZhbGlkYXRlIGFnYWluc3QuXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIFdoZXRoZXIgdG8gdmFsaWRhdGUgdGhlIHNjaGVtYSBwcm9wZXJ0aWVzIG9yIG5vdC5cbiAgICogQHJldHVybnMgQSBzdHJpbmcgaWYgdGhlIHZhbGlkYXRpb24gZmFpbHMsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgdmFsaWRhdGVCYXNlPFQgPSAnc2NoZW1hJz4oXG4gICAgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICAgc2NoZW1hOlxuICAgICAgfCAoVCBleHRlbmRzICdzY2hlbWEnID8gQnVpbGRlcnNTY2hlbWEgOiBuZXZlcilcbiAgICAgIHwgKFQgZXh0ZW5kcyAncHJvcGVydGllcycgPyBTY2hlbWEgOiBuZXZlciksXG4gICAgcHJvcGVydGllcz86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxzdHJpbmcgfCBib29sZWFuPiB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIGRhdGEgaXMgYW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JykgcmV0dXJuICdUaGUgZGF0YSBwcm92aWRlZCBtdXN0IGJlIGFuIG9iamVjdC4nO1xuXG4gICAgY29uc3Qgc2NoZW1hRmllbGRzID0gcHJvcGVydGllc1xuICAgICAgPyBPYmplY3QuZW50cmllcyhzY2hlbWEgYXMgU2NoZW1hKVxuICAgICAgOiBPYmplY3QuZW50cmllcyhzY2hlbWEgYXMgQnVpbGRlcnNTY2hlbWEpO1xuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc2NoZW1hRmllbGRzKSB7XG4gICAgICAvLyBDaGVjayBpZiBhbGwgcmVxdWlyZWQgZmllbGRzIGhhdmUgYmVlbiBwcm92aWRlZC5cbiAgICAgIC8vIElmIHRoZSBmaWVsZCBoYXMgYSBkZWZhdWx0IHZhbHVlIGFzIHRoZSByZXF1aXJlZCB2YWx1ZSBpcyBub3QgcHJvdmlkZWQsIHNldCB0aGUgZmllbGQgdG8gdGhlIGRlZmF1bHQgdmFsdWUuXG4gICAgICBpZiAodmFsdWUucmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0gJiYgdmFsdWUuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWUuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIGhhcyBub3QgYmVlbiBwcm92aWRlZC5gO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEZvciBub24gcmVxdWlyZWQgZmllbGRzLCBpZiB0aGUgdmFsdWUgaXMgbm90IHByb3ZpZGVkLCBzZXQgdGhlIGZpZWxkIHRvIHRoZSBkZWZhdWx0IHZhbHVlIGlmIGl0IGV4aXN0cy5cbiAgICAgIGlmICghZGF0YVtrZXldICYmIHZhbHVlLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZS5kZWZhdWx0VmFsdWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIWRhdGFba2V5XSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgYWxsIHByb3ZpZGVkIGZpZWxkcyBhcmUgdGhlIGNvcnJlY3QgdHlwZVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHNjaGVtYUZpZWxkcykge1xuICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gIT09IHZhbHVlLnR5cGUpXG4gICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBvZiB0eXBlICR7dmFsdWUudHlwZX0uYDtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBhbGwgcHJvdmlkZWQgZmllbGRzIGFyZSB2YWxpZFxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHNjaGVtYUZpZWxkcykge1xuICAgICAgLy8gTnVtYmVyIHZhbGlkYXRpb25cbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAvLyBJZiBib3RoIG1pbiBhbmQgbWF4IGFyZSBwcm92aWRlZCwgY2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyB3aXRoaW4gdGhlIHJhbmdlXG4gICAgICAgIGlmIChcbiAgICAgICAgICB2YWx1ZS5taW4gJiZcbiAgICAgICAgICB2YWx1ZS5tYXggJiZcbiAgICAgICAgICB0eXBlb2YgZGF0YVtrZXldID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICgoZGF0YVtrZXldIGFzIG51bWJlcikgPCB2YWx1ZS5taW4gfHxcbiAgICAgICAgICAgIChkYXRhW2tleV0gYXMgbnVtYmVyKSA+IHZhbHVlLm1heClcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBiZXR3ZWVuICR7dmFsdWUubWlufSBhbmQgJHt2YWx1ZS5tYXh9LmA7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBhYm92ZSB0aGUgbWluaW11bSByZXF1aXJlZCB2YWx1ZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgdmFsdWUubWluICYmXG4gICAgICAgICAgdHlwZW9mIGRhdGFba2V5XSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAoZGF0YVtrZXldIGFzIG51bWJlcikgPCB2YWx1ZS5taW5cbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhdCBsZWFzdCAke3ZhbHVlLm1pbn0uYDtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGJlbG93IHRoZSBtYXhpbXVtIHJlcXVpcmVkIHZhbHVlXG4gICAgICAgIGlmIChcbiAgICAgICAgICB2YWx1ZS5tYXggJiZcbiAgICAgICAgICB0eXBlb2YgZGF0YVtrZXldID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgIChkYXRhW2tleV0gYXMgbnVtYmVyKSA+IHZhbHVlLm1heFxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGxlc3MgdGhhbiAke3ZhbHVlLm1heH0uYDtcbiAgICAgIH1cblxuICAgICAgLy8gSW50ZWdlciB2YWxpZGF0aW9uXG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gJ2ludGVnZXInKSB7XG4gICAgICAgIC8vIElmIGJvdGggbWluIGFuZCBtYXggYXJlIHByb3ZpZGVkLCBjaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIHdpdGhpbiB0aGUgcmFuZ2VcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHZhbHVlLm1pbiAmJlxuICAgICAgICAgIHZhbHVlLm1heCAmJlxuICAgICAgICAgIHR5cGVvZiBkYXRhW2tleV0gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgKChkYXRhW2tleV0gYXMgbnVtYmVyKSA8IHZhbHVlLm1pbiB8fFxuICAgICAgICAgICAgKGRhdGFba2V5XSBhcyBudW1iZXIpID4gdmFsdWUubWF4KVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGJldHdlZW4gJHt2YWx1ZS5taW59IGFuZCAke3ZhbHVlLm1heH0uYDtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGFib3ZlIHRoZSBtaW5pbXVtIHJlcXVpcmVkIHZhbHVlXG4gICAgICAgIGlmIChcbiAgICAgICAgICB2YWx1ZS5taW4gJiZcbiAgICAgICAgICB0eXBlb2YgZGF0YVtrZXldID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgIChkYXRhW2tleV0gYXMgbnVtYmVyKSA8IHZhbHVlLm1pblxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGF0IGxlYXN0ICR7dmFsdWUubWlufS5gO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYmVsb3cgdGhlIG1heGltdW0gcmVxdWlyZWQgdmFsdWVcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHZhbHVlLm1heCAmJlxuICAgICAgICAgIHR5cGVvZiBkYXRhW2tleV0gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgKGRhdGFba2V5XSBhcyBudW1iZXIpID4gdmFsdWUubWF4XG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgbGVzcyB0aGFuICR7dmFsdWUubWF4fS5gO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYW4gaW50ZWdlclxuICAgICAgICBpZiAoXG4gICAgICAgICAgdHlwZW9mIGRhdGFba2V5XSAhPT0gJ251bWJlcicgfHxcbiAgICAgICAgICAhTnVtYmVyLmlzSW50ZWdlcihkYXRhW2tleV0gYXMgbnVtYmVyKVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGFuIGludGVnZXIuYDtcbiAgICAgIH1cblxuICAgICAgLy8gU3RyaW5nIHZhbGlkYXRpb25cbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCByZXEgPSB2YWx1ZTtcbiAgICAgICAgY29uc3QgdGVzdFZhbCA9IGRhdGFba2V5XSBhcyBzdHJpbmc7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBpbmNsdWRlZCBpbiB0aGUgc2NoZW1hIG9wdGlvbnNcbiAgICAgICAgaWYgKHZhbHVlLm9wdGlvbnMgJiYgIXZhbHVlLm9wdGlvbnMuaW5jbHVkZXMoZGF0YVtrZXldIGFzIHN0cmluZykpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBpcyBub3QgYSB2YWxpZCBvcHRpb24uYDtcblxuICAgICAgICAvLyBJZiBib3RoIG1pbiBhbmQgbWF4IGFyZSBwcm92aWRlZCwgY2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyB3aXRoaW4gdGhlIHJhbmdlXG4gICAgICAgIGlmIChcbiAgICAgICAgICB2YWx1ZS5taW4gJiZcbiAgICAgICAgICB2YWx1ZS5tYXggJiZcbiAgICAgICAgICAodGVzdFZhbC5sZW5ndGggPCB2YWx1ZS5taW4gfHwgdGVzdFZhbC5sZW5ndGggPiB2YWx1ZS5tYXgpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYmV0d2VlbiAke3ZhbHVlLm1pbn0gYW5kICR7dmFsdWUubWF4fSBjaGFyYWN0ZXJzLmA7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBoYXMgdGhlIG1pbmltdW0gcmVxdWlyZWQgbGVuZ3RoXG4gICAgICAgIGlmICh2YWx1ZS5taW4gJiYgdGVzdFZhbC5sZW5ndGggPCB2YWx1ZS5taW4pXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGF0IGxlYXN0ICR7dmFsdWUubWlufSBjaGFyYWN0ZXJzLmA7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBoYXMgdGhlIG1heGltdW0gcmVxdWlyZWQgbGVuZ3RoXG4gICAgICAgIGlmICh2YWx1ZS5tYXggJiYgdGVzdFZhbC5sZW5ndGggPiB2YWx1ZS5tYXgpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGxlc3MgdGhhbiAke3ZhbHVlLm1heH0gY2hhcmFjdGVycy5gO1xuXG4gICAgICAgIC8vIFRlc3QgaWYgZW1haWwgaXMgdmFsaWRcbiAgICAgICAgaWYgKHJlcS50ZXN0ID09PSAnZW1haWwnICYmICF2YWxpZGF0ZUVtYWlsKHRlc3RWYWwpKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuYDtcblxuICAgICAgICAvLyBUZXN0IGlmIHVzZXJuYW1lIGlzIHZhbGlkXG4gICAgICAgIGlmIChyZXEudGVzdCA9PT0gJ3VzZXJuYW1lJyAmJiAhdmFsaWRhdGVVc2VybmFtZSh0ZXN0VmFsKSlcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYSB2YWxpZCB1c2VybmFtZS5gO1xuXG4gICAgICAgIC8vIFRlc3QgaWYgcGFzc3dvcmQgaXMgdmFsaWRcbiAgICAgICAgaWYgKHJlcS50ZXN0ID09PSAncGFzc3dvcmRTdHJlbmd0aCcgJiYgIXZhbGllZGF0ZVBhc3N3b3JkKHRlc3RWYWwpKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgaXMgdG9vIHdlYWsgdG8gYmUgYSB2YWxpZCBwYXNzd29yZC5gO1xuXG4gICAgICAgIC8vIFRlc3QgaWYgcGhvbmUgbnVtYmVyIGlzIHZhbGlkXG4gICAgICAgIGlmIChyZXEudGVzdCA9PT0gJ3Bob25lTnVtYmVyJyAmJiAhdmFsaWRhdGVQaG9uZU51bWJlcih0ZXN0VmFsKSlcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYSB2YWxpZCBwaG9uZSBudW1iZXIuYDtcblxuICAgICAgICAvLyBUZXN0IGlmIElQdjQgYWRkcmVzcyBpcyB2YWxpZFxuICAgICAgICBpZiAocmVxLnRlc3QgPT09ICdpcEFkZHJlc3MnICYmICF2YWxpZGF0ZUlwdjRBZGRyZXNzKHRlc3RWYWwpKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHZhbGlkIElQdjQgYWRkcmVzcy5gO1xuXG4gICAgICAgIC8vIFRlc3QgaWYgYSB1cmwgaXMgdmFsaWRcbiAgICAgICAgaWYgKHJlcS50ZXN0ID09PSAndXJsJyAmJiAhdmFsaWRhdGVVcmwodGVzdFZhbCkpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgdmFsaWQgSVB2NCBhZGRyZXNzLmA7XG5cbiAgICAgICAgLy8gVGVzdCBpZiBhIHBhdGggaXMgdmFsaWRcbiAgICAgICAgaWYgKHJlcS50ZXN0ID09PSAncGF0aCcgJiYgIXZhbGlkYXRlUGF0aCh0ZXN0VmFsKSlcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYSB2YWxpZCBwYXRoLmA7XG5cbiAgICAgICAgLy8gVGVzdCBpZiB0aGUgc2NoZW1hIHZhbHVlIGlzIGEgc3RyaW5nXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtrZXldICE9PSAnc3RyaW5nJylcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYSBzdHJpbmcuYDtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBwYXNzZXMgYWxsIGNoZWNrc1xuICAgICAgaWYgKHZhbHVlLmNoZWNrcylcbiAgICAgICAgZm9yIChjb25zdCBjaGVjayBvZiB2YWx1ZS5jaGVja3MpIHtcbiAgICAgICAgICBjb25zdCBwYXNzZWRDaGVjayA9IGF3YWl0IGNoZWNrWzBdKGtleSk7XG4gICAgICAgICAgaWYgKCFwYXNzZWRDaGVjaykgcmV0dXJuIGAke2NoZWNrWzFdfS5gO1xuICAgICAgICB9XG5cbiAgICAgIC8vIEJvb2xlYW4gdmFsaWRhdGlvblxuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICAvLyBUT0RPOiBDaGVjayB0aGlzIHdvcmtzXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYSBib29sZWFuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtrZXldICE9PSAnYm9vbGVhbicpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgYm9vbGVhbi5gO1xuICAgICAgfVxuXG4gICAgICAvLyBPYmplY3QgdmFsaWRhdGlvblxuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIFRPRE86IENoZWNrIHRoaXMgd29ya3NcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBhbiBvYmplY3RcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gIT09ICdvYmplY3QnKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhbiBvYmplY3QuYDtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGhhcyB0aGUgY29ycmVjdCBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICh2YWx1ZS5wcm9wZXJ0aWVzICYmIE9iamVjdC5rZXlzKHZhbHVlLnByb3BlcnRpZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnZhbGlkYXRlQmFzZTwncHJvcGVydGllcyc+KFxuICAgICAgICAgICAgZGF0YVtrZXldIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICAgICAgICAgICAgdmFsdWUucHJvcGVydGllcyBhcyBTY2hlbWEsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFycmF5IHZhbGlkYXRpb25cbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgIC8vIFRPRE86IENoZWNrIHRoaXMgd29ya3NcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjaGVtYSB2YWx1ZSBpcyBhbiBhcnJheVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSlcbiAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYW4gYXJyYXkuYDtcblxuICAgICAgICAvLyBUT0RPOiBDaGVjayBpZiB0aGUgc2NoZW1hIHZhbHVlIGhhcyB0aGUgY29ycmVjdCBpdGVtc1xuICAgICAgICAvKiBpZiAodmFsdWUuaXRlbXMpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGF0YVtrZXldIGFzIHVua25vd25bXSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtICE9PSB2YWx1ZS5pdGVtcy50eXBlKVxuICAgICAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYW4gYXJyYXkgb2YgJHt2YWx1ZS5pdGVtcy50eXBlfS5gO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZS5pdGVtcy5vcHRpb25zLmluY2x1ZGVzKGl0ZW0pKVxuICAgICAgICAgICAgICByZXR1cm4gYFRoZSBmaWVsZCBcIiR7a2V5fVwiIG11c3QgYmUgYW4gYXJyYXkgb2YgdmFsaWQgb3B0aW9ucy5gO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAqL1xuICAgICAgfVxuXG4gICAgICAvLyBJbWFnZSB2YWxpZGF0aW9uXG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAvLyBUT0RPOiBDaGVjayB0aGlzIHdvcmtzXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYSBzdHJpbmdcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gIT09ICdzdHJpbmcnKVxuICAgICAgICAgIHJldHVybiBgVGhlIGZpZWxkIFwiJHtrZXl9XCIgbXVzdCBiZSBhIHN0cmluZy5gO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzY2hlbWEgdmFsdWUgaXMgYSB2YWxpZCBpbWFnZVxuICAgICAgICBpZiAoIXZhbGlkYXRlSW1hZ2UoZGF0YVtrZXldIGFzIHN0cmluZykpXG4gICAgICAgICAgcmV0dXJuIGBUaGUgZmllbGQgXCIke2tleX1cIiBtdXN0IGJlIGEgdmFsaWQgaW1hZ2UuYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUnVuIHRoZSB2YWxpZGF0aW9uIGZ1bmN0aW9uLCBhbmQgaWYgdGhlIHJlc3BvbnNlIG9iamVjdCBpcyBwcm92aWRlZCwgc2VuZCBhIHJlc3BvbnNlIGlmIHRoZSB2YWxpZGF0aW9uIGZhaWxzLlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgb2JqZWN0IGRhdGEgdG8gdmFsaWRhdGUuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIHRvIHVzZSB3aGVuIHZhbGlkYXRpbmcuXG4gICAqIEBwYXJhbSBvcHRpb25zLnJlcyBUaGUgcmVzcG9uc2Ugb2JqZWN0LlxuICAgKiBAcmV0dXJucyBBIEpTT04gcmVzcG9uc2UgbWVhbmluZyBpdCdzIGludmFsaWQsIG9yIG51bGwgaWYgaXQncyB2YWxpZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB2YWxpZGF0ZShcbiAgICBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgICBvcHRpb25zPzogeyByZXM/OiBSZXNwb25zZSB9XG4gICk6IFByb21pc2U8UmVzcG9uc2UgfCBudWxsIHwgc3RyaW5nPiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy52YWxpZGF0ZUJhc2UoZGF0YSwgdGhpcy5zY2hlbWEpO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSAnc3RyaW5nJykgcmV0dXJuIG51bGw7XG4gICAgaWYgKG9wdGlvbnM/LnJlcylcbiAgICAgIHJldHVybiBvcHRpb25zLnJlcy5zdGF0dXMoNDAwKS5qc29uKHsgc3RhdHVzOiA0MDAsIG1lc3NhZ2U6IHJlc3VsdCB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB0aGUgc2NoZW1hLlxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGV4cG9ydCgpOiBFeHBvcnRlZFNjaGVtYSB7XG4gICAgY29uc3QgZXhwb3J0U2NoZW1hOiBSZWNvcmQ8c3RyaW5nLCBFeHBvcnRlZFZhbHVlPEV4cG9ydGVkU2NoZW1hPj4gPSB7fTtcblxuICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuc2NoZW1hKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGNvbnN0IGV4cG9ydGVkVmFsdWUgPSB2YWx1ZS5leHBvcnQoKSBhcyBFeHBvcnRlZFZhbHVlPEV4cG9ydGVkU2NoZW1hPjtcbiAgICAgIGV4cG9ydFNjaGVtYVtrZXldID0gZXhwb3J0ZWRWYWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBleHBvcnRTY2hlbWE7XG4gIH1cbn1cbiJdfQ==