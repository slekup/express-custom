/**
 * ExpressCustomError class.
 */
export default class ExpressCustomError extends Error {
    /**
     * The constructor of the ExpressCustomError class.
     * @param message The message of the error.
     */
    constructor(message) {
        super(message);
        this.name = 'ExpressCustomError';
        this.stack = '';
    }
}
//# sourceMappingURL=ExpressCustomError.js.map