'use strict';

const template = require('@babel/template').default;
const memo = require('micro-memoize');
const defaults = {
    allowAwaitOutsideFunction: true,
};

module.exports = memo((value, options) => {
    const result = template(value, {
        ...defaults,
        ...options,
    });
    
    return result;
});

module.exports.ast = memo((value, options) => {
    const result = template.ast(value, {
        ...defaults,
        ...options,
    });
    
    return result.expression || result;
});

module.exports.ast.fresh = (value, options) => {
    const result = template.ast(value, {
        ...defaults,
        ...options,
    });
    
    return result;
};

