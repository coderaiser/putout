'use strict';

module.exports = (name, rules) => {
    for (const {rule, state} of rules) {
        if (rule === name)
            return state;
    }
    
    for (const {rule, state} of rules) {
        if (RegExp(`^${rule}`).test(name))
            return state;
    }
    
    return true;
};

