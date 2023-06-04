"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueBuilder_1 = __importDefault(require("@builders/Base/BaseValueBuilder"));
/**
 * The array value builder class.
 */
class ArrayValueBuilder extends BaseValueBuilder_1.default {
    type = 'array';
    min;
    max;
    unique;
    contains;
    items;
    /**
     * Creates an instance of the array value builder class.
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
     * Sets whether the value is unique.
     * @param unique Whether the value is unique.
     * @returns The string value builder.
     */
    setUnique(unique) {
        this.unique = unique;
        return this;
    }
    /**
     * Set only one type that the array needs to contain.
     * @param contains The type that the array needs to contain.
     * @param min The minimum amount of times the type needs to be in the array.
     * @param max The maximum amount of times the type needs to be in the array.
     * @returns The string value builder.
     */
    setContains(contains, min, max) {
        this.contains = {
            type: contains,
            ...(min ? { min } : {}),
            ...(max ? { max } : {}),
        };
        return this;
    }
    /**
     * Sets the items that the array needs to contain.
     * @param items The items that the array needs to contain.
     * @returns The string value builder.
     */
    setItems(items) {
        this.items = items;
        return this;
    }
    /**
     * Sets the default value of the array.
     * @param defaultValue The default value of the array.
     * @returns The array value builder.
     */
    setDefault(defaultValue) {
        this.defaultValue = defaultValue;
        return this;
    }
    /**
     * Exports the array value.
     * @returns The array value.
     */
    export() {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            required: this.required,
            structure: this.structure,
            max: this.max,
            min: this.min,
            unique: this.unique,
        };
    }
}
exports.default = ArrayValueBuilder;
