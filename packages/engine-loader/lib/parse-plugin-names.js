'use strict';

const isStr = (a) => typeof a === 'string';
const {isArray} = Array;

module.exports = (plugins) => {
    const result = [];
    
    for (const plugin of plugins) {
        if (isStr(plugin)) {
            result.push([plugin]);
            continue;
        }
        
        if (isArray(plugin)) {
            const [pluginName, fn] = plugin;
            result.push([pluginName, fn]);
            continue;
        }
        
        const keys = Object.entries(plugin);
        result.push(...keys);
    }
    
    return result;
};

