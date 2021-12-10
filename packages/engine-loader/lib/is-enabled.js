'use strict';

const {isArray} = Array;

const isBool = (a) => typeof a === 'boolean';

module.exports = (name, rules) => {
    if (isArray(name))
        [name] = name;
    
    if (isBool(rules[name]))
        return rules[name];
    
    let resultState = true;
    
    for (const {rule, state} of rules) {
        if (RegExp(`^${rule}`).test(name))
            resultState = state;
    }
    
    return resultState;
};

