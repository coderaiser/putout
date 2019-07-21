'use strict';

const {plugins} = require('../putout.json');

module.exports = () => {
    const result = plugins
        .map((a) => `plugins['${a}'] = require('@putout/plugin-${a}');`)
        .join('\n');
    
    return `
       const plugins = {};
       
       ${result};
       
       return plugins;
`;
};

