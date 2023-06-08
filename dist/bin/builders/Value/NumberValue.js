"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The NumberValue class, used to create number values.
 */
class NumberValue extends BaseValue_1.default {
    type = 'number';
    min;
    max;
    /**
     * Creates an instance of the NumberValue class.
     * @param options The options for the NumberValue class.
     */
    constructor(options) {
        super(options);
        if (options.min)
            this.min = options.min;
        if (options.max)
            this.max = options.max;
    }
    /**
     * Exports the NumberValue class properties.
     * @returns The NumberValue class properties.
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
exports.default = NumberValue;
