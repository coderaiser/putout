import type {
    ESLint,
    Linter,
    Rule,
} from 'eslint';

export interface PutoutPluginConfigs {
    recommended: Linter.Config[];
    jsx: Linter.Config[];
    safe: Linter.Config[];
    safeAlign: Linter.Config[];
}

declare const plugin: ESLint.Plugin & {
    configs: PutoutPluginConfigs;
    rules: Record<string, Rule.RuleModule>;
};

export default plugin;

export const rules: typeof plugin.rules;
export const configs: PutoutPluginConfigs;
