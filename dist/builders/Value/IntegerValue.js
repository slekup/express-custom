import BaseValue from '@builders/Base/BaseValue';
/**
 * The integer value builder class.
 */
export default class IntegerValueBuilder extends BaseValue {
    type = 'integer';
    min;
    max;
    /**
     * Creates an instance of the integer value builder class.
     * @param options The options of the integer value.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZWdlclZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1aWxkZXJzL1ZhbHVlL0ludGVnZXJWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQStCLE1BQU0sMEJBQTBCLENBQUM7QUFRdkU7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUNuQixTQUFRLFNBQVM7SUFHVixJQUFJLEdBQUcsU0FBa0IsQ0FBQztJQUMxQixHQUFHLENBQVU7SUFDYixHQUFHLENBQVU7SUFFcEI7OztPQUdHO0lBQ0gsWUFBbUIsT0FBNEI7UUFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMxQixDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VWYWx1ZSwgeyBCYXNlVmFsdWVPcHRpb25zIH0gZnJvbSAnQGJ1aWxkZXJzL0Jhc2UvQmFzZVZhbHVlJztcbmltcG9ydCB7IEludGVnZXJWYWx1ZSB9IGZyb20gJ0B0eXBpbmdzL3NjaGVtYSc7XG5cbmV4cG9ydCB0eXBlIEludGVnZXJWYWx1ZU9wdGlvbnMgPSBCYXNlVmFsdWVPcHRpb25zICYge1xuICBtaW4/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbn07XG5cbi8qKlxuICogVGhlIGludGVnZXIgdmFsdWUgYnVpbGRlciBjbGFzcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdlclZhbHVlQnVpbGRlclxuICBleHRlbmRzIEJhc2VWYWx1ZVxuICBpbXBsZW1lbnRzIEludGVnZXJWYWx1ZVxue1xuICBwdWJsaWMgdHlwZSA9ICdpbnRlZ2VyJyBhcyBjb25zdDtcbiAgcHVibGljIG1pbj86IG51bWJlcjtcbiAgcHVibGljIG1heD86IG51bWJlcjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgaW50ZWdlciB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgaW50ZWdlciB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBJbnRlZ2VyVmFsdWVPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5taW4gPSBvcHRpb25zLm1pbjtcbiAgICB0aGlzLm1heCA9IG9wdGlvbnMubWF4O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IHVua25vd24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZSxcbiAgICB9O1xuICB9XG59XG4iXX0=