import type {Linter} from 'eslint';

export type FlatConfigArray = Linter.Config[];

export const recommended: FlatConfigArray;

export const safeRules: Record<string, string>;

export const safe: FlatConfigArray;

export const safeAlign: FlatConfigArray;

export interface PutoutPluginConfigs {
    recommended: FlatConfigArray;
    jsx: Linter.Config;
    safe: FlatConfigArray;
    safeAlign: FlatConfigArray;
}

export const configs: PutoutPluginConfigs;

export const rules: Record<string, unknown>;

declare const putout: {
    rules: typeof rules;
};

export default putout;
