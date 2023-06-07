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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1aWxkZXJzL0Jhc2UvQmFzZVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdBOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFTO0lBQ3JCLElBQUksQ0FBUztJQUNiLFdBQVcsQ0FBVTtJQUNyQixRQUFRLENBQVU7SUFDbEIsTUFBTSxDQUFlO0lBQ3JCLFNBQVMsQ0FBVTtJQUNuQixZQUFZLENBQWU7SUFFbEM7Ozs7Ozs7T0FPRztJQUNILFlBQW1CLE9BQXlCO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDLG1CQUFtQjtRQUM5RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFFekMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEQsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUU1RSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVE7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRWxELElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7WUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFFNUUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlVmFsdWVTY2hlbWEsIFNjaGVtYVR5cGVzLCBWYWx1ZUNoZWNrIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlVmFsdWVPcHRpb25zIHtcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICBjaGVja3M/OiBWYWx1ZUNoZWNrW107XG4gIHN0cnVjdHVyZT86IHN0cmluZztcbiAgZGVmYXVsdFZhbHVlPzogU2NoZW1hVHlwZXM7XG59XG5cbi8qKlxuICogVGhlIEJhc2VWYWx1ZSBjbGFzcy4gVXNlZCBhcyBhIGZvdW5kYXRpb24gZm9yIGFsbCB2YWx1ZSBidWlsZGVycy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVZhbHVlIGltcGxlbWVudHMgQmFzZVZhbHVlU2NoZW1hIHtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBwdWJsaWMgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBjaGVja3M6IFZhbHVlQ2hlY2tbXTtcbiAgcHVibGljIHN0cnVjdHVyZT86IHN0cmluZztcbiAgcHVibGljIGRlZmF1bHRWYWx1ZT86IFNjaGVtYVR5cGVzO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBCYXNlVmFsdWUgY2xhc3MuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSB2YWx1ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMubmFtZSBUaGUgbmFtZSBvZiB0aGUgdmFsdWUuXG4gICAqIEBwYXJhbSBvcHRpb25zLmRlc2NyaXB0aW9uIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAqIEBwYXJhbSBvcHRpb25zLnJlcXVpcmVkIFdoZXRoZXIgdGhlIHZhbHVlIGlzIHJlcXVpcmVkLlxuICAgKiBAcGFyYW0gb3B0aW9ucy5jaGVja3MgVGhlIGNoZWNrcyBvZiB0aGUgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogQmFzZVZhbHVlT3B0aW9ucykge1xuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gb3B0aW9ucy5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLnJlcXVpcmVkID0gb3B0aW9ucy5yZXF1aXJlZCA/PyBmYWxzZTsgLy8gRGVmYXVsdCB0byBmYWxzZVxuICAgIHRoaXMuY2hlY2tzID0gb3B0aW9ucy5jaGVja3MgPz8gW107XG4gICAgdGhpcy5zdHJ1Y3R1cmUgPSBvcHRpb25zLnN0cnVjdHVyZTtcbiAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IG9wdGlvbnMuZGVmYXVsdFZhbHVlO1xuXG4gICAgdGhpcy52YWxpZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgdmFsaWRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHRocm93IG5ldyBFcnJvcignTmFtZSBpcyByZXF1aXJlZCcpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5uYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdOYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcblxuICAgIGlmICh0aGlzLmRlc2NyaXB0aW9uICYmIHR5cGVvZiB0aGlzLmRlc2NyaXB0aW9uICE9PSAnc3RyaW5nJylcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVzY3JpcHRpb24gbXVzdCBiZSBhIHN0cmluZycpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnJlcXVpcmVkICE9PSAnYm9vbGVhbicpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVkIG11c3QgYmUgYSBib29sZWFuJyk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5jaGVja3MpKSB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrcyBtdXN0IGJlIGFuIGFycmF5Jyk7XG5cbiAgICBpZiAodGhpcy5zdHJ1Y3R1cmUgJiYgdHlwZW9mIHRoaXMuc3RydWN0dXJlICE9PSAnc3RyaW5nJylcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RydWN0dXJlIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgfVxufVxuIl19