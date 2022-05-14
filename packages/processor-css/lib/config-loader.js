import {createRequire} from 'module';
import deepmerge from 'deepmerge';

const require = createRequire(import.meta.url);

export const defaultConfig = require('../stylelintrc.json');
export const createConfigLoader = ({cosmiconfig}) => async () => {
    const explorer = cosmiconfig('stylelint');
    const result = await explorer.search();
    const newConfig = result?.config;
    
    if (!newConfig)
        return defaultConfig;
    
    return deepmerge.all([
        defaultConfig,
        newConfig,
    ]);
};

