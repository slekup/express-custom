"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The StructureBuilder class is used to build a example structures for object schemas and value options.
 */
class StructureBuilder {
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
exports.default = StructureBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RydWN0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2J1aWxkZXJzL1N0cnVjdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBOztHQUVHO0FBQ0gsTUFBcUIsZ0JBQWdCO0lBQzNCLElBQUksQ0FBUztJQUNiLElBQUksQ0FBZ0I7SUFDcEIsTUFBTSxDQUFtQjtJQUVqQzs7Ozs7O09BTUc7SUFDSCxZQUFtQixFQUNqQixJQUFJLEVBQ0osSUFBSSxFQUNKLE1BQU0sR0FLUDtRQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBckNELG1DQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0cnVjdHVyZUZpZWxkLCBTdHJ1Y3R1cmVUeXBlIH0gZnJvbSAnQHR5cGluZ3MvY29yZSc7XG5pbXBvcnQgeyBFeHBvcnRlZFN0cnVjdHVyZSB9IGZyb20gJ0B0eXBpbmdzL2V4cG9ydHMnO1xuXG4vKipcbiAqIFRoZSBTdHJ1Y3R1cmVCdWlsZGVyIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgYSBleGFtcGxlIHN0cnVjdHVyZXMgZm9yIG9iamVjdCBzY2hlbWFzIGFuZCB2YWx1ZSBvcHRpb25zLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHJ1Y3R1cmVCdWlsZGVyIHtcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgdHlwZTogU3RydWN0dXJlVHlwZTtcbiAgcHJpdmF0ZSBmaWVsZHM6IFN0cnVjdHVyZUZpZWxkW107XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBzdHJ1Y3R1cmUuXG4gICAqIEBwYXJhbSBmaWVsZHMgVGhlIGZpZWxkcyBvZiB0aGUgc3RydWN0dXJlLlxuICAgKiBAcGFyYW0gZmllbGRzLm5hbWUgVGhlIG5hbWUgb2YgdGhlIGZpZWxkLlxuICAgKiBAcGFyYW0gZmllbGRzLnR5cGUgVGhlIHR5cGUgb2YgdGhlIGZpZWxkLlxuICAgKiBAcGFyYW0gZmllbGRzLmZpZWxkcyBUaGUgZmllbGRzIG9mIHRoZSBmaWVsZC5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgbmFtZSxcbiAgICB0eXBlLFxuICAgIGZpZWxkcyxcbiAgfToge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0eXBlOiBTdHJ1Y3R1cmVUeXBlO1xuICAgIGZpZWxkczogU3RydWN0dXJlRmllbGRbXTtcbiAgfSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIHRoZSBzdHJ1Y3R1cmUuXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCBzdHJ1Y3R1cmUuXG4gICAqL1xuICBwdWJsaWMgZXhwb3J0KCk6IEV4cG9ydGVkU3RydWN0dXJlIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgZmllbGRzOiB0aGlzLmZpZWxkcyxcbiAgICB9O1xuICB9XG59XG4iXX0=