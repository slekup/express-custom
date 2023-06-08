import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IStringValue, StringTest } from '@typings/schema';
export type StringValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
    options?: string[];
    test?: StringTest;
};
/**
 * The StringValue class, used to create string values.
 */
export default class StringValue extends BaseValue implements IStringValue {
    type: "string";
    min?: number;
    max?: number;
    options?: string[];
    test?: StringTest;
    /**
     * Creates an instance of the StringValue class.
     * @param options The options for the StringValue class.
     */
    constructor(options: StringValueOptions);
    /**
     * Exports the StringValue class properties.
     * @returns The StringValue class properties.
     */
    export(): unknown;
}
//# sourceMappingURL=StringValue.d.ts.map