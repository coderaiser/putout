'use strict';

module.exports = (places) => {
    for (const {rule} of places) {
        if (rule === 'eslint/parser')
            return true;
    }
    
    return false;
};

