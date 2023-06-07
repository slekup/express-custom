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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbGVhblZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1aWxkZXJzL1ZhbHVlL0Jvb2xlYW5WYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQStCLE1BQU0sMEJBQTBCLENBQUM7QUFLdkU7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUNuQixTQUFRLFNBQVM7SUFHVixJQUFJLEdBQUcsU0FBa0IsQ0FBQztJQUVqQzs7O09BR0c7SUFDSCxZQUFtQixPQUE0QjtRQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlVmFsdWUsIHsgQmFzZVZhbHVlT3B0aW9ucyB9IGZyb20gJ0BidWlsZGVycy9CYXNlL0Jhc2VWYWx1ZSc7XHJcbmltcG9ydCB7IEJvb2xlYW5WYWx1ZSB9IGZyb20gJ0B0eXBpbmdzL3NjaGVtYSc7XHJcblxyXG5leHBvcnQgdHlwZSBCb29sZWFuVmFsdWVPcHRpb25zID0gQmFzZVZhbHVlT3B0aW9ucztcclxuXHJcbi8qKlxyXG4gKiBUaGUgYm9vbGVhbiB2YWx1ZSBidWlsZGVyIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vbGVhblZhbHVlQnVpbGRlclxyXG4gIGV4dGVuZHMgQmFzZVZhbHVlXHJcbiAgaW1wbGVtZW50cyBCb29sZWFuVmFsdWVcclxue1xyXG4gIHB1YmxpYyB0eXBlID0gJ2Jvb2xlYW4nIGFzIGNvbnN0O1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBib29sZWFuIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGJvb2xlYW4gdmFsdWUuXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEJvb2xlYW5WYWx1ZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhwb3J0cyB0aGUgdmFsdWUuXHJcbiAgICogQHJldHVybnMgVGhlIGV4cG9ydGVkIHZhbHVlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBleHBvcnQoKTogdW5rbm93biB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXHJcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxyXG4gICAgICBzdHJ1Y3R1cmU6IHRoaXMuc3RydWN0dXJlLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19