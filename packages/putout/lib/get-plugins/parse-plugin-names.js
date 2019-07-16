'use strict';

const isStr = (a) => typeof a === 'string';

module.exports = (plugins) => {
    const result = [];
    
    for (const name of plugins) {
        if (isStr(name)) {
            result.push([name]);
            continue;
        }
        
        const keys = Object.entries(name);
        result.push(...keys);
    }
    
    return result;
};

