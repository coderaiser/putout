import {
    configs,
    safeAlign,
    PutoutPluginConfigs,
} from '../lib/index.js';

const fn = (a: unknown) => a;

// THROWS Property 'nonExistentPreset' does not exist on type 'PutoutPluginConfigs'
fn(configs.nonExistentPreset);

// THROWS Property 'push' does not exist on type 'Config<RulesConfig>'.
fn(configs.jsx.push);

function useConfigs(c: PutoutPluginConfigs) {
    return c;
}

// THROWS Argument of type '{ recommended: never[]; }' is not assignable to parameter of type 'PutoutPluginConfigs'
useConfigs({
    recommended: [],
});

// THROWS Property 'nonExistentPreset' does not exist on type 'FlatConfigArray'
fn(safeAlign.nonExistentPreset);
