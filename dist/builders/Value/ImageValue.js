import BaseValue from '@builders/Base/BaseValue';
/**
 * The image value builder class.
 */
export default class ImageValueBuilder extends BaseValue {
    type = 'image';
    /**
     * Creates an instance of the image value builder class.
     * @param options The options of the image value.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWlsZGVycy9WYWx1ZS9JbWFnZVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBK0IsTUFBTSwwQkFBMEIsQ0FBQztBQUt2RTs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQWtCLFNBQVEsU0FBUztJQUMvQyxJQUFJLEdBQUcsT0FBZ0IsQ0FBQztJQUUvQjs7O09BR0c7SUFDSCxZQUFtQixPQUEwQjtRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlVmFsdWUsIHsgQmFzZVZhbHVlT3B0aW9ucyB9IGZyb20gJ0BidWlsZGVycy9CYXNlL0Jhc2VWYWx1ZSc7XG5pbXBvcnQgeyBJbWFnZVZhbHVlIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcblxuZXhwb3J0IHR5cGUgSW1hZ2VWYWx1ZU9wdGlvbnMgPSBCYXNlVmFsdWVPcHRpb25zO1xuXG4vKipcbiAqIFRoZSBpbWFnZSB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZVZhbHVlQnVpbGRlciBleHRlbmRzIEJhc2VWYWx1ZSBpbXBsZW1lbnRzIEltYWdlVmFsdWUge1xuICBwdWJsaWMgdHlwZSA9ICdpbWFnZScgYXMgY29uc3Q7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGltYWdlIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBpbWFnZSB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBJbWFnZVZhbHVlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IHVua25vd24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZSxcbiAgICB9O1xuICB9XG59XG4iXX0=