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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RydWN0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2J1aWxkZXJzL1N0cnVjdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWdCO0lBQzNCLElBQUksQ0FBUztJQUNiLElBQUksQ0FBZ0I7SUFDcEIsTUFBTSxDQUFtQjtJQUVqQzs7Ozs7O09BTUc7SUFDSCxZQUFtQixFQUNqQixJQUFJLEVBQ0osSUFBSSxFQUNKLE1BQU0sR0FLUDtRQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RydWN0dXJlRmllbGQsIFN0cnVjdHVyZVR5cGUgfSBmcm9tICdAdHlwaW5ncy9jb3JlJztcclxuaW1wb3J0IHsgRXhwb3J0ZWRTdHJ1Y3R1cmUgfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgU3RydWN0dXJlQnVpbGRlciBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIGEgZXhhbXBsZSBzdHJ1Y3R1cmVzIGZvciBvYmplY3Qgc2NoZW1hcyBhbmQgdmFsdWUgb3B0aW9ucy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0cnVjdHVyZUJ1aWxkZXIge1xyXG4gIHByaXZhdGUgbmFtZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgdHlwZTogU3RydWN0dXJlVHlwZTtcclxuICBwcml2YXRlIGZpZWxkczogU3RydWN0dXJlRmllbGRbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIHN0cnVjdHVyZS5cclxuICAgKiBAcGFyYW0gZmllbGRzIFRoZSBmaWVsZHMgb2YgdGhlIHN0cnVjdHVyZS5cclxuICAgKiBAcGFyYW0gZmllbGRzLm5hbWUgVGhlIG5hbWUgb2YgdGhlIGZpZWxkLlxyXG4gICAqIEBwYXJhbSBmaWVsZHMudHlwZSBUaGUgdHlwZSBvZiB0aGUgZmllbGQuXHJcbiAgICogQHBhcmFtIGZpZWxkcy5maWVsZHMgVGhlIGZpZWxkcyBvZiB0aGUgZmllbGQuXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcclxuICAgIG5hbWUsXHJcbiAgICB0eXBlLFxyXG4gICAgZmllbGRzLFxyXG4gIH06IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IFN0cnVjdHVyZVR5cGU7XHJcbiAgICBmaWVsZHM6IFN0cnVjdHVyZUZpZWxkW107XHJcbiAgfSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cG9ydHMgdGhlIHN0cnVjdHVyZS5cclxuICAgKiBAcmV0dXJucyBUaGUgZXhwb3J0ZWQgc3RydWN0dXJlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBleHBvcnQoKTogRXhwb3J0ZWRTdHJ1Y3R1cmUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgIGZpZWxkczogdGhpcy5maWVsZHMsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=