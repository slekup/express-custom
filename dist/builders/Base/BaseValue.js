"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The BaseValue class. Used as a foundation for all value builders.
 */
class BaseValue {
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
exports.default = BaseValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1aWxkZXJzL0Jhc2UvQmFzZVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBV0E7O0dBRUc7QUFDSCxNQUFxQixTQUFTO0lBQ3JCLElBQUksQ0FBUztJQUNiLFdBQVcsQ0FBVTtJQUNyQixRQUFRLENBQVU7SUFDbEIsTUFBTSxDQUFlO0lBQ3JCLFNBQVMsQ0FBVTtJQUNuQixZQUFZLENBQWU7SUFFbEM7Ozs7Ozs7T0FPRztJQUNILFlBQW1CLE9BQXlCO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDLG1CQUFtQjtRQUM5RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFFekMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEQsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUU1RSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVE7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRWxELElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7WUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFFNUUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0Y7QUE3Q0QsNEJBNkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVZhbHVlU2NoZW1hLCBTY2hlbWFUeXBlcywgVmFsdWVDaGVjayB9IGZyb20gJ0B0eXBpbmdzL3NjaGVtYSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVZhbHVlT3B0aW9ucyB7XG4gIG5hbWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgY2hlY2tzPzogVmFsdWVDaGVja1tdO1xuICBzdHJ1Y3R1cmU/OiBzdHJpbmc7XG4gIGRlZmF1bHRWYWx1ZT86IFNjaGVtYVR5cGVzO1xufVxuXG4vKipcbiAqIFRoZSBCYXNlVmFsdWUgY2xhc3MuIFVzZWQgYXMgYSBmb3VuZGF0aW9uIGZvciBhbGwgdmFsdWUgYnVpbGRlcnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VWYWx1ZSBpbXBsZW1lbnRzIEJhc2VWYWx1ZVNjaGVtYSB7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgcHVibGljIHJlcXVpcmVkOiBib29sZWFuO1xuICBwdWJsaWMgY2hlY2tzOiBWYWx1ZUNoZWNrW107XG4gIHB1YmxpYyBzdHJ1Y3R1cmU/OiBzdHJpbmc7XG4gIHB1YmxpYyBkZWZhdWx0VmFsdWU/OiBTY2hlbWFUeXBlcztcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgQmFzZVZhbHVlIGNsYXNzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiB0aGUgdmFsdWUuXG4gICAqIEBwYXJhbSBvcHRpb25zLm5hbWUgVGhlIG5hbWUgb2YgdGhlIHZhbHVlLlxuICAgKiBAcGFyYW0gb3B0aW9ucy5kZXNjcmlwdGlvbiBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIHZhbHVlLlxuICAgKiBAcGFyYW0gb3B0aW9ucy5yZXF1aXJlZCBXaGV0aGVyIHRoZSB2YWx1ZSBpcyByZXF1aXJlZC5cbiAgICogQHBhcmFtIG9wdGlvbnMuY2hlY2tzIFRoZSBjaGVja3Mgb2YgdGhlIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEJhc2VWYWx1ZU9wdGlvbnMpIHtcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IG9wdGlvbnMuZGVzY3JpcHRpb247XG4gICAgdGhpcy5yZXF1aXJlZCA9IG9wdGlvbnMucmVxdWlyZWQgPz8gZmFsc2U7IC8vIERlZmF1bHQgdG8gZmFsc2VcbiAgICB0aGlzLmNoZWNrcyA9IG9wdGlvbnMuY2hlY2tzID8/IFtdO1xuICAgIHRoaXMuc3RydWN0dXJlID0gb3B0aW9ucy5zdHJ1Y3R1cmU7XG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBvcHRpb25zLmRlZmF1bHRWYWx1ZTtcblxuICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgdGhlIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIHZhbGlkYXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5uYW1lKSB0aHJvdyBuZXcgRXJyb3IoJ05hbWUgaXMgcmVxdWlyZWQnKTtcbiAgICBpZiAodHlwZW9mIHRoaXMubmFtZSAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBFcnJvcignTmFtZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG5cbiAgICBpZiAodGhpcy5kZXNjcmlwdGlvbiAmJiB0eXBlb2YgdGhpcy5kZXNjcmlwdGlvbiAhPT0gJ3N0cmluZycpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rlc2NyaXB0aW9uIG11c3QgYmUgYSBzdHJpbmcnKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5yZXF1aXJlZCAhPT0gJ2Jvb2xlYW4nKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuY2hlY2tzKSkgdGhyb3cgbmV3IEVycm9yKCdDaGVja3MgbXVzdCBiZSBhbiBhcnJheScpO1xuXG4gICAgaWYgKHRoaXMuc3RydWN0dXJlICYmIHR5cGVvZiB0aGlzLnN0cnVjdHVyZSAhPT0gJ3N0cmluZycpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cnVjdHVyZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gIH1cbn1cbiJdfQ==