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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVpbGRlcnMvVmFsdWUvU3RyaW5nVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUErQixNQUFNLDBCQUEwQixDQUFDO0FBVXZFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQkFDbkIsU0FBUSxTQUFTO0lBR1YsSUFBSSxHQUFHLFFBQWlCLENBQUM7SUFDekIsR0FBRyxDQUFVO0lBQ2IsR0FBRyxDQUFVO0lBQ2IsT0FBTyxDQUFXO0lBQ2xCLElBQUksQ0FBYztJQUV6Qjs7O09BR0c7SUFDSCxZQUFtQixPQUEyQjtRQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVZhbHVlLCB7IEJhc2VWYWx1ZU9wdGlvbnMgfSBmcm9tICdAYnVpbGRlcnMvQmFzZS9CYXNlVmFsdWUnO1xuaW1wb3J0IHsgU3RyaW5nVGVzdCwgU3RyaW5nVmFsdWUgfSBmcm9tICdAdHlwaW5ncy9zY2hlbWEnO1xuXG5leHBvcnQgdHlwZSBTdHJpbmdWYWx1ZU9wdGlvbnMgPSBCYXNlVmFsdWVPcHRpb25zICYge1xuICBtaW4/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbiAgb3B0aW9ucz86IHN0cmluZ1tdO1xuICB0ZXN0PzogU3RyaW5nVGVzdDtcbn07XG5cbi8qKlxuICogVGhlIHN0cmluZyB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHJpbmdWYWx1ZUJ1aWxkZXJcbiAgZXh0ZW5kcyBCYXNlVmFsdWVcbiAgaW1wbGVtZW50cyBTdHJpbmdWYWx1ZVxue1xuICBwdWJsaWMgdHlwZSA9ICdzdHJpbmcnIGFzIGNvbnN0O1xuICBwdWJsaWMgbWluPzogbnVtYmVyO1xuICBwdWJsaWMgbWF4PzogbnVtYmVyO1xuICBwdWJsaWMgb3B0aW9uczogc3RyaW5nW107XG4gIHB1YmxpYyB0ZXN0PzogU3RyaW5nVGVzdDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgc3RyaW5nIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBzdHJpbmcgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogU3RyaW5nVmFsdWVPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5taW4gPSBvcHRpb25zLm1pbjtcbiAgICB0aGlzLm1heCA9IG9wdGlvbnMubWF4O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMub3B0aW9ucyA/PyBbXTtcbiAgICB0aGlzLnRlc3QgPSBvcHRpb25zLnRlc3Q7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyB0aGUgdmFsdWUuXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBleHBvcnQoKTogdW5rbm93biB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWQsXG4gICAgICBzdHJ1Y3R1cmU6IHRoaXMuc3RydWN0dXJlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==