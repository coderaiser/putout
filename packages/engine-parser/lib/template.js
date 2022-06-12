'use strict';

const tryCatch = require('try-catch');
const memo = require('nano-memoize');

const template = require('@babel/template').default;
const swcToBabel = require('swc-to-babel');
const {parseSync} = require('@swc/core');

const plugins = require('./parsers/babel/plugins');
const options = require('./parsers/babel/options');

const defaults = {
    ...options,
    plugins: [
        ...plugins,
        'typescript',
    ],
};

module.exports = memo((value, options) => {
    const fn = template(value, {
        ...defaults,
        ...options,
    });
    
    return fn;
});

module.exports.ast = memo(fresh);

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

module.exports.ast.fresh = fresh;

function fresh(source, options) {
    const result = parse(source, options);
    return result.expression || result;
};

function parse(source, options) {
    const [error, ast] = tryCatch(parseSync, source, {
        syntax: 'typescript',
        target: 'es2022',
    });
    
    if (error) {
        return template.ast(source, {
            ...defaults,
            ...options,
        });
    }
    
    return swcToBabel(ast, source).program.body[0];
}

