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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVpbGRlcnMvVmFsdWUvT2JqZWN0VmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUErQixNQUFNLDBCQUEwQixDQUFDO0FBT3ZFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQkFDbkIsU0FBUSxTQUFTO0lBR1YsSUFBSSxHQUFHLFFBQWlCLENBQUM7SUFDekIsVUFBVSxDQUFTO0lBRTFCOzs7T0FHRztJQUNILFlBQW1CLE9BQTJCO1FBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVZhbHVlLCB7IEJhc2VWYWx1ZU9wdGlvbnMgfSBmcm9tICdAYnVpbGRlcnMvQmFzZS9CYXNlVmFsdWUnO1xuaW1wb3J0IHsgT2JqZWN0VmFsdWUsIFNjaGVtYSB9IGZyb20gJ0B0eXBpbmdzL3NjaGVtYSc7XG5cbmV4cG9ydCB0eXBlIE9iamVjdFZhbHVlT3B0aW9ucyA9IEJhc2VWYWx1ZU9wdGlvbnMgJiB7XG4gIHByb3BlcnRpZXM6IFNjaGVtYTtcbn07XG5cbi8qKlxuICogVGhlIG9iamVjdCB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYmplY3RWYWx1ZUJ1aWxkZXI8VD5cbiAgZXh0ZW5kcyBCYXNlVmFsdWVcbiAgaW1wbGVtZW50cyBPYmplY3RWYWx1ZTxUPlxue1xuICBwdWJsaWMgdHlwZSA9ICdvYmplY3QnIGFzIGNvbnN0O1xuICBwdWJsaWMgcHJvcGVydGllczogU2NoZW1hO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBvYmplY3QgdmFsdWUgYnVpbGRlciBjbGFzcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgdGhlIG9iamVjdCB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdFZhbHVlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMucHJvcGVydGllcyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHZhbHVlLlxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IHVua25vd24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZSxcbiAgICB9O1xuICB9XG59XG4iXX0=