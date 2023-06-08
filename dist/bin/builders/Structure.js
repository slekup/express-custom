"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The StructureBuilder class, used to build a example structures for object schemas and value options.
 */
class Structure {
    name;
    type;
    fields;
    /**
     * Creates a new instance of the StructureBuilder class.
     * @param options The options for the StructureBuilder class.
     * @param options.name The name of the structure.
     * @param options.type The type of the structure.
     * @param options.fields The fields of the structure.
     */
    constructor({ name, type, fields, }) {
        // Assign the properties to the instance.
        this.name = name;
        this.type = type;
        this.fields = fields;
    }
    /**
     * Exports the structure as a JSON object.
     * @returns The exported structure as a JSON object.
     */
    export() {
        return {
            name: this.name,
            type: this.type,
            fields: this.fields,
        };
    }
}
exports.default = Structure;
