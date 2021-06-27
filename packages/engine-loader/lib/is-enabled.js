'use strict';

const {isArray} = Array;

module.exports = (name, rules) => {
    if (isArray(name))
        [name] = name;
    
    if (typeof rules[name] === 'boolean')
        return rules[name];
    
    let resultState = true;
    
    for (const {rule, state} of rules) {
        if (RegExp(`^${rule}`).test(name))
            resultState = state;
    }
    
    return resultState;
};

