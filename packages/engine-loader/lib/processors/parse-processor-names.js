'use strict';

const isStr = (a) => typeof a === 'string';
const {isArray} = Array;

const isOn = (a) => a === 'on';
const isOff = (a) => a === 'off';

module.exports = (plugins) => {
    const result = [];
    
    for (const plugin of plugins) {
        if (isStr(plugin)) {
            result.push([plugin]);
            continue;
        }
        
        if (isArray(plugin)) {
            const [pluginName, fn] = plugin;
            
            if (isOff(fn))
                continue;
            
            if (isOn(fn)) {
                result.push([pluginName]);
                continue;
            }
            
            result.push([pluginName, fn]);
            continue;
        }
    }
    
    return result;
};
