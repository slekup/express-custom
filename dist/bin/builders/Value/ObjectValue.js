"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The ObjectValue class, used to create object values.
 */
class ObjectValue extends BaseValue_1.default {
    type = 'object';
    properties;
    /**
     * Creates an instance of the ObjectValue class.
     * @param options The options for the ObjectValue class.
     */
    constructor(options) {
        super(options);
        this.properties = {};
    }
    /**
     * Exports the ObjectValue class properties.
     * @returns The ObjectValue class properties.
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
exports.default = ObjectValue;
