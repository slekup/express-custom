import { BaseValueSchema, SchemaTypes, ValueCheck } from '@typings/schema';
export interface BaseValueOptions {
    name: string;
    description?: string;
    required?: boolean;
    checks?: ValueCheck[];
    structure?: string;
    defaultValue?: SchemaTypes;
}
/**
 * The BaseValue class. Used as a foundation for all value builders.
 */
export default class BaseValue implements BaseValueSchema {
    name: string;
    description?: string;
    required: boolean;
    checks: ValueCheck[];
    structure?: string;
    defaultValue?: SchemaTypes;
    /**
     * Creates a new instance of the BaseValue class.
     * @param options The options of the value.
     * @param options.name The name of the value.
     * @param options.description The description of the value.
     * @param options.required Whether the value is required.
     * @param options.checks The checks of the value.
     */
    constructor(options: BaseValueOptions);
    /**
     * Validates the value.
     */
    validate(): void;
}
