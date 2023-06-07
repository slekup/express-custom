import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { StringTest, StringValue } from '@typings/schema';
export type StringValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
    options?: string[];
    test?: StringTest;
};
/**
 * The string value builder class.
 */
export default class StringValueBuilder extends BaseValue implements StringValue {
    type: "string";
    min?: number;
    max?: number;
    options?: string[];
    test?: StringTest;
    /**
     * Creates an instance of the string value builder class.
     * @param options The options of the string value.
     */
    constructor(options: StringValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}
//# sourceMappingURL=StringValue.d.ts.map