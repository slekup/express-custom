"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The number value builder class.
 */
class NumberValueBuilder extends BaseValue_1.default {
    type = 'number';
    min;
    max;
    /**
     * Creates an instance of the number value builder class.
     * @param options The options of the number value.
     */
    constructor(options) {
        super(options);
        this.min = options.min;
        this.max = options.max;
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
exports.default = NumberValueBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVyVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVpbGRlcnMvVmFsdWUvTnVtYmVyVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5RUFBdUU7QUFRdkU7O0dBRUc7QUFDSCxNQUFxQixrQkFDbkIsU0FBUSxtQkFBUztJQUdWLElBQUksR0FBRyxRQUFpQixDQUFDO0lBQ3pCLEdBQUcsQ0FBVTtJQUNiLEdBQUcsQ0FBVTtJQUVwQjs7O09BR0c7SUFDSCxZQUFtQixPQUEyQjtRQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUEvQkQscUNBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VWYWx1ZSwgeyBCYXNlVmFsdWVPcHRpb25zIH0gZnJvbSAnQGJ1aWxkZXJzL0Jhc2UvQmFzZVZhbHVlJztcbmltcG9ydCB7IE51bWJlclZhbHVlIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcblxuZXhwb3J0IHR5cGUgTnVtYmVyVmFsdWVPcHRpb25zID0gQmFzZVZhbHVlT3B0aW9ucyAmIHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG59O1xuXG4vKipcbiAqIFRoZSBudW1iZXIgdmFsdWUgYnVpbGRlciBjbGFzcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyVmFsdWVCdWlsZGVyXG4gIGV4dGVuZHMgQmFzZVZhbHVlXG4gIGltcGxlbWVudHMgTnVtYmVyVmFsdWVcbntcbiAgcHVibGljIHR5cGUgPSAnbnVtYmVyJyBhcyBjb25zdDtcbiAgcHVibGljIG1pbj86IG51bWJlcjtcbiAgcHVibGljIG1heD86IG51bWJlcjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgbnVtYmVyIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBudW1iZXIgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogTnVtYmVyVmFsdWVPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5taW4gPSBvcHRpb25zLm1pbjtcbiAgICB0aGlzLm1heCA9IG9wdGlvbnMubWF4O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IHVua25vd24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZSxcbiAgICB9O1xuICB9XG59XG4iXX0=