'use strict';

const deepmerge = require('deepmerge');
const config = require('../stylelintrc');

module.exports.createConfigLoader = ({cosmiconfig}) => async () => {
    const explorer = cosmiconfig('stylelint');
    const result = await explorer.search();
    const newConfig = result?.config;
    
    if (!newConfig)
        return config;
    
    return deepmerge.all([
        config,
        newConfig,
    ]);
};

