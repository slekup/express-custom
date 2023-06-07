import { Response } from 'express';
import { ExportedSchema } from '@typings/exports';
import { ArrayValue, BooleanValue, ImageValue, IntegerValue, NumberValue, ObjectValue, StringValue } from './Value';
import { ArrayValueOptions } from './Value/ArrayValue';
import { BooleanValueOptions } from './Value/BooleanValue';
import { ImageValueOptions } from './Value/ImageValue';
import { IntegerValueOptions } from './Value/IntegerValue';
import { NumberValueOptions } from './Value/NumberValue';
import { ObjectValueOptions } from './Value/ObjectValue';
import { StringValueOptions } from './Value/StringValue';
type ValueBuilders = ArrayValue | StringValue | NumberValue | IntegerValue | BooleanValue | ObjectValue<ValueBuilders> | ImageValue;
export type BuildersSchema = Record<string, ValueBuilders>;
/**
 * The Schema Builder class.
 */
export default class SchemaBuilder {
    schema: BuildersSchema;
    /**
     * Creates a new schema.
     */
    constructor();
    /**
     * Adds a array value to the schema.
     * @param options The options of the array value.
     * @returns The schema builder.
     */
    addArray(options: ArrayValueOptions): this;
    /**
     * Adds a string value to the schema.
     * @param options The options of the string value.
     * @returns The schema builder.
     */
    addString(options: StringValueOptions): this;
    /**
     * Adds a number value to the schema.
     * @param options The options of the number value.
     * @returns The schema builder.
     */
    addNumber(options: NumberValueOptions): this;
    /**
     * Adds a integer value to the schema.
     * @param options The options of the integer value.
     * @returns The schema builder.
     */
    addInteger(options: IntegerValueOptions): this;
    /**
     * Adds a boolean value to the schema.
     * @param options The options of the boolean value.
     * @returns The schema builder.
     */
    addBoolean(options: BooleanValueOptions): this;
    /**
     * Adds a object value to the schema.
     * @param options The options of the object value.
     * @returns The schema builder.
     */
    addObject(options: ObjectValueOptions): this;
    /**
     * Adds a image value to the schema.
     * @param options The options of the image value.
     * @returns The schema builder.
     */
    addImage(options: ImageValueOptions): this;
    /**
     * Validate an object against a schema.
     * @param data The object data to validate.
     * @param schema The schema to validate against.
     * @param properties Whether to validate the schema properties or not.
     * @returns A string if the validation fails, false otherwise.
     */
    private validateBase;
    /**
     * Run the validation function, and if the response object is provided, send a response if the validation fails.
     * @param data The object data to validate.
     * @param options The options to use when validating.
     * @param options.res The response object.
     * @returns A JSON response meaning it's invalid, or null if it's valid.
     */
    validate(data: Record<string, unknown>, options?: {
        res?: Response;
    }): Promise<Response | null | string>;
    /**
     * Export the schema.
     * @returns The exported schema.
     */
    export(): ExportedSchema;
}
export {};
