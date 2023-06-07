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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWlsZGVycy9WYWx1ZS9JbWFnZVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBK0IsTUFBTSwwQkFBMEIsQ0FBQztBQUt2RTs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQWtCLFNBQVEsU0FBUztJQUMvQyxJQUFJLEdBQUcsT0FBZ0IsQ0FBQztJQUUvQjs7O09BR0c7SUFDSCxZQUFtQixPQUEwQjtRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlVmFsdWUsIHsgQmFzZVZhbHVlT3B0aW9ucyB9IGZyb20gJ0BidWlsZGVycy9CYXNlL0Jhc2VWYWx1ZSc7XHJcbmltcG9ydCB7IEltYWdlVmFsdWUgfSBmcm9tICdAdHlwaW5ncy9zY2hlbWEnO1xyXG5cclxuZXhwb3J0IHR5cGUgSW1hZ2VWYWx1ZU9wdGlvbnMgPSBCYXNlVmFsdWVPcHRpb25zO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBpbWFnZSB2YWx1ZSBidWlsZGVyIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VWYWx1ZUJ1aWxkZXIgZXh0ZW5kcyBCYXNlVmFsdWUgaW1wbGVtZW50cyBJbWFnZVZhbHVlIHtcclxuICBwdWJsaWMgdHlwZSA9ICdpbWFnZScgYXMgY29uc3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGltYWdlIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIGltYWdlIHZhbHVlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBJbWFnZVZhbHVlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHBvcnRzIHRoZSB2YWx1ZS5cclxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgdmFsdWUuXHJcbiAgICovXHJcbiAgcHVibGljIGV4cG9ydCgpOiB1bmtub3duIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcclxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcclxuICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWQsXHJcbiAgICAgIHN0cnVjdHVyZTogdGhpcy5zdHJ1Y3R1cmUsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=