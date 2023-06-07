"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValue_1 = __importDefault(require("@builders/Base/BaseValue"));
/**
 * The integer value builder class.
 */
class IntegerValueBuilder extends BaseValue_1.default {
    type = 'integer';
    min;
    max;
    /**
     * Creates an instance of the integer value builder class.
     * @param options The options of the integer value.
     */
    constructor(options) {
        super(options);
        this.min = options.min;
        this.max = options.max;
    }
    /**
     * Exports the value.
     * @returns The exported value.
     */
    export() {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            required: this.required,
            structure: this.structure,
        };
    }
}
exports.default = IntegerValueBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZWdlclZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1aWxkZXJzL1ZhbHVlL0ludGVnZXJWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlFQUF1RTtBQVF2RTs7R0FFRztBQUNILE1BQXFCLG1CQUNuQixTQUFRLG1CQUFTO0lBR1YsSUFBSSxHQUFHLFNBQWtCLENBQUM7SUFDMUIsR0FBRyxDQUFVO0lBQ2IsR0FBRyxDQUFVO0lBRXBCOzs7T0FHRztJQUNILFlBQW1CLE9BQTRCO1FBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQS9CRCxzQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVZhbHVlLCB7IEJhc2VWYWx1ZU9wdGlvbnMgfSBmcm9tICdAYnVpbGRlcnMvQmFzZS9CYXNlVmFsdWUnO1xuaW1wb3J0IHsgSW50ZWdlclZhbHVlIH0gZnJvbSAnQHR5cGluZ3Mvc2NoZW1hJztcblxuZXhwb3J0IHR5cGUgSW50ZWdlclZhbHVlT3B0aW9ucyA9IEJhc2VWYWx1ZU9wdGlvbnMgJiB7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBUaGUgaW50ZWdlciB2YWx1ZSBidWlsZGVyIGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlZ2VyVmFsdWVCdWlsZGVyXG4gIGV4dGVuZHMgQmFzZVZhbHVlXG4gIGltcGxlbWVudHMgSW50ZWdlclZhbHVlXG57XG4gIHB1YmxpYyB0eXBlID0gJ2ludGVnZXInIGFzIGNvbnN0O1xuICBwdWJsaWMgbWluPzogbnVtYmVyO1xuICBwdWJsaWMgbWF4PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBpbnRlZ2VyIHZhbHVlIGJ1aWxkZXIgY2xhc3MuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHRoZSBpbnRlZ2VyIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEludGVnZXJWYWx1ZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLm1pbiA9IG9wdGlvbnMubWluO1xuICAgIHRoaXMubWF4ID0gb3B0aW9ucy5tYXg7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyB0aGUgdmFsdWUuXG4gICAqIEByZXR1cm5zIFRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBleHBvcnQoKTogdW5rbm93biB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWQsXG4gICAgICBzdHJ1Y3R1cmU6IHRoaXMuc3RydWN0dXJlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==