"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The object value builder class.
 */
class ObjectValueBuilder extends BaseValue_1.default {
    type = 'object';
    properties;
    /**
     * Creates an instance of the object value builder class.
     * @param options The options of the object value builder class.
     */
    constructor(options) {
        super(options);
        this.properties = {};
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
exports.default = ObjectValueBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVpbGRlcnMvVmFsdWUvT2JqZWN0VmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5RUFBdUU7QUFPdkU7O0dBRUc7QUFDSCxNQUFxQixrQkFDbkIsU0FBUSxtQkFBUztJQUdWLElBQUksR0FBRyxRQUFpQixDQUFDO0lBQ3pCLFVBQVUsQ0FBUztJQUUxQjs7O09BR0c7SUFDSCxZQUFtQixPQUEyQjtRQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMxQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBN0JELHFDQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlVmFsdWUsIHsgQmFzZVZhbHVlT3B0aW9ucyB9IGZyb20gJ0BidWlsZGVycy9CYXNlL0Jhc2VWYWx1ZSc7XG5pbXBvcnQgeyBPYmplY3RWYWx1ZSwgU2NoZW1hIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcblxuZXhwb3J0IHR5cGUgT2JqZWN0VmFsdWVPcHRpb25zID0gQmFzZVZhbHVlT3B0aW9ucyAmIHtcbiAgcHJvcGVydGllczogU2NoZW1hO1xufTtcblxuLyoqXG4gKiBUaGUgb2JqZWN0IHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iamVjdFZhbHVlQnVpbGRlcjxUPlxuICBleHRlbmRzIEJhc2VWYWx1ZVxuICBpbXBsZW1lbnRzIE9iamVjdFZhbHVlPFQ+XG57XG4gIHB1YmxpYyB0eXBlID0gJ29iamVjdCcgYXMgY29uc3Q7XG4gIHB1YmxpYyBwcm9wZXJ0aWVzOiBTY2hlbWE7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIG9iamVjdCB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgb2JqZWN0IHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0VmFsdWVPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyB0aGUgdmFsdWUuXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBleHBvcnQoKTogdW5rbm93biB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWQsXG4gICAgICBzdHJ1Y3R1cmU6IHRoaXMuc3RydWN0dXJlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==