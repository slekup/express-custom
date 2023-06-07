import BaseValue from '@builders/Base/BaseValue';
/**
 * The boolean value builder class.
 */
export default class BooleanValueBuilder extends BaseValue {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbGVhblZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1aWxkZXJzL1ZhbHVlL0Jvb2xlYW5WYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQStCLE1BQU0sMEJBQTBCLENBQUM7QUFLdkU7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUNuQixTQUFRLFNBQVM7SUFHVixJQUFJLEdBQUcsU0FBa0IsQ0FBQztJQUVqQzs7O09BR0c7SUFDSCxZQUFtQixPQUE0QjtRQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlVmFsdWUsIHsgQmFzZVZhbHVlT3B0aW9ucyB9IGZyb20gJ0BidWlsZGVycy9CYXNlL0Jhc2VWYWx1ZSc7XG5pbXBvcnQgeyBCb29sZWFuVmFsdWUgfSBmcm9tICdAdHlwaW5ncy9zY2hlbWEnO1xuXG5leHBvcnQgdHlwZSBCb29sZWFuVmFsdWVPcHRpb25zID0gQmFzZVZhbHVlT3B0aW9ucztcblxuLyoqXG4gKiBUaGUgYm9vbGVhbiB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29sZWFuVmFsdWVCdWlsZGVyXG4gIGV4dGVuZHMgQmFzZVZhbHVlXG4gIGltcGxlbWVudHMgQm9vbGVhblZhbHVlXG57XG4gIHB1YmxpYyB0eXBlID0gJ2Jvb2xlYW4nIGFzIGNvbnN0O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBib29sZWFuIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBib29sZWFuIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEJvb2xlYW5WYWx1ZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIHRoZSB2YWx1ZS5cbiAgICogQHJldHVybnMgVGhlIGV4cG9ydGVkIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGV4cG9ydCgpOiB1bmtub3duIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZCxcbiAgICAgIHN0cnVjdHVyZTogdGhpcy5zdHJ1Y3R1cmUsXG4gICAgfTtcbiAgfVxufVxuIl19