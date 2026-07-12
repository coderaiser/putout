import {PutoutPluginConfigs} from '../lib/index.js';

function useConfigs(c: PutoutPluginConfigs) {
    return c;
}

// THROWS Argument of type '{ recommended: never[]; }' is not assignable to parameter of type 'PutoutPluginConfigs'
useConfigs({
    recommended: [],
});
