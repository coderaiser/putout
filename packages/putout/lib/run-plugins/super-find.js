'use strict';

const babelTraverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const template = require('./template');

const merge = (a, b) => ({
    ...a,
    ...b,
});

module.exports = function superFind({find, ast, options}) {
    const pushItems = [];
    const push = (a) => {
        pushItems.push(a);
    };
    
    const returnItems = find(ast, {
        traverse: traverse(options),
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

function traverse(options) {
    return (ast, visitor) => {
        const templateVisitors = template(visitor, options)
            .reduce(merge);
        
        return babelTraverse(ast, templateVisitors);
    };
}
