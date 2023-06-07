import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { ObjectValue, Schema } from '@typings/schema';
export type ObjectValueOptions = BaseValueOptions & {
    properties: Schema;
};
/**
 * The object value builder class.
 */
export default class ObjectValueBuilder<T> extends BaseValue implements ObjectValue<T> {
    type: "object";
    properties: Schema;
    /**
     * Creates an instance of the object value builder class.
     * @param options The options of the object value builder class.
     */
    constructor(options: ObjectValueOptions);
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export(): unknown;
}
//# sourceMappingURL=ObjectValue.d.ts.map