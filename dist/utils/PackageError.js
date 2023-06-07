/**
 * PackageError class.
 */
export default class PackageError extends Error {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL1BhY2thZ2VFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLEtBQUs7SUFDN0M7OztPQUdHO0lBQ0gsWUFBbUIsT0FBZTtRQUNoQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQYWNrYWdlRXJyb3IgY2xhc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2thZ2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgUGFja2FnZUVycm9yIGNsYXNzLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBvZiB0aGUgZXJyb3IuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIFBhY2thZ2VFcnJvci5wcm90b3R5cGUpO1xuICAgIHRoaXMubmFtZSA9ICdQYWNrYWdlRXJyb3InO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxufVxuIl19