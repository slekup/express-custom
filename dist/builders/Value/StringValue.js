import BaseValue from '@builders/Base/BaseValue';
/**
 * The string value builder class.
 */
export default class StringValueBuilder extends BaseValue {
    type = 'string';
    min;
    max;
    options;
    test;
    /**
     * Creates an instance of the string value builder class.
     * @param options The options of the string value.
     */
    constructor(options) {
        super(options);
        this.min = options.min;
        this.max = options.max;
        this.options = options.options ?? [];
        this.test = options.test;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVpbGRlcnMvVmFsdWUvU3RyaW5nVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUErQixNQUFNLDBCQUEwQixDQUFDO0FBVXZFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQkFDbkIsU0FBUSxTQUFTO0lBR1YsSUFBSSxHQUFHLFFBQWlCLENBQUM7SUFDekIsR0FBRyxDQUFVO0lBQ2IsR0FBRyxDQUFVO0lBQ2IsT0FBTyxDQUFXO0lBQ2xCLElBQUksQ0FBYztJQUV6Qjs7O09BR0c7SUFDSCxZQUFtQixPQUEyQjtRQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVZhbHVlLCB7IEJhc2VWYWx1ZU9wdGlvbnMgfSBmcm9tICdAYnVpbGRlcnMvQmFzZS9CYXNlVmFsdWUnO1xyXG5pbXBvcnQgeyBTdHJpbmdUZXN0LCBTdHJpbmdWYWx1ZSB9IGZyb20gJ0B0eXBpbmdzL3NjaGVtYSc7XHJcblxyXG5leHBvcnQgdHlwZSBTdHJpbmdWYWx1ZU9wdGlvbnMgPSBCYXNlVmFsdWVPcHRpb25zICYge1xyXG4gIG1pbj86IG51bWJlcjtcclxuICBtYXg/OiBudW1iZXI7XHJcbiAgb3B0aW9ucz86IHN0cmluZ1tdO1xyXG4gIHRlc3Q/OiBTdHJpbmdUZXN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBzdHJpbmcgdmFsdWUgYnVpbGRlciBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0cmluZ1ZhbHVlQnVpbGRlclxyXG4gIGV4dGVuZHMgQmFzZVZhbHVlXHJcbiAgaW1wbGVtZW50cyBTdHJpbmdWYWx1ZVxyXG57XHJcbiAgcHVibGljIHR5cGUgPSAnc3RyaW5nJyBhcyBjb25zdDtcclxuICBwdWJsaWMgbWluPzogbnVtYmVyO1xyXG4gIHB1YmxpYyBtYXg/OiBudW1iZXI7XHJcbiAgcHVibGljIG9wdGlvbnM6IHN0cmluZ1tdO1xyXG4gIHB1YmxpYyB0ZXN0PzogU3RyaW5nVGVzdDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgc3RyaW5nIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIHN0cmluZyB2YWx1ZS5cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogU3RyaW5nVmFsdWVPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMubWluID0gb3B0aW9ucy5taW47XHJcbiAgICB0aGlzLm1heCA9IG9wdGlvbnMubWF4O1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucy5vcHRpb25zID8/IFtdO1xyXG4gICAgdGhpcy50ZXN0ID0gb3B0aW9ucy50ZXN0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhwb3J0cyB0aGUgdmFsdWUuXHJcbiAgICogQHJldHVybnMgVGhlIGV4cG9ydGVkIHZhbHVlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBleHBvcnQoKTogdW5rbm93biB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXHJcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxyXG4gICAgICBzdHJ1Y3R1cmU6IHRoaXMuc3RydWN0dXJlLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19