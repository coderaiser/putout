'use strict';

module.exports = (places) => {
    for (const {rule, message} of places) {
        if (rule === 'eslint/parser')
            return true;
    }
    
    return false;
};

