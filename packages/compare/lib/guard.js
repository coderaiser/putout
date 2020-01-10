'use strict';

const logStep = require('debug')('putout:guard');

module.exports = (fns) => (...a) => {
    for (const fn of fns) {
        const is = fn(...a);
        
        logStep(fn.name);
        
        if (is)
            return true;
    }
    
    return false;
};

