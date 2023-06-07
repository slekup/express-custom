"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
/**
 * Middleware to handle 404 errors.
 * @param __ The response object.
 * @param res The response object.
 * @param next The next function.
 */
function notFound(__, res, next) {
    res.status(404).json({
        status: 404,
        message: 'The server cannot find the requested resource',
    });
    next();
}
/**
 * Middleware to handle errors.
 * @param err The error object.
 * @param __ The request object.
 * @param res The response object.
 */
function errorHandler(err, __, res) {
    __1.logger.error(err.message);
    res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        // stack: err.stack,
        field: err.field,
    });
}
exports.default = {
    notFound,
    errorHandler,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9taWRkbGV3YXJlL2Vycm9yLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwwQkFBNEI7QUFFNUI7Ozs7O0dBS0c7QUFDSCxTQUFTLFFBQVEsQ0FBQyxFQUFXLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQzlELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxHQUFHO1FBQ1gsT0FBTyxFQUFFLCtDQUErQztLQUN6RCxDQUFDLENBQUM7SUFDSCxJQUFJLEVBQUUsQ0FBQztBQUNULENBQUM7QUFPRDs7Ozs7R0FLRztBQUNILFNBQVMsWUFBWSxDQUFDLEdBQWMsRUFBRSxFQUFXLEVBQUUsR0FBYTtJQUM5RCxVQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsR0FBRztRQUNYLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsb0JBQW9CO1FBQ3BCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztLQUNqQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsa0JBQWU7SUFDYixRQUFRO0lBQ1IsWUFBWTtDQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uJztcblxuLyoqXG4gKiBNaWRkbGV3YXJlIHRvIGhhbmRsZSA0MDQgZXJyb3JzLlxuICogQHBhcmFtIF9fIFRoZSByZXNwb25zZSBvYmplY3QuXG4gKiBAcGFyYW0gcmVzIFRoZSByZXNwb25zZSBvYmplY3QuXG4gKiBAcGFyYW0gbmV4dCBUaGUgbmV4dCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbm90Rm91bmQoX186IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbik6IHZvaWQge1xuICByZXMuc3RhdHVzKDQwNCkuanNvbih7XG4gICAgc3RhdHVzOiA0MDQsXG4gICAgbWVzc2FnZTogJ1RoZSBzZXJ2ZXIgY2Fubm90IGZpbmQgdGhlIHJlcXVlc3RlZCByZXNvdXJjZScsXG4gIH0pO1xuICBuZXh0KCk7XG59XG5cbmludGVyZmFjZSBIdHRwRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBmaWVsZD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBNaWRkbGV3YXJlIHRvIGhhbmRsZSBlcnJvcnMuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciBvYmplY3QuXG4gKiBAcGFyYW0gX18gVGhlIHJlcXVlc3Qgb2JqZWN0LlxuICogQHBhcmFtIHJlcyBUaGUgcmVzcG9uc2Ugb2JqZWN0LlxuICovXG5mdW5jdGlvbiBlcnJvckhhbmRsZXIoZXJyOiBIdHRwRXJyb3IsIF9fOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKTogdm9pZCB7XG4gIGxvZ2dlci5lcnJvcihlcnIubWVzc2FnZSk7XG5cbiAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgIHN0YXR1czogNTAwLFxuICAgIG1lc3NhZ2U6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLFxuICAgIC8vIHN0YWNrOiBlcnIuc3RhY2ssXG4gICAgZmllbGQ6IGVyci5maWVsZCxcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbm90Rm91bmQsXG4gIGVycm9ySGFuZGxlcixcbn07XG4iXX0=