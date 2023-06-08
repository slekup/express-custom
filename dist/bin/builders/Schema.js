"use strict";
//  Disable the no-param-reassign rule as it is needed to assign default values to undefined parameters.
/* eslint-disable no-param-reassign */
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("@utils/validate");
const Value_1 = require("./Value");
/**
 * The Schema class, used to create schemas, which are used to validate data.
 */
class Schema {
    schema;
    /**
     * Creates a new instance of the Schema class.
     */
    constructor() {
        this.schema = {};
    }
    /**
     * Adds a array value to the schema.
     * @param options The options of the array value.
     * @returns The current Schema instance.
     */
    addArray(options) {
        const value = new Value_1.ArrayValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a string value to the schema.
     * @param options The options of the string value.
     * @returns The current Schema instance.
     */
    addString(options) {
        const value = new Value_1.StringValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a number value to the schema.
     * @param options The options of the number value.
     * @returns The current Schema instance.
     */
    addNumber(options) {
        const value = new Value_1.NumberValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a integer value to the schema.
     * @param options The options of the integer value.
     * @returns The current Schema instance.
     */
    addInteger(options) {
        const value = new Value_1.IntegerValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a boolean value to the schema.
     * @param options The options of the boolean value.
     * @returns The current Schema instance.
     */
    addBoolean(options) {
        const value = new Value_1.BooleanValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a object value to the schema.
     * @param options The options of the object value.
     * @returns The current Schema instance.
     */
    addObject(options) {
        const value = new Value_1.ObjectValue(options);
        this.schema[value.name] = value;
        return this;
    }
    /**
     * Adds a image value to the schema.
     * @param options The options of the image value.
     * @returns The current Schema instance.
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
                if (value.options &&
                    value.options.length > 0 &&
                    !value.options.includes(data[key]))
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
     * Export the schema as a JSON object.
     * @returns The exported schema as a JSON object.
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
exports.default = Schema;
