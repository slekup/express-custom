"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The ImageValue class, used to create image values.
 */
class ImageValue extends BaseValue_1.default {
    type = 'image';
    /**
     * Creates an instance of the ImageValue class.
     * @param options The options for the ImageValue class.
     */
    constructor(options) {
        super(options);
    }
    /**
     * Exports the ImageValue class properties.
     * @returns The ImageValue class properties.
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
exports.default = ImageValue;
