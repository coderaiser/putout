'use strict';

const tryCatch = require('try-catch');

module.exports.tryThrowWithReason = (fn, ...args) => {
    const [error, result] = tryCatch(fn, ...args);
    
    if (error) {
        error.reason ??= 'traverse';
        throw error;
    }
    
    return result;
};
