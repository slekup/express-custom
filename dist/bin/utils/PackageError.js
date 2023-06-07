"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PackageError class.
 */
class PackageError extends Error {
    /**
     * The constructor of the PackageError class.
     * @param message The message of the error.
     */
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, PackageError.prototype);
        this.name = 'PackageError';
        this.stack = '';
    }
}
exports.default = PackageError;
