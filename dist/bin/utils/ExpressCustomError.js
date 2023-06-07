"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PackageError class.
 */
class ExpressCustomError extends Error {
    /**
     * The constructor of the PackageError class.
     * @param message The message of the error.
     */
    constructor(message) {
        super(message);
        this.name = 'ExpressCustomError';
        this.stack = '';
    }
}
exports.default = ExpressCustomError;
