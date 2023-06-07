"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The string value builder class.
 */
class StringValueBuilder extends BaseValue_1.default {
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
exports.default = StringValueBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVpbGRlcnMvVmFsdWUvU3RyaW5nVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5RUFBdUU7QUFVdkU7O0dBRUc7QUFDSCxNQUFxQixrQkFDbkIsU0FBUSxtQkFBUztJQUdWLElBQUksR0FBRyxRQUFpQixDQUFDO0lBQ3pCLEdBQUcsQ0FBVTtJQUNiLEdBQUcsQ0FBVTtJQUNiLE9BQU8sQ0FBVztJQUNsQixJQUFJLENBQWM7SUFFekI7OztPQUdHO0lBQ0gsWUFBbUIsT0FBMkI7UUFDNUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMxQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBbkNELHFDQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlVmFsdWUsIHsgQmFzZVZhbHVlT3B0aW9ucyB9IGZyb20gJ0BidWlsZGVycy9CYXNlL0Jhc2VWYWx1ZSc7XG5pbXBvcnQgeyBTdHJpbmdUZXN0LCBTdHJpbmdWYWx1ZSB9IGZyb20gJ0B0eXBpbmdzL3NjaGVtYSc7XG5cbmV4cG9ydCB0eXBlIFN0cmluZ1ZhbHVlT3B0aW9ucyA9IEJhc2VWYWx1ZU9wdGlvbnMgJiB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBvcHRpb25zPzogc3RyaW5nW107XG4gIHRlc3Q/OiBTdHJpbmdUZXN0O1xufTtcblxuLyoqXG4gKiBUaGUgc3RyaW5nIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0cmluZ1ZhbHVlQnVpbGRlclxuICBleHRlbmRzIEJhc2VWYWx1ZVxuICBpbXBsZW1lbnRzIFN0cmluZ1ZhbHVlXG57XG4gIHB1YmxpYyB0eXBlID0gJ3N0cmluZycgYXMgY29uc3Q7XG4gIHB1YmxpYyBtaW4/OiBudW1iZXI7XG4gIHB1YmxpYyBtYXg/OiBudW1iZXI7XG4gIHB1YmxpYyBvcHRpb25zOiBzdHJpbmdbXTtcbiAgcHVibGljIHRlc3Q/OiBTdHJpbmdUZXN0O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBzdHJpbmcgdmFsdWUgYnVpbGRlciBjbGFzcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIHN0cmluZyB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBTdHJpbmdWYWx1ZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLm1pbiA9IG9wdGlvbnMubWluO1xuICAgIHRoaXMubWF4ID0gb3B0aW9ucy5tYXg7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucy5vcHRpb25zID8/IFtdO1xuICAgIHRoaXMudGVzdCA9IG9wdGlvbnMudGVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIHRoZSB2YWx1ZS5cbiAgICogQHJldHVybnMgVGhlIGV4cG9ydGVkIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGV4cG9ydCgpOiB1bmtub3duIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZCxcbiAgICAgIHN0cnVjdHVyZTogdGhpcy5zdHJ1Y3R1cmUsXG4gICAgfTtcbiAgfVxufVxuIl19