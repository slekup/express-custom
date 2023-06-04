"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueBuilder_1 = __importDefault(require("@builders/Base/BaseValueBuilder"));
/**
 * The integer value builder class.
 */
class IntegerValueBuilder extends BaseValueBuilder_1.default {
    type = 'integer';
    min;
    max;
    /**
     * Creates an instance of the integer value builder class.
     */
    constructor() {
        super();
    }
    /**
     * Sets the minimun value the integer can be.
     * @param min The min of the value.
     * @returns The integer value builder.
     */
    setMin(min) {
        this.min = min;
        return this;
    }
    /**
     * Sets the maximum value the integer can be.
     * @param max The max of the value.
     * @returns The integer value builder.
     */
    setMax(max) {
        this.max = max;
        return this;
    }
    /**
     * Sets the default value of the value.
     * @param defaultValue The default value of the value.
     * @returns The integer value builder.
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
exports.default = IntegerValueBuilder;
