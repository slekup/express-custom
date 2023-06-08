import BaseValue, { BaseValueOptions } from '@builders/Base/BaseValue';
import { IObjectValue, ISchema } from '@typings/schema';
export type ObjectValueOptions = BaseValueOptions & {
    properties: ISchema;
};
/**
 * The ObjectValue class, used to create object values.
 */
export default class ObjectValue<T> extends BaseValue implements IObjectValue<T> {
    type: "object";
    properties: ISchema;
    /**
     * Creates an instance of the ObjectValue class.
     * @param options The options for the ObjectValue class.
     */
    constructor(options: ObjectValueOptions);
    /**
     * Exports the ObjectValue class properties.
     * @returns The ObjectValue class properties.
     */
    export(): unknown;
}
//# sourceMappingURL=ObjectValue.d.ts.map