import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IIntegerValue } from '@typings/schema';
export type IntegerValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
};
/**
 * The InetgerValue class, used to create integer values.
 */
export default class IntegerValue extends BaseValue implements IIntegerValue {
    type: "integer";
    min?: number;
    max?: number;
    /**
     * Creates an instance of the IntegerValue class.
     * @param options The options for the IntegerValue class.
     */
    constructor(options: IntegerValueOptions);
    /**
     * Exports the IntegerValue class properties.
     * @returns The IntegerValue class properties.
     */
    export(): unknown;
}
//# sourceMappingURL=IntegerValue.d.ts.map