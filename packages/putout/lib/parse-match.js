'use strict';

const {keys, assign} = Object;

module.exports = (match, name) => {
    if (!match)
        return {};
    
    const rules = {};
    const items = keys(match);
    
    for (const pattern of items)
        if (RegExp(`^${pattern}`).test(name))
            assign(rules, match[pattern]);
    
    return {
        rules,
    };
};

