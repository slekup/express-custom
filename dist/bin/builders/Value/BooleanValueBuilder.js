"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueBuilder_1 = __importDefault(require("@builders/Base/BaseValueBuilder"));
/**
 * The boolean value builder class.
 */
class BooleanValueBuilder extends BaseValueBuilder_1.default {
    type = 'boolean';
    /**
     * Creates an instance of the boolean value builder class.
     */
    constructor() {
        super();
    }
    /**
     * Sets the default value of the value.
     * @param defaultValue The default value of the value.
     * @returns The boolean value builder.
     */
    setDefault(defaultValue) {
        this.defaultValue = defaultValue;
        return this;
    }
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export() {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            required: this.required,
            structure: this.structure,
        };
    }
}
exports.default = BooleanValueBuilder;
