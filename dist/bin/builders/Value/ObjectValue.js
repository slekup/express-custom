"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The object value builder class.
 */
class ObjectValueBuilder extends BaseValue_1.default {
    type = 'object';
    properties;
    /**
     * Creates an instance of the object value builder class.
     * @param options The options of the object value builder class.
     */
    constructor(options) {
        super(options);
        this.properties = {};
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
exports.default = ObjectValueBuilder;
