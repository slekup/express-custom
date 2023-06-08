import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { INumberValue } from '@typings/schema';
export type NumberValueOptions = BaseValueOptions & {
    min?: number;
    max?: number;
};
/**
 * The NumberValue class, used to create number values.
 */
export default class NumberValue extends BaseValue implements INumberValue {
    type: "number";
    min?: number;
    max?: number;
    /**
     * Creates an instance of the NumberValue class.
     * @param options The options for the NumberValue class.
     */
    constructor(options: NumberValueOptions);
    /**
     * Exports the NumberValue class properties.
     * @returns The NumberValue class properties.
     */
    export(): unknown;
}
//# sourceMappingURL=NumberValue.d.ts.map