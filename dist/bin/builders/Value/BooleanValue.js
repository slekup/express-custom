"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The BooleanValue class, used to create boolean values.
 */
class BooleanValue extends BaseValue_1.default {
    type = 'boolean';
    /**
     * Creates an instance of the BooleanValue class.
     * @param options The options for the BooleanValue class.
     */
    constructor(options) {
        super(options);
    }
    /**
     * Exports the BooleanValue class properties.
     * @returns The BooleanValue class properties.
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
exports.default = BooleanValue;
