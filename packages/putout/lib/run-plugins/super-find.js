'use strict';

const babelTraverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const template = require('./template');

module.exports = function superFind({find, ast, options}) {
    const pushItems = [];
    const push = (a) => {
        pushItems.push(a);
    };
    
    const returnItems = find(ast, {
        traverse,
        generate,
        types,
        push,
        options,
    });
    
    return [
        ...pushItems,
        ...returnItems || [],
    ];
};

function traverse(ast, visitor) {
    const templateVisitors = template(visitor)
        .reduce(merge);
    
    return babelTraverse(ast, templateVisitors);
}

function merge(a, b) {
    return {
        ...a,
        ...b,
    };
}

