"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The array value builder class.
 */
class ArrayValueBuilder extends BaseValue_1.default {
    type = 'array';
    min;
    max;
    unique;
    contains;
    items;
    /**
     * Creates an instance of the array value builder class.
     * @param options The options of the array value.
     * @param options.min The minimum amount of items in the array value.
     * @param options.max The maximum amount of items in the array value.
     * @param options.unique Whether the array value is unique.
     * @param options.contains The type that the array value needs to contain.
     * @param options.items The items of the array value.
     */
    constructor({ min, max, unique, contains, items, ...options }) {
        super(options);
        this.min = min;
        this.max = max;
        this.unique = unique ?? false;
        this.contains = contains;
        this.items = items;
    }
    /**
     * Exports the array value.
     * @returns The array value.
     */
    export() {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            required: this.required,
            structure: this.structure,
            max: this.max,
            min: this.min,
            unique: this.unique,
        };
    }
}
exports.default = ArrayValueBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWlsZGVycy9WYWx1ZS9BcnJheVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUVBQXVFO0FBV3ZFOztHQUVHO0FBQ0gsTUFBcUIsaUJBQ25CLFNBQVEsbUJBQVM7SUFHVixJQUFJLEdBQUcsT0FBZ0IsQ0FBQztJQUN4QixHQUFHLENBQVU7SUFDYixHQUFHLENBQVU7SUFDYixNQUFNLENBQVU7SUFDaEIsUUFBUSxDQUFpQjtJQUN6QixLQUFLLENBQStCO0lBRTNDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBbUIsRUFDakIsR0FBRyxFQUNILEdBQUcsRUFDSCxNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFDTCxHQUFHLE9BQU8sRUFDUTtRQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBcERELG9DQW9EQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlVmFsdWUsIHsgQmFzZVZhbHVlT3B0aW9ucyB9IGZyb20gJ0BidWlsZGVycy9CYXNlL0Jhc2VWYWx1ZSc7XG5pbXBvcnQgeyBBcnJheUNvbnRhaW5zLCBBcnJheVZhbHVlLCBWYWx1ZVNjaGVtYSB9IGZyb20gJ0B0eXBpbmdzL3NjaGVtYSc7XG5cbmV4cG9ydCB0eXBlIEFycmF5VmFsdWVPcHRpb25zID0gQmFzZVZhbHVlT3B0aW9ucyAmIHtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIHVuaXF1ZT86IGJvb2xlYW47XG4gIGNvbnRhaW5zPzogQXJyYXlDb250YWlucztcbiAgaXRlbXM/OiBWYWx1ZVNjaGVtYSB8IFZhbHVlU2NoZW1hW107XG59O1xuXG4vKipcbiAqIFRoZSBhcnJheSB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJheVZhbHVlQnVpbGRlclxuICBleHRlbmRzIEJhc2VWYWx1ZVxuICBpbXBsZW1lbnRzIEFycmF5VmFsdWU8VmFsdWVTY2hlbWE+XG57XG4gIHB1YmxpYyB0eXBlID0gJ2FycmF5JyBhcyBjb25zdDtcbiAgcHVibGljIG1pbj86IG51bWJlcjtcbiAgcHVibGljIG1heD86IG51bWJlcjtcbiAgcHVibGljIHVuaXF1ZTogYm9vbGVhbjtcbiAgcHVibGljIGNvbnRhaW5zPzogQXJyYXlDb250YWlucztcbiAgcHVibGljIGl0ZW1zPzogVmFsdWVTY2hlbWEgfCBWYWx1ZVNjaGVtYVtdO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBhcnJheSB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgYXJyYXkgdmFsdWUuXG4gICAqIEBwYXJhbSBvcHRpb25zLm1pbiBUaGUgbWluaW11bSBhbW91bnQgb2YgaXRlbXMgaW4gdGhlIGFycmF5IHZhbHVlLlxuICAgKiBAcGFyYW0gb3B0aW9ucy5tYXggVGhlIG1heGltdW0gYW1vdW50IG9mIGl0ZW1zIGluIHRoZSBhcnJheSB2YWx1ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMudW5pcXVlIFdoZXRoZXIgdGhlIGFycmF5IHZhbHVlIGlzIHVuaXF1ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMuY29udGFpbnMgVGhlIHR5cGUgdGhhdCB0aGUgYXJyYXkgdmFsdWUgbmVlZHMgdG8gY29udGFpbi5cbiAgICogQHBhcmFtIG9wdGlvbnMuaXRlbXMgVGhlIGl0ZW1zIG9mIHRoZSBhcnJheSB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgbWluLFxuICAgIG1heCxcbiAgICB1bmlxdWUsXG4gICAgY29udGFpbnMsXG4gICAgaXRlbXMsXG4gICAgLi4ub3B0aW9uc1xuICB9OiBBcnJheVZhbHVlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMubWluID0gbWluO1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMudW5pcXVlID0gdW5pcXVlID8/IGZhbHNlO1xuICAgIHRoaXMuY29udGFpbnMgPSBjb250YWlucztcbiAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyB0aGUgYXJyYXkgdmFsdWUuXG4gICAqIEByZXR1cm5zIFRoZSBhcnJheSB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBleHBvcnQoKTogdW5rbm93biB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWQsXG4gICAgICBzdHJ1Y3R1cmU6IHRoaXMuc3RydWN0dXJlLFxuICAgICAgbWF4OiB0aGlzLm1heCxcbiAgICAgIG1pbjogdGhpcy5taW4sXG4gICAgICB1bmlxdWU6IHRoaXMudW5pcXVlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==