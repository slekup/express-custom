import { StructureField, StructureType } from '@typings/core';
import { ExportedStructure } from '@typings/exports';
/**
 * The StructureBuilder class is used to build a example structures for object schemas and value options.
 */
export default class StructureBuilder {
    private name;
    private type;
    private fields;
    /**
     * The name of the structure.
     * @param fields The fields of the structure.
     * @param fields.name The name of the field.
     * @param fields.type The type of the field.
     * @param fields.fields The fields of the field.
     */
    constructor({ name, type, fields, }: {
        name: string;
        type: StructureType;
        fields: StructureField[];
    });
    /**
     * Exports the structure.
     * @returns The exported structure.
     */
    export(): ExportedStructure;
}
//# sourceMappingURL=Structure.d.ts.map