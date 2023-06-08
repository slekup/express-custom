import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IBooleanValue } from '@typings/schema';
export type BooleanValueOptions = BaseValueOptions;
/**
 * The BooleanValue class, used to create boolean values.
 */
export default class BooleanValue extends BaseValue implements IBooleanValue {
    type: "boolean";
    /**
     * Creates an instance of the BooleanValue class.
     * @param options The options for the BooleanValue class.
     */
    constructor(options: BooleanValueOptions);
    /**
     * Exports the BooleanValue class properties.
     * @returns The BooleanValue class properties.
     */
    export(): unknown;
}
//# sourceMappingURL=BooleanValue.d.ts.map