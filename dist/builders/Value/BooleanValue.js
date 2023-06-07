"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The boolean value builder class.
 */
class BooleanValueBuilder extends BaseValue_1.default {
    type = 'boolean';
    /**
     * Creates an instance of the boolean value builder class.
     * @param options The options of the boolean value.
     */
    constructor(options) {
        super(options);
    }
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export() {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            required: this.required,
            structure: this.structure,
        };
    }
}
exports.default = BooleanValueBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbGVhblZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1aWxkZXJzL1ZhbHVlL0Jvb2xlYW5WYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlFQUF1RTtBQUt2RTs7R0FFRztBQUNILE1BQXFCLG1CQUNuQixTQUFRLG1CQUFTO0lBR1YsSUFBSSxHQUFHLFNBQWtCLENBQUM7SUFFakM7OztPQUdHO0lBQ0gsWUFBbUIsT0FBNEI7UUFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUEzQkQsc0NBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VWYWx1ZSwgeyBCYXNlVmFsdWVPcHRpb25zIH0gZnJvbSAnQGJ1aWxkZXJzL0Jhc2UvQmFzZVZhbHVlJztcbmltcG9ydCB7IEJvb2xlYW5WYWx1ZSB9IGZyb20gJ0B0eXBpbmdzL3NjaGVtYSc7XG5cbmV4cG9ydCB0eXBlIEJvb2xlYW5WYWx1ZU9wdGlvbnMgPSBCYXNlVmFsdWVPcHRpb25zO1xuXG4vKipcbiAqIFRoZSBib29sZWFuIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb2xlYW5WYWx1ZUJ1aWxkZXJcbiAgZXh0ZW5kcyBCYXNlVmFsdWVcbiAgaW1wbGVtZW50cyBCb29sZWFuVmFsdWVcbntcbiAgcHVibGljIHR5cGUgPSAnYm9vbGVhbicgYXMgY29uc3Q7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGJvb2xlYW4gdmFsdWUgYnVpbGRlciBjbGFzcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGJvb2xlYW4gdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogQm9vbGVhblZhbHVlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IHVua25vd24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZSxcbiAgICB9O1xuICB9XG59XG4iXX0=