'use strict';

const {keys, assign} = Object;

module.exports = (name, match) => {
    if (!match || !name)
        return {};
    
    const rules = {};
    const items = keys(match);
    
    for (const pattern of items)
        if (RegExp(pattern).test(name))
            assign(rules, match[pattern]);
    
    return {
        rules,
    };
};

