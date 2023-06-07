"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The image value builder class.
 */
class ImageValueBuilder extends BaseValue_1.default {
    type = 'image';
    /**
     * Creates an instance of the image value builder class.
     * @param options The options of the image value.
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
exports.default = ImageValueBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWlsZGVycy9WYWx1ZS9JbWFnZVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUVBQXVFO0FBS3ZFOztHQUVHO0FBQ0gsTUFBcUIsaUJBQWtCLFNBQVEsbUJBQVM7SUFDL0MsSUFBSSxHQUFHLE9BQWdCLENBQUM7SUFFL0I7OztPQUdHO0lBQ0gsWUFBbUIsT0FBMEI7UUFDM0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUF4QkQsb0NBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VWYWx1ZSwgeyBCYXNlVmFsdWVPcHRpb25zIH0gZnJvbSAnQGJ1aWxkZXJzL0Jhc2UvQmFzZVZhbHVlJztcbmltcG9ydCB7IEltYWdlVmFsdWUgfSBmcm9tICdAdHlwaW5ncy9zY2hlbWEnO1xuXG5leHBvcnQgdHlwZSBJbWFnZVZhbHVlT3B0aW9ucyA9IEJhc2VWYWx1ZU9wdGlvbnM7XG5cbi8qKlxuICogVGhlIGltYWdlIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlVmFsdWVCdWlsZGVyIGV4dGVuZHMgQmFzZVZhbHVlIGltcGxlbWVudHMgSW1hZ2VWYWx1ZSB7XG4gIHB1YmxpYyB0eXBlID0gJ2ltYWdlJyBhcyBjb25zdDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgaW1hZ2UgdmFsdWUgYnVpbGRlciBjbGFzcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGltYWdlIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEltYWdlVmFsdWVPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyB0aGUgdmFsdWUuXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBleHBvcnQoKTogdW5rbm93biB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWQsXG4gICAgICBzdHJ1Y3R1cmU6IHRoaXMuc3RydWN0dXJlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==