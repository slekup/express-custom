/**
 * The BaseValue class. Used as a foundation for all value builders.
 */
export default class BaseValue {
    name;
    description;
    required;
    checks;
    structure;
    defaultValue;
    /**
     * Creates a new instance of the BaseValue class.
     * @param options The options of the value.
     * @param options.name The name of the value.
     * @param options.description The description of the value.
     * @param options.required Whether the value is required.
     * @param options.checks The checks of the value.
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.required = options.required ?? false; // Default to false
        this.checks = options.checks ?? [];
        this.structure = options.structure;
        this.defaultValue = options.defaultValue;
        this.validate();
    }
    /**
     * Validates the value.
     */
    validate() {
        if (!this.name)
            throw new Error('Name is required');
        if (typeof this.name !== 'string')
            throw new Error('Name must be a string');
        if (this.description && typeof this.description !== 'string')
            throw new Error('Description must be a string');
        if (typeof this.required !== 'boolean')
            throw new Error('Required must be a boolean');
        if (!Array.isArray(this.checks))
            throw new Error('Checks must be an array');
        if (this.structure && typeof this.structure !== 'string')
            throw new Error('Structure must be a string');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1aWxkZXJzL0Jhc2UvQmFzZVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdBOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFTO0lBQ3JCLElBQUksQ0FBUztJQUNiLFdBQVcsQ0FBVTtJQUNyQixRQUFRLENBQVU7SUFDbEIsTUFBTSxDQUFlO0lBQ3JCLFNBQVMsQ0FBVTtJQUNuQixZQUFZLENBQWU7SUFFbEM7Ozs7Ozs7T0FPRztJQUNILFlBQW1CLE9BQXlCO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDLG1CQUFtQjtRQUM5RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFFekMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEQsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUU1RSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVE7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRWxELElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7WUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFFNUUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlVmFsdWVTY2hlbWEsIFNjaGVtYVR5cGVzLCBWYWx1ZUNoZWNrIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVZhbHVlT3B0aW9ucyB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuICBjaGVja3M/OiBWYWx1ZUNoZWNrW107XHJcbiAgc3RydWN0dXJlPzogc3RyaW5nO1xyXG4gIGRlZmF1bHRWYWx1ZT86IFNjaGVtYVR5cGVzO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIEJhc2VWYWx1ZSBjbGFzcy4gVXNlZCBhcyBhIGZvdW5kYXRpb24gZm9yIGFsbCB2YWx1ZSBidWlsZGVycy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VWYWx1ZSBpbXBsZW1lbnRzIEJhc2VWYWx1ZVNjaGVtYSB7XHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgZGVzY3JpcHRpb24/OiBzdHJpbmc7XHJcbiAgcHVibGljIHJlcXVpcmVkOiBib29sZWFuO1xyXG4gIHB1YmxpYyBjaGVja3M6IFZhbHVlQ2hlY2tbXTtcclxuICBwdWJsaWMgc3RydWN0dXJlPzogc3RyaW5nO1xyXG4gIHB1YmxpYyBkZWZhdWx0VmFsdWU/OiBTY2hlbWFUeXBlcztcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgQmFzZVZhbHVlIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gb3B0aW9ucy5uYW1lIFRoZSBuYW1lIG9mIHRoZSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gb3B0aW9ucy5kZXNjcmlwdGlvbiBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIHZhbHVlLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLnJlcXVpcmVkIFdoZXRoZXIgdGhlIHZhbHVlIGlzIHJlcXVpcmVkLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmNoZWNrcyBUaGUgY2hlY2tzIG9mIHRoZSB2YWx1ZS5cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogQmFzZVZhbHVlT3B0aW9ucykge1xyXG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IG9wdGlvbnMuZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLnJlcXVpcmVkID0gb3B0aW9ucy5yZXF1aXJlZCA/PyBmYWxzZTsgLy8gRGVmYXVsdCB0byBmYWxzZVxyXG4gICAgdGhpcy5jaGVja3MgPSBvcHRpb25zLmNoZWNrcyA/PyBbXTtcclxuICAgIHRoaXMuc3RydWN0dXJlID0gb3B0aW9ucy5zdHJ1Y3R1cmU7XHJcbiAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IG9wdGlvbnMuZGVmYXVsdFZhbHVlO1xyXG5cclxuICAgIHRoaXMudmFsaWRhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlcyB0aGUgdmFsdWUuXHJcbiAgICovXHJcbiAgcHVibGljIHZhbGlkYXRlKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm5hbWUpIHRocm93IG5ldyBFcnJvcignTmFtZSBpcyByZXF1aXJlZCcpO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm5hbWUgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgRXJyb3IoJ05hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xyXG5cclxuICAgIGlmICh0aGlzLmRlc2NyaXB0aW9uICYmIHR5cGVvZiB0aGlzLmRlc2NyaXB0aW9uICE9PSAnc3RyaW5nJylcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXNjcmlwdGlvbiBtdXN0IGJlIGEgc3RyaW5nJyk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnJlcXVpcmVkICE9PSAnYm9vbGVhbicpXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcclxuXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5jaGVja3MpKSB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrcyBtdXN0IGJlIGFuIGFycmF5Jyk7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RydWN0dXJlICYmIHR5cGVvZiB0aGlzLnN0cnVjdHVyZSAhPT0gJ3N0cmluZycpXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RydWN0dXJlIG11c3QgYmUgYSBzdHJpbmcnKTtcclxuICB9XHJcbn1cclxuIl19