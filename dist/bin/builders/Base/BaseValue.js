"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The BaseValue class. Used as a foundation for all value builders.
 */
class BaseValue {
    name;
    description;
    required;
    checks;
    structure;
    defaultValue;
    /**
     * Creates a new instance of the BaseValue class.
     * @param options The options of the value.
     * @param options.name The name of the value.
     * @param options.description The description of the value.
     * @param options.required Whether the value is required.
     * @param options.checks The checks of the value.
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.required = options.required ?? false; // Default to false
        this.checks = options.checks ?? [];
        this.structure = options.structure;
        this.defaultValue = options.defaultValue;
        this.validate();
    }
    /**
     * Validates the value.
     */
    validate() {
        if (!this.name)
            throw new Error('Name is required');
        if (typeof this.name !== 'string')
            throw new Error('Name must be a string');
        if (this.description && typeof this.description !== 'string')
            throw new Error('Description must be a string');
        if (typeof this.required !== 'boolean')
            throw new Error('Required must be a boolean');
        if (!Array.isArray(this.checks))
            throw new Error('Checks must be an array');
        if (this.structure && typeof this.structure !== 'string')
            throw new Error('Structure must be a string');
    }
}
exports.default = BaseValue;
