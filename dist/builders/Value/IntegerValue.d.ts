import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IntegerValue } from '@typings/schema';
export type IntegerValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
};
/**
 * The integer value builder class.
 */
export default class IntegerValueBuilder extends BaseValue implements IntegerValue {
    type: "integer";
    min?: number;
    max?: number;
    /**
     * Creates an instance of the integer value builder class.
     * @param options The options of the integer value.
     */
    constructor(options: IntegerValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}
//# sourceMappingURL=IntegerValue.d.ts.map