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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZWdlclZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1aWxkZXJzL1ZhbHVlL0ludGVnZXJWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQStCLE1BQU0sMEJBQTBCLENBQUM7QUFRdkU7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUNuQixTQUFRLFNBQVM7SUFHVixJQUFJLEdBQUcsU0FBa0IsQ0FBQztJQUMxQixHQUFHLENBQVU7SUFDYixHQUFHLENBQVU7SUFFcEI7OztPQUdHO0lBQ0gsWUFBbUIsT0FBNEI7UUFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMxQixDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VWYWx1ZSwgeyBCYXNlVmFsdWVPcHRpb25zIH0gZnJvbSAnQGJ1aWxkZXJzL0Jhc2UvQmFzZVZhbHVlJztcclxuaW1wb3J0IHsgSW50ZWdlclZhbHVlIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcclxuXHJcbmV4cG9ydCB0eXBlIEludGVnZXJWYWx1ZU9wdGlvbnMgPSBCYXNlVmFsdWVPcHRpb25zICYge1xyXG4gIG1pbj86IG51bWJlcjtcclxuICBtYXg/OiBudW1iZXI7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIGludGVnZXIgdmFsdWUgYnVpbGRlciBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVnZXJWYWx1ZUJ1aWxkZXJcclxuICBleHRlbmRzIEJhc2VWYWx1ZVxyXG4gIGltcGxlbWVudHMgSW50ZWdlclZhbHVlXHJcbntcclxuICBwdWJsaWMgdHlwZSA9ICdpbnRlZ2VyJyBhcyBjb25zdDtcclxuICBwdWJsaWMgbWluPzogbnVtYmVyO1xyXG4gIHB1YmxpYyBtYXg/OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGludGVnZXIgdmFsdWUgYnVpbGRlciBjbGFzcy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgaW50ZWdlciB2YWx1ZS5cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogSW50ZWdlclZhbHVlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLm1pbiA9IG9wdGlvbnMubWluO1xyXG4gICAgdGhpcy5tYXggPSBvcHRpb25zLm1heDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cG9ydHMgdGhlIHZhbHVlLlxyXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCB2YWx1ZS5cclxuICAgKi9cclxuICBwdWJsaWMgZXhwb3J0KCk6IHVua25vd24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZCxcclxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==