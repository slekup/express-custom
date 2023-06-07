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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL1BhY2thZ2VFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsTUFBcUIsWUFBYSxTQUFRLEtBQUs7SUFDN0M7OztPQUdHO0lBQ0gsWUFBbUIsT0FBZTtRQUNoQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBWEQsK0JBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBhY2thZ2VFcnJvciBjbGFzcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2FnZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBQYWNrYWdlRXJyb3IgY2xhc3MuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIG9mIHRoZSBlcnJvci5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgUGFja2FnZUVycm9yLnByb3RvdHlwZSk7XG4gICAgdGhpcy5uYW1lID0gJ1BhY2thZ2VFcnJvcic7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG59XG4iXX0=