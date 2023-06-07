import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { BooleanValue } from '@typings/schema';
export type BooleanValueOptions = BaseValueOptions;
/**
 * The boolean value builder class.
 */
export default class BooleanValueBuilder extends BaseValue implements BooleanValue {
    type: "boolean";
    /**
     * Creates an instance of the boolean value builder class.
     * @param options The options of the boolean value.
     */
    constructor(options: BooleanValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}
//# sourceMappingURL=BooleanValue.d.ts.map