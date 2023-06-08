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
     * @param options The options for the BaseValue class.
     * @param options.name The name of the value.
     * @param options.description The description of the value.
     * @param options.required Whether the value is required or not.
     * @param options.checks The value checks. Functions that return a boolean based on the value.
     */
    constructor(options: BaseValueOptions);
    /**
     * Validates the BaseValue instances properties.
     */
    validate(): void;
}
//# sourceMappingURL=BaseValue.d.ts.map