'use strict';

const {types, template} = require('@putout/babel');
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

const {
    isExpressionStatement,
    isTSExternalModuleReference,
} = types;

const extractExpression = (a) => {
    if (isExpressionStatement(a))
        return a.expression;
    
    if (isTSExternalModuleReference(a))
        return a.expression;
    
    return a;
};

module.exports = nanomemoize((value, options) => {
    const fn = template(value, {
        ...defaults,
        ...options,
    });
    
    return (...a) => {
        const result = fn(...a);
        return extractExpression(result);
    };
});

module.exports.ast = nanomemoize((value, options) => {
    const result = template.ast(value, {
        ...defaults,
        ...options,
    });
    
    return extractExpression(result);
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
    
    return extractExpression(result);
};

module.exports.extractExpression = extractExpression;
