'use strict';

const parseSep = require('./parse-sep');
const {keys, assign} = Object;

module.exports = (name, match) => {
    if (!match || !name)
        return {};
    
    const rules = {};
    const items = keys(match);
    
    for (const item of items) {
        const pattern = parseSep(item);
        
        if (RegExp(pattern).test(name))
            assign(rules, match[item]);
    }
    
    return {
        rules,
    };
};

