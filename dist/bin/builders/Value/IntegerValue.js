"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The InetgerValue class, used to create integer values.
 */
class IntegerValue extends BaseValue_1.default {
    type = 'integer';
    min;
    max;
    /**
     * Creates an instance of the IntegerValue class.
     * @param options The options for the IntegerValue class.
     */
    constructor(options) {
        super(options);
        if (options.min)
            this.min = options.min;
        if (options.max)
            this.max = options.max;
    }
    /**
     * Exports the IntegerValue class properties.
     * @returns The IntegerValue class properties.
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
exports.default = IntegerValue;
