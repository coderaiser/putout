'use strict';

module.exports = (places) => {
    for (const {rule, message} of places) {
        const shortRule = rule.replace('eslint/', '');
        
        if (message === `Definition for rule '${shortRule}' was not found.`) {
            return true;
        }
    }
    
    return false;
};

