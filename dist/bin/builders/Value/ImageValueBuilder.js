"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueBuilder_1 = __importDefault(require("@builders/Base/BaseValueBuilder"));
/**
 * The image value builder class.
 */
class ImageValueBuilder extends BaseValueBuilder_1.default {
    type = 'image';
    /**
     * Creates an instance of the image value builder class.
     */
    constructor() {
        super();
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
exports.default = ImageValueBuilder;
