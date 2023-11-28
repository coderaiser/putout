'use strict';

const getRule = (name, options) => {
    const plugin = require(`./${name}`);
    const pluginWithOptions = !options ? plugin : [options, plugin];
    
    return {
        [name]: pluginWithOptions,
    };
};

module.exports.getRule = getRule;
