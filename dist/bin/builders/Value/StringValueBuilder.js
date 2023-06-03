"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueBuilder_1 = __importDefault(require("@builders/Base/BaseValueBuilder"));
/**
 * The string value builder class.
 */
class StringValueBuilder extends BaseValueBuilder_1.default {
    type = 'string';
    min;
    max;
    options;
    test;
    /**
     * Creates an instance of the string value builder class.
     */
    constructor() {
        super();
    }
    /**
     * Sets the min of the value.
     * @param min The min of the value.
     * @returns The string value builder.
     */
    setMin(min) {
        this.min = min;
        return this;
    }
    /**
     * Sets the max of the value.
     * @param max The max of the value.
     * @returns The string value builder.
     */
    setMax(max) {
        this.max = max;
        return this;
    }
    /**
     * Set an array of string values which the value must be one of.
     * @param options An array of string options.
     * @returns The string value builder.
     */
    setOptions(options) {
        this.options = options;
        return this;
    }
    /**
     * Sets the test regex for the string to be tested against.
     * @param test The test of the value.
     * @returns The string value builder.
     */
    setTest(test) {
        this.test = test;
        return this;
    }
    /**
     * Sets the default value of the value.
     * @param defaultValue The default value of the value.
     * @returns The string value builder.
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
exports.default = StringValueBuilder;
