"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The integer value builder class.
 */
class IntegerValueBuilder extends BaseValue_1.default {
    type = 'integer';
    min;
    max;
    /**
     * Creates an instance of the integer value builder class.
     * @param options The options of the integer value.
     */
    constructor(options) {
        super(options);
        this.min = options.min;
        this.max = options.max;
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
exports.default = IntegerValueBuilder;
