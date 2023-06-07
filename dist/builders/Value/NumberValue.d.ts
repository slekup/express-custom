import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { NumberValue } from '@typings/schema';
export type NumberValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
};
/**
 * The number value builder class.
 */
export default class NumberValueBuilder extends BaseValue implements NumberValue {
    type: "number";
    min?: number;
    max?: number;
    /**
     * Creates an instance of the number value builder class.
     * @param options The options of the number value.
     */
    constructor(options: NumberValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}
//# sourceMappingURL=NumberValue.d.ts.map