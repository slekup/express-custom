"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueBuilder_1 = __importDefault(require("@builders/Base/BaseValueBuilder"));
/**
 * The object value builder class.
 */
class ObjectValueBuilder extends BaseValueBuilder_1.default {
    type = 'object';
    properties;
    /**
     * Creates an instance of the object value builder class.
     */
    constructor() {
        super();
        this.properties = {};
    }
    /**
     * Sets the properties of the value.
     * @param properties The properties of the value.
     * @returns The value builder.
     */
    setProperties(properties) {
        this.properties = properties;
        return this;
    }
    /**
     * Sets the default value of the value.
     * @param defaultValue The default value of the value.
     * @returns The object value builder.
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
exports.default = ObjectValueBuilder;
