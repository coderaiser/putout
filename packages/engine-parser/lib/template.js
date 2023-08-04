'use strict';

const template = require('@babel/template').default;
const {nanomemoize} = require('nano-memoize');
const plugins = require('./parsers/babel/plugins');
const options = require('./parsers/babel/options');

const defaults = {
    ...options,
    plugins: [
        ...plugins,
        'typescript',
        'jsx',
    ],
};

module.exports = nanomemoize((value, options) => {
    const fn = template(value, {
        ...defaults,
        ...options,
    });
    
    return (...a) => {
        const result = fn(...a);
        return result.expression || result;
    };
});

module.exports.ast = nanomemoize((value, options) => {
    const result = template.ast(value, {
        ...defaults,
        ...options,
    });
    
    return result.expression || result;
});

module.exports.program = nanomemoize((value, options) => {
    const result = template.program(value, {
        ...defaults,
        ...options,
    });
    
    return result;
});

module.exports.program.ast = nanomemoize((value, options) => {
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
