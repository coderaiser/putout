'use strict';

module.exports = (name, rules) => {
    const value = rules[name];
    
    if (typeof value === 'boolean')
        return value;
    
    for (const {rule, state} of rules) {
        if (RegExp(rule).test(name))
            return state;
    }
    
    return true;
};

