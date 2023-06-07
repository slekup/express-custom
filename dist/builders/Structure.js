/**
 * The StructureBuilder class is used to build a example structures for object schemas and value options.
 */
export default class StructureBuilder {
    name;
    type;
    fields;
    /**
     * The name of the structure.
     * @param fields The fields of the structure.
     * @param fields.name The name of the field.
     * @param fields.type The type of the field.
     * @param fields.fields The fields of the field.
     */
    constructor({ name, type, fields, }) {
        this.name = name;
        this.type = type;
        this.fields = fields;
    }
    /**
     * Exports the structure.
     * @returns The exported structure.
     */
    export() {
        return {
            name: this.name,
            type: this.type,
            fields: this.fields,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RydWN0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2J1aWxkZXJzL1N0cnVjdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWdCO0lBQzNCLElBQUksQ0FBUztJQUNiLElBQUksQ0FBZ0I7SUFDcEIsTUFBTSxDQUFtQjtJQUVqQzs7Ozs7O09BTUc7SUFDSCxZQUFtQixFQUNqQixJQUFJLEVBQ0osSUFBSSxFQUNKLE1BQU0sR0FLUDtRQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RydWN0dXJlRmllbGQsIFN0cnVjdHVyZVR5cGUgfSBmcm9tICdAdHlwaW5ncy9jb3JlJztcbmltcG9ydCB7IEV4cG9ydGVkU3RydWN0dXJlIH0gZnJvbSAnQHR5cGluZ3MvZXhwb3J0cyc7XG5cbi8qKlxuICogVGhlIFN0cnVjdHVyZUJ1aWxkZXIgY2xhc3MgaXMgdXNlZCB0byBidWlsZCBhIGV4YW1wbGUgc3RydWN0dXJlcyBmb3Igb2JqZWN0IHNjaGVtYXMgYW5kIHZhbHVlIG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0cnVjdHVyZUJ1aWxkZXIge1xuICBwcml2YXRlIG5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSB0eXBlOiBTdHJ1Y3R1cmVUeXBlO1xuICBwcml2YXRlIGZpZWxkczogU3RydWN0dXJlRmllbGRbXTtcblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIHN0cnVjdHVyZS5cbiAgICogQHBhcmFtIGZpZWxkcyBUaGUgZmllbGRzIG9mIHRoZSBzdHJ1Y3R1cmUuXG4gICAqIEBwYXJhbSBmaWVsZHMubmFtZSBUaGUgbmFtZSBvZiB0aGUgZmllbGQuXG4gICAqIEBwYXJhbSBmaWVsZHMudHlwZSBUaGUgdHlwZSBvZiB0aGUgZmllbGQuXG4gICAqIEBwYXJhbSBmaWVsZHMuZmllbGRzIFRoZSBmaWVsZHMgb2YgdGhlIGZpZWxkLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBuYW1lLFxuICAgIHR5cGUsXG4gICAgZmllbGRzLFxuICB9OiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHR5cGU6IFN0cnVjdHVyZVR5cGU7XG4gICAgZmllbGRzOiBTdHJ1Y3R1cmVGaWVsZFtdO1xuICB9KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZmllbGRzID0gZmllbGRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgdGhlIHN0cnVjdHVyZS5cbiAgICogQHJldHVybnMgVGhlIGV4cG9ydGVkIHN0cnVjdHVyZS5cbiAgICovXG4gIHB1YmxpYyBleHBvcnQoKTogRXhwb3J0ZWRTdHJ1Y3R1cmUge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBmaWVsZHM6IHRoaXMuZmllbGRzLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==