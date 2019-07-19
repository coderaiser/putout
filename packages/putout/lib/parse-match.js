'use strict';

const getRelativePath = require('../lib/get-relative-path');
const {keys, assign} = Object;

module.exports = (match, name) => {
    if (!match)
        return {};
    
    const rules = {};
    const items = keys(match);
    const relativeName = getRelativePath(name);
    
    for (const pattern of items)
        if (RegExp(`${pattern}`).test(relativeName))
            assign(rules, match[pattern]);
    
    return {
        rules,
    };
};

