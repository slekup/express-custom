import { Config } from '../../typings/exports';
export type RawConfig = Partial<Pick<Config, 'file'>> & Required<Pick<Config, 'file'>>;
/**
 * Get the express-custom.json config.
 * @returns The express-custom config.
 */
declare const _default: () => Promise<RawConfig>;
export default _default;
//# sourceMappingURL=getRawConfig.d.ts.map