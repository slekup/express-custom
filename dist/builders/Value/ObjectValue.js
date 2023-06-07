import BaseValue from '@builders/Base/BaseValue';
/**
 * The object value builder class.
 */
export default class ObjectValueBuilder extends BaseValue {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVpbGRlcnMvVmFsdWUvT2JqZWN0VmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUErQixNQUFNLDBCQUEwQixDQUFDO0FBT3ZFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQkFDbkIsU0FBUSxTQUFTO0lBR1YsSUFBSSxHQUFHLFFBQWlCLENBQUM7SUFDekIsVUFBVSxDQUFTO0lBRTFCOzs7T0FHRztJQUNILFlBQW1CLE9BQTJCO1FBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVZhbHVlLCB7IEJhc2VWYWx1ZU9wdGlvbnMgfSBmcm9tICdAYnVpbGRlcnMvQmFzZS9CYXNlVmFsdWUnO1xyXG5pbXBvcnQgeyBPYmplY3RWYWx1ZSwgU2NoZW1hIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcclxuXHJcbmV4cG9ydCB0eXBlIE9iamVjdFZhbHVlT3B0aW9ucyA9IEJhc2VWYWx1ZU9wdGlvbnMgJiB7XHJcbiAgcHJvcGVydGllczogU2NoZW1hO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBvYmplY3QgdmFsdWUgYnVpbGRlciBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iamVjdFZhbHVlQnVpbGRlcjxUPlxyXG4gIGV4dGVuZHMgQmFzZVZhbHVlXHJcbiAgaW1wbGVtZW50cyBPYmplY3RWYWx1ZTxUPlxyXG57XHJcbiAgcHVibGljIHR5cGUgPSAnb2JqZWN0JyBhcyBjb25zdDtcclxuICBwdWJsaWMgcHJvcGVydGllczogU2NoZW1hO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBvYmplY3QgdmFsdWUgYnVpbGRlciBjbGFzcy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgb2JqZWN0IHZhbHVlIGJ1aWxkZXIgY2xhc3MuXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdFZhbHVlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLnByb3BlcnRpZXMgPSB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cG9ydHMgdGhlIHZhbHVlLlxyXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCB2YWx1ZS5cclxuICAgKi9cclxuICBwdWJsaWMgZXhwb3J0KCk6IHVua25vd24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZCxcclxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==