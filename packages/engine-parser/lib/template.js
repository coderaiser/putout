'use strict';

const template = require('@babel/template').default;
const memo = require('nano-memoize');

const plugins = require('./parsers/babel/plugins');
const options = require('./parsers/babel/options');

const defaults = {
    ...options,
    plugins,
};

module.exports = memo((value, options) => {
    const fn = template(value, {
        ...defaults,
        ...options,
    });
    
    return fn;
});

module.exports.ast = memo((value, options) => {
    const result = template.ast(value, {
        ...defaults,
        ...options,
    });
    
    return result.expression || result;
});

module.exports.program = memo((value, options) => {
    const result = template.program(value, {
        ...defaults,
        ...options,
    });
    
    return result;
});

module.exports.program.ast = memo((value, options) => {
    const result = template.program.ast(value, {
        ...defaults,
        ...options,
    });
    
    return result;
});

module.exports.ast.fresh = (value, options) => {
    const result = template.ast(value, {
        ...defaults,
        ...options,
    });
    
    return result.expression || result;
};

