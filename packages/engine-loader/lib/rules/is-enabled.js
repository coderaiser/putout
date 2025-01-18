'use strict';

module.exports.isEnabled = (name, rules) => {
    for (const {rule, state} of rules) {
        if (rule === name)
            return state;
    }
    
    for (const {rule, state} of rules) {
        if (rule.includes('/') && RegExp(`^${rule}`).test(name))
            return state;
    }
    
    for (const {rule, state} of rules) {
        if (RegExp(`^${rule}/`).test(name))
            return state;
    }
    
    return true;
};
