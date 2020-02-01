'use strict';

const isStr = (a) => typeof a === 'string';
const {isArray} = Array;
const {entries} = Object;

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
        
        result.push(...entries(plugin));
    }
    
    return result;
};

