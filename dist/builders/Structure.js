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
//# sourceMappingURL=Structure.js.map