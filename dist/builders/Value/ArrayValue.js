import BaseValue from '@builders/Base/BaseValue';
/**
 * The array value builder class.
 */
export default class ArrayValueBuilder extends BaseValue {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWlsZGVycy9WYWx1ZS9BcnJheVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBK0IsTUFBTSwwQkFBMEIsQ0FBQztBQVd2RTs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQ25CLFNBQVEsU0FBUztJQUdWLElBQUksR0FBRyxPQUFnQixDQUFDO0lBQ3hCLEdBQUcsQ0FBVTtJQUNiLEdBQUcsQ0FBVTtJQUNiLE1BQU0sQ0FBVTtJQUNoQixRQUFRLENBQWlCO0lBQ3pCLEtBQUssQ0FBK0I7SUFFM0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFtQixFQUNqQixHQUFHLEVBQ0gsR0FBRyxFQUNILE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLEdBQUcsT0FBTyxFQUNRO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVZhbHVlLCB7IEJhc2VWYWx1ZU9wdGlvbnMgfSBmcm9tICdAYnVpbGRlcnMvQmFzZS9CYXNlVmFsdWUnO1xyXG5pbXBvcnQgeyBBcnJheUNvbnRhaW5zLCBBcnJheVZhbHVlLCBWYWx1ZVNjaGVtYSB9IGZyb20gJ0B0eXBpbmdzL3NjaGVtYSc7XHJcblxyXG5leHBvcnQgdHlwZSBBcnJheVZhbHVlT3B0aW9ucyA9IEJhc2VWYWx1ZU9wdGlvbnMgJiB7XHJcbiAgbWluPzogbnVtYmVyO1xyXG4gIG1heD86IG51bWJlcjtcclxuICB1bmlxdWU/OiBib29sZWFuO1xyXG4gIGNvbnRhaW5zPzogQXJyYXlDb250YWlucztcclxuICBpdGVtcz86IFZhbHVlU2NoZW1hIHwgVmFsdWVTY2hlbWFbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgYXJyYXkgdmFsdWUgYnVpbGRlciBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5VmFsdWVCdWlsZGVyXHJcbiAgZXh0ZW5kcyBCYXNlVmFsdWVcclxuICBpbXBsZW1lbnRzIEFycmF5VmFsdWU8VmFsdWVTY2hlbWE+XHJcbntcclxuICBwdWJsaWMgdHlwZSA9ICdhcnJheScgYXMgY29uc3Q7XHJcbiAgcHVibGljIG1pbj86IG51bWJlcjtcclxuICBwdWJsaWMgbWF4PzogbnVtYmVyO1xyXG4gIHB1YmxpYyB1bmlxdWU6IGJvb2xlYW47XHJcbiAgcHVibGljIGNvbnRhaW5zPzogQXJyYXlDb250YWlucztcclxuICBwdWJsaWMgaXRlbXM/OiBWYWx1ZVNjaGVtYSB8IFZhbHVlU2NoZW1hW107XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGFycmF5IHZhbHVlIGJ1aWxkZXIgY2xhc3MuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGFycmF5IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLm1pbiBUaGUgbWluaW11bSBhbW91bnQgb2YgaXRlbXMgaW4gdGhlIGFycmF5IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLm1heCBUaGUgbWF4aW11bSBhbW91bnQgb2YgaXRlbXMgaW4gdGhlIGFycmF5IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLnVuaXF1ZSBXaGV0aGVyIHRoZSBhcnJheSB2YWx1ZSBpcyB1bmlxdWUuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMuY29udGFpbnMgVGhlIHR5cGUgdGhhdCB0aGUgYXJyYXkgdmFsdWUgbmVlZHMgdG8gY29udGFpbi5cclxuICAgKiBAcGFyYW0gb3B0aW9ucy5pdGVtcyBUaGUgaXRlbXMgb2YgdGhlIGFycmF5IHZhbHVlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XHJcbiAgICBtaW4sXHJcbiAgICBtYXgsXHJcbiAgICB1bmlxdWUsXHJcbiAgICBjb250YWlucyxcclxuICAgIGl0ZW1zLFxyXG4gICAgLi4ub3B0aW9uc1xyXG4gIH06IEFycmF5VmFsdWVPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgdGhpcy5tYXggPSBtYXg7XHJcbiAgICB0aGlzLnVuaXF1ZSA9IHVuaXF1ZSA/PyBmYWxzZTtcclxuICAgIHRoaXMuY29udGFpbnMgPSBjb250YWlucztcclxuICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cG9ydHMgdGhlIGFycmF5IHZhbHVlLlxyXG4gICAqIEByZXR1cm5zIFRoZSBhcnJheSB2YWx1ZS5cclxuICAgKi9cclxuICBwdWJsaWMgZXhwb3J0KCk6IHVua25vd24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZCxcclxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZSxcclxuICAgICAgbWF4OiB0aGlzLm1heCxcclxuICAgICAgbWluOiB0aGlzLm1pbixcclxuICAgICAgdW5pcXVlOiB0aGlzLnVuaXF1ZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==