/**
 * The BaseValue class. Used as a foundation for all value builders.
 */
export default class BaseValue {
    name;
    description;
    required;
    checks;
    structure;
    defaultValue;
    /**
     * Creates a new instance of the BaseValue class.
     * @param options The options for the BaseValue class.
     * @param options.name The name of the value.
     * @param options.description The description of the value.
     * @param options.required Whether the value is required or not.
     * @param options.checks The value checks. Functions that return a boolean based on the value.
     */
    constructor(options) {
        this.name = options.name;
        if (options.description)
            this.description = options.description;
        this.required = options.required ?? false; // Default to false
        this.checks = options.checks ?? [];
        if (options.structure)
            this.structure = options.structure;
        this.defaultValue = options.defaultValue;
        this.validate();
    }
    /**
     * Validates the BaseValue instances properties.
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
//# sourceMappingURL=BaseValue.js.map