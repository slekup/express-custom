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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWlsZGVycy9WYWx1ZS9BcnJheVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBK0IsTUFBTSwwQkFBMEIsQ0FBQztBQVd2RTs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQ25CLFNBQVEsU0FBUztJQUdWLElBQUksR0FBRyxPQUFnQixDQUFDO0lBQ3hCLEdBQUcsQ0FBVTtJQUNiLEdBQUcsQ0FBVTtJQUNiLE1BQU0sQ0FBVTtJQUNoQixRQUFRLENBQWlCO0lBQ3pCLEtBQUssQ0FBK0I7SUFFM0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFtQixFQUNqQixHQUFHLEVBQ0gsR0FBRyxFQUNILE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLEdBQUcsT0FBTyxFQUNRO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVZhbHVlLCB7IEJhc2VWYWx1ZU9wdGlvbnMgfSBmcm9tICdAYnVpbGRlcnMvQmFzZS9CYXNlVmFsdWUnO1xuaW1wb3J0IHsgQXJyYXlDb250YWlucywgQXJyYXlWYWx1ZSwgVmFsdWVTY2hlbWEgfSBmcm9tICdAdHlwaW5ncy9zY2hlbWEnO1xuXG5leHBvcnQgdHlwZSBBcnJheVZhbHVlT3B0aW9ucyA9IEJhc2VWYWx1ZU9wdGlvbnMgJiB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICB1bmlxdWU/OiBib29sZWFuO1xuICBjb250YWlucz86IEFycmF5Q29udGFpbnM7XG4gIGl0ZW1zPzogVmFsdWVTY2hlbWEgfCBWYWx1ZVNjaGVtYVtdO1xufTtcblxuLyoqXG4gKiBUaGUgYXJyYXkgdmFsdWUgYnVpbGRlciBjbGFzcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYXlWYWx1ZUJ1aWxkZXJcbiAgZXh0ZW5kcyBCYXNlVmFsdWVcbiAgaW1wbGVtZW50cyBBcnJheVZhbHVlPFZhbHVlU2NoZW1hPlxue1xuICBwdWJsaWMgdHlwZSA9ICdhcnJheScgYXMgY29uc3Q7XG4gIHB1YmxpYyBtaW4/OiBudW1iZXI7XG4gIHB1YmxpYyBtYXg/OiBudW1iZXI7XG4gIHB1YmxpYyB1bmlxdWU6IGJvb2xlYW47XG4gIHB1YmxpYyBjb250YWlucz86IEFycmF5Q29udGFpbnM7XG4gIHB1YmxpYyBpdGVtcz86IFZhbHVlU2NoZW1hIHwgVmFsdWVTY2hlbWFbXTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgYXJyYXkgdmFsdWUgYnVpbGRlciBjbGFzcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGFycmF5IHZhbHVlLlxuICAgKiBAcGFyYW0gb3B0aW9ucy5taW4gVGhlIG1pbmltdW0gYW1vdW50IG9mIGl0ZW1zIGluIHRoZSBhcnJheSB2YWx1ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMubWF4IFRoZSBtYXhpbXVtIGFtb3VudCBvZiBpdGVtcyBpbiB0aGUgYXJyYXkgdmFsdWUuXG4gICAqIEBwYXJhbSBvcHRpb25zLnVuaXF1ZSBXaGV0aGVyIHRoZSBhcnJheSB2YWx1ZSBpcyB1bmlxdWUuXG4gICAqIEBwYXJhbSBvcHRpb25zLmNvbnRhaW5zIFRoZSB0eXBlIHRoYXQgdGhlIGFycmF5IHZhbHVlIG5lZWRzIHRvIGNvbnRhaW4uXG4gICAqIEBwYXJhbSBvcHRpb25zLml0ZW1zIFRoZSBpdGVtcyBvZiB0aGUgYXJyYXkgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIG1pbixcbiAgICBtYXgsXG4gICAgdW5pcXVlLFxuICAgIGNvbnRhaW5zLFxuICAgIGl0ZW1zLFxuICAgIC4uLm9wdGlvbnNcbiAgfTogQXJyYXlWYWx1ZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnVuaXF1ZSA9IHVuaXF1ZSA/PyBmYWxzZTtcbiAgICB0aGlzLmNvbnRhaW5zID0gY29udGFpbnM7XG4gICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIGFycmF5IHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgYXJyYXkgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IHVua25vd24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZSxcbiAgICAgIG1heDogdGhpcy5tYXgsXG4gICAgICBtaW46IHRoaXMubWluLFxuICAgICAgdW5pcXVlOiB0aGlzLnVuaXF1ZSxcbiAgICB9O1xuICB9XG59XG4iXX0=