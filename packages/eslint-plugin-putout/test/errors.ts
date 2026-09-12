import {
    configs,
    safeAlign,
    PutoutPluginConfigs,
} from '#eslint-plugin-putout';

const fn = (a: unknown) => a;

// THROWS Property 'nonExistentPreset' does not exist on type 'PutoutPluginConfigs'
fn(configs.nonExistentPreset);

// THROWS Property 'push' does not exist on type 'Config<RulesConfig>'.
fn(configs.jsx.push);

function useConfigs(c: PutoutPluginConfigs) {
    return c;
}

// THROWS Type '{ recommended: never[]; }' is missing the following properties from type 'PutoutPluginConfigs': jsx, safe, safeAlign
useConfigs({
    recommended: [],
});

// THROWS Property 'nonExistentPreset' does not exist on type 'FlatConfigArray'
fn(safeAlign.nonExistentPreset);
