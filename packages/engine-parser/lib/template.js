'use strict';

const template = require('@babel/template').default;
const memo = require('micro-memoize');

const plugins = require('./parsers/babel-plugins');
const options = require('./parsers/babel-options');

const defaults = {
    ...options,
    plugins,
};

module.exports = memo((value, options) => {
    const result = template(value, {
        ...defaults,
        ...options,
    });
    
    return result.expression || result;
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
    
    return result.expression || result;
};

