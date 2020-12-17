'use strict';

const kebabCase = require('just-kebab-case');
const {keys} = Object;

module.exports = (args, argvConfig) => {
    const [, ...allKeys] = keys(args);
    
    for (const arg of allKeys) {
        const kebab = kebabCase(arg);
        
        if (argvConfig.boolean.includes(kebab))
            continue;
        
        if (argvConfig.number.includes(kebab))
            continue;
        
        if (argvConfig.string.includes(kebab))
            continue;
        
        const invalid = kebab.length === 1 ? `-${kebab}` : `--${kebab}`;
        
        return invalid;
    }
    
    return '';
};

