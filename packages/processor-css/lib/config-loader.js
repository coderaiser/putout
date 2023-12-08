import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export const defaultConfig = require('../stylelintrc.json');
export const createConfigLoader = ({cosmiconfig}) => async () => {
    const explorer = cosmiconfig('stylelint', {
        searchStrategy: 'project',
    });
    
    const result = await explorer.search();
    const newConfig = result?.config;
    
    if (!newConfig)
        return defaultConfig;
    
    const merged = {
        rules: {
            ...defaultConfig.rules,
            ...newConfig.rules,
        },
        plugins: [
            ...defaultConfig.plugins,
            ...newConfig.plugins || [],
        ],
        extends: [
            ...defaultConfig.extends,
            ...newConfig.extends || [],
        ],
    };
    
    return merged;
};
