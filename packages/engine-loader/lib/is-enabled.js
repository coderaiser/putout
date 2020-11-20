'use strict';

module.exports = (name, rules) => {
    const value = rules[name];
    
    if (typeof value === 'boolean')
        return value;
    
    let resultState = true;
    
    for (const {rule, state} of rules) {
        if (RegExp(`^${rule}`).test(name))
            resultState = state;
    }
    
    return resultState;
};

