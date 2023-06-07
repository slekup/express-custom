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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL1BhY2thZ2VFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLEtBQUs7SUFDN0M7OztPQUdHO0lBQ0gsWUFBbUIsT0FBZTtRQUNoQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFBhY2thZ2VFcnJvciBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2thZ2VFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3Igb2YgdGhlIFBhY2thZ2VFcnJvciBjbGFzcy5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBvZiB0aGUgZXJyb3IuXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgUGFja2FnZUVycm9yLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLm5hbWUgPSAnUGFja2FnZUVycm9yJztcclxuICAgIHRoaXMuc3RhY2sgPSAnJztcclxuICB9XHJcbn1cclxuIl19