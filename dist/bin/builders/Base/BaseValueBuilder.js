"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The base value builder class.
 * This class is not used for any value types, but is used to provide a base for all value builders.
 */
class BaseValueBuilder {
    name;
    description;
    required;
    checks;
    structure;
    defaultValue;
    /**
     * Sets the name of the value.
     */
    constructor() {
        this.name = 'Name not provided';
        this.description = 'Description not provided';
        this.required = false; // Default to false
        this.checks = [];
    }
    /**
     * Sets the name of the value.
     * @param name The name of the value.
     * @returns The base value builder.
     */
    setName(name) {
        this.name = name;
        return this;
    }
    /**
     * Sets the description of the value.
     * @param description The description of the value.
     * @returns The base value builder.
     */
    setDescription(description) {
        this.description = description;
        return this;
    }
    /**
     * Sets whether the value is required.
     * @param required Whether the value is required.
     * @returns The base value builder.
     */
    setRequired(required) {
        this.required = required;
        return this;
    }
    /**
     * Add a custom function that returns a boolean to test the value against.
     * @param check The checks of the value.
     * @returns The base value builder.
     */
    addCheck(check) {
        this.checks.push(check);
        return this;
    }
    /**
     * Sets the structure of the value.
     * @param structure The structure of the value.
     * @returns The base value builder.
     */
    setStructure(structure) {
        this.structure = structure;
        return this;
    }
}
exports.default = BaseValueBuilder;
