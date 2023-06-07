"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const logger_1 = __importStar(require("./logger"));
/**
 * Log information about the process.
 * @param apiData The API data.
 * @param fileTimeStart The time the file started.
 * @param text The text to log.
 */
exports.default = (apiData, fileTimeStart, text) => {
    const fileTimeEnd = Date.now();
    const fileTime = `${fileTimeEnd - fileTimeStart}ms`;
    logger_1.default.info(`${logger_1.cli.suc} ⚡ ${text} in ${fileTime}`);
    const info = `
${colors_1.default.magenta('Name:')} ${apiData.name}  
${colors_1.default.magenta('Description:')} ${apiData.description}
${colors_1.default.magenta('Base URL:')} ${apiData.baseUrl}

${colors_1.default.cyan('Versions:')} ${apiData.versions
        .map((version) => version.version)
        .join(', ')}
${colors_1.default.cyan('Groups:')} ${apiData.versions.reduce((prev, current) => prev + current.groups.length, 0)}
${colors_1.default.cyan('Routes:')} ${apiData.versions.reduce((prev, current) => prev +
        current.groups.reduce((prev, current) => prev + current.routes.length, 0), 0)}
${colors_1.default.cyan('Endpoints:')} ${apiData.versions.reduce((prev, current) => prev +
        current.groups.reduce((prev, current) => prev +
            current.routes.reduce((prev, current) => prev + current.endpoints.length, 0), 0), 0)}
  `;
    logger_1.default.info(info);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nSW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW4vdXRpbHMvbG9nSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0RBQTRCO0FBQzVCLG1EQUF1QztBQUV2Qzs7Ozs7R0FLRztBQUNILGtCQUFlLENBQ2IsT0FBOEIsRUFDOUIsYUFBcUIsRUFDckIsSUFBWSxFQUNOLEVBQUU7SUFDUixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDL0IsTUFBTSxRQUFRLEdBQUcsR0FBRyxXQUFXLEdBQUcsYUFBYSxJQUFJLENBQUM7SUFFcEQsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFHLENBQUMsR0FBRyxNQUFNLElBQUksT0FBTyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRW5ELE1BQU0sSUFBSSxHQUFHO0VBQ2IsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUk7RUFDdkMsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVc7RUFDckQsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU87O0VBRTlDLGdCQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRO1NBQ3pDLEdBQUcsQ0FBQyxDQUFDLE9BQTRCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDdEQsSUFBSSxDQUFDLElBQUksQ0FBQztFQUNiLGdCQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUMvQyxDQUFDLElBQVksRUFBRSxPQUE4QixFQUFFLEVBQUUsQ0FDL0MsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUM5QixDQUFDLENBQ0Y7RUFDRCxnQkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDL0MsQ0FBQyxJQUFZLEVBQUUsT0FBNEMsRUFBRSxFQUFFLENBQzdELElBQUk7UUFDSixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDbkIsQ0FBQyxJQUFZLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQ3ZELENBQUMsQ0FDRixFQUNILENBQUMsQ0FDRjtFQUNELGdCQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUNsRCxDQUNFLElBQVksRUFDWixPQUE2RCxFQUM3RCxFQUFFLENBQ0YsSUFBSTtRQUNKLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUNuQixDQUFDLElBQVksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN4QixJQUFJO1lBQ0osT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ25CLENBQUMsSUFBWSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUMxRCxDQUFDLENBQ0YsRUFDSCxDQUFDLENBQ0YsRUFDSCxDQUFDLENBQ0Y7R0FDQSxDQUFDO0lBRUYsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhwb3J0ZWRBcGkgfSBmcm9tICdAdHlwaW5ncy9leHBvcnRzJztcbmltcG9ydCBjb2xvcnMgZnJvbSAnY29sb3JzJztcbmltcG9ydCBsb2dnZXIsIHsgY2xpIH0gZnJvbSAnLi9sb2dnZXInO1xuXG4vKipcbiAqIExvZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcHJvY2Vzcy5cbiAqIEBwYXJhbSBhcGlEYXRhIFRoZSBBUEkgZGF0YS5cbiAqIEBwYXJhbSBmaWxlVGltZVN0YXJ0IFRoZSB0aW1lIHRoZSBmaWxlIHN0YXJ0ZWQuXG4gKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCB0byBsb2cuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChcbiAgYXBpRGF0YTogUmVhZG9ubHk8RXhwb3J0ZWRBcGk+LFxuICBmaWxlVGltZVN0YXJ0OiBudW1iZXIsXG4gIHRleHQ6IHN0cmluZ1xuKTogdm9pZCA9PiB7XG4gIGNvbnN0IGZpbGVUaW1lRW5kID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgZmlsZVRpbWUgPSBgJHtmaWxlVGltZUVuZCAtIGZpbGVUaW1lU3RhcnR9bXNgO1xuXG4gIGxvZ2dlci5pbmZvKGAke2NsaS5zdWN9IOKaoSAke3RleHR9IGluICR7ZmlsZVRpbWV9YCk7XG5cbiAgY29uc3QgaW5mbyA9IGBcbiR7Y29sb3JzLm1hZ2VudGEoJ05hbWU6Jyl9ICR7YXBpRGF0YS5uYW1lfSAgXG4ke2NvbG9ycy5tYWdlbnRhKCdEZXNjcmlwdGlvbjonKX0gJHthcGlEYXRhLmRlc2NyaXB0aW9ufVxuJHtjb2xvcnMubWFnZW50YSgnQmFzZSBVUkw6Jyl9ICR7YXBpRGF0YS5iYXNlVXJsfVxuXG4ke2NvbG9ycy5jeWFuKCdWZXJzaW9uczonKX0gJHthcGlEYXRhLnZlcnNpb25zXG4gICAgLm1hcCgodmVyc2lvbjogeyB2ZXJzaW9uOiBudW1iZXIgfSkgPT4gdmVyc2lvbi52ZXJzaW9uKVxuICAgIC5qb2luKCcsICcpfVxuJHtjb2xvcnMuY3lhbignR3JvdXBzOicpfSAke2FwaURhdGEudmVyc2lvbnMucmVkdWNlKFxuICAgIChwcmV2OiBudW1iZXIsIGN1cnJlbnQ6IHsgZ3JvdXBzOiB1bmtub3duW10gfSkgPT5cbiAgICAgIHByZXYgKyBjdXJyZW50Lmdyb3Vwcy5sZW5ndGgsXG4gICAgMFxuICApfVxuJHtjb2xvcnMuY3lhbignUm91dGVzOicpfSAke2FwaURhdGEudmVyc2lvbnMucmVkdWNlKFxuICAgIChwcmV2OiBudW1iZXIsIGN1cnJlbnQ6IHsgZ3JvdXBzOiB7IHJvdXRlczogdW5rbm93bltdIH1bXSB9KSA9PlxuICAgICAgcHJldiArXG4gICAgICBjdXJyZW50Lmdyb3Vwcy5yZWR1Y2UoXG4gICAgICAgIChwcmV2OiBudW1iZXIsIGN1cnJlbnQpID0+IHByZXYgKyBjdXJyZW50LnJvdXRlcy5sZW5ndGgsXG4gICAgICAgIDBcbiAgICAgICksXG4gICAgMFxuICApfVxuJHtjb2xvcnMuY3lhbignRW5kcG9pbnRzOicpfSAke2FwaURhdGEudmVyc2lvbnMucmVkdWNlKFxuICAgIChcbiAgICAgIHByZXY6IG51bWJlcixcbiAgICAgIGN1cnJlbnQ6IHsgZ3JvdXBzOiB7IHJvdXRlczogeyBlbmRwb2ludHM6IHVua25vd25bXSB9W10gfVtdIH1cbiAgICApID0+XG4gICAgICBwcmV2ICtcbiAgICAgIGN1cnJlbnQuZ3JvdXBzLnJlZHVjZShcbiAgICAgICAgKHByZXY6IG51bWJlciwgY3VycmVudCkgPT5cbiAgICAgICAgICBwcmV2ICtcbiAgICAgICAgICBjdXJyZW50LnJvdXRlcy5yZWR1Y2UoXG4gICAgICAgICAgICAocHJldjogbnVtYmVyLCBjdXJyZW50KSA9PiBwcmV2ICsgY3VycmVudC5lbmRwb2ludHMubGVuZ3RoLFxuICAgICAgICAgICAgMFxuICAgICAgICAgICksXG4gICAgICAgIDBcbiAgICAgICksXG4gICAgMFxuICApfVxuICBgO1xuXG4gIGxvZ2dlci5pbmZvKGluZm8pO1xufTtcbiJdfQ==