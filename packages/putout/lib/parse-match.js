'use strict';

const {keys} = Object;

module.exports = (match, name) => {
    if (!match)
        return {};
    
    const items = keys(match);
    
    for (const pattern of items)
        if (RegExp(`^${pattern}`).test(name)) {
            const rules = match[pattern];
            
            return {
                rules,
            };
        }
    
    return {};
};

