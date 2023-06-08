import { StructureField, StructureType } from '@typings/core';
import { ExportedStructure } from '@typings/exports';
/**
 * The StructureBuilder class, used to build a example structures for object schemas and value options.
 */
export default class Structure {
    private name;
    private type;
    private fields;
    /**
     * Creates a new instance of the StructureBuilder class.
     * @param options The options for the StructureBuilder class.
     * @param options.name The name of the structure.
     * @param options.type The type of the structure.
     * @param options.fields The fields of the structure.
     */
    constructor({ name, type, fields, }: {
        name: string;
        type: StructureType;
        fields: StructureField[];
    });
    /**
     * Exports the structure as a JSON object.
     * @returns The exported structure as a JSON object.
     */
    export(): ExportedStructure;
}
//# sourceMappingURL=Structure.d.ts.map