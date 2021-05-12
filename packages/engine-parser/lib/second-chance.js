'use strict';

const tryCatch = require('try-catch');

module.exports = (fn, source, a, b) => {
    const [errorA, resultA] = tryCatch(fn, source, a);
    
    if (!errorA)
        return resultA;
    
    const [errorB, resultB] = tryCatch(fn, source, b);
    
    if (!errorB)
        return resultB;
    
    throw errorA;
};

