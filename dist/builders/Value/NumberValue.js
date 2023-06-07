import BaseValue from '@builders/Base/BaseValue';
/**
 * The number value builder class.
 */
export default class NumberValueBuilder extends BaseValue {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVyVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVpbGRlcnMvVmFsdWUvTnVtYmVyVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUErQixNQUFNLDBCQUEwQixDQUFDO0FBUXZFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQkFDbkIsU0FBUSxTQUFTO0lBR1YsSUFBSSxHQUFHLFFBQWlCLENBQUM7SUFDekIsR0FBRyxDQUFVO0lBQ2IsR0FBRyxDQUFVO0lBRXBCOzs7T0FHRztJQUNILFlBQW1CLE9BQTJCO1FBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlVmFsdWUsIHsgQmFzZVZhbHVlT3B0aW9ucyB9IGZyb20gJ0BidWlsZGVycy9CYXNlL0Jhc2VWYWx1ZSc7XHJcbmltcG9ydCB7IE51bWJlclZhbHVlIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcclxuXHJcbmV4cG9ydCB0eXBlIE51bWJlclZhbHVlT3B0aW9ucyA9IEJhc2VWYWx1ZU9wdGlvbnMgJiB7XHJcbiAgbWluPzogbnVtYmVyO1xyXG4gIG1heD86IG51bWJlcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgbnVtYmVyIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOdW1iZXJWYWx1ZUJ1aWxkZXJcclxuICBleHRlbmRzIEJhc2VWYWx1ZVxyXG4gIGltcGxlbWVudHMgTnVtYmVyVmFsdWVcclxue1xyXG4gIHB1YmxpYyB0eXBlID0gJ251bWJlcicgYXMgY29uc3Q7XHJcbiAgcHVibGljIG1pbj86IG51bWJlcjtcclxuICBwdWJsaWMgbWF4PzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBudW1iZXIgdmFsdWUgYnVpbGRlciBjbGFzcy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgbnVtYmVyIHZhbHVlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBOdW1iZXJWYWx1ZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5taW4gPSBvcHRpb25zLm1pbjtcclxuICAgIHRoaXMubWF4ID0gb3B0aW9ucy5tYXg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHBvcnRzIHRoZSB2YWx1ZS5cclxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgdmFsdWUuXHJcbiAgICovXHJcbiAgcHVibGljIGV4cG9ydCgpOiB1bmtub3duIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcclxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcclxuICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWQsXHJcbiAgICAgIHN0cnVjdHVyZTogdGhpcy5zdHJ1Y3R1cmUsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=