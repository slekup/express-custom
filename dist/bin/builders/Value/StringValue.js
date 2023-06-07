"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The string value builder class.
 */
class StringValueBuilder extends BaseValue_1.default {
    type = 'string';
    min;
    max;
    options;
    test;
    /**
     * Creates an instance of the string value builder class.
     * @param options The options of the string value.
     */
    constructor(options) {
        super(options);
        this.min = options.min;
        this.max = options.max;
        this.options = options.options;
        this.test = options.test;
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
exports.default = StringValueBuilder;
