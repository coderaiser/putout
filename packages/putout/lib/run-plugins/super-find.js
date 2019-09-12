'use strict';

const babelTraverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const template = require('./template');

const {merge} = babelTraverse.visitors;

module.exports = function superFind({find, ast, options, fix, shebang}) {
    const pushItems = [];
    const push = (a) => {
        pushItems.push(a);
    };
    
    const returnItems = find(ast, {
        traverse: traverse({fix, shebang, options}),
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

function traverse({fix, shebang, options}) {
    return (ast, visitor) => {
        const templateVisitors = merge(template(visitor, options));
        return babelTraverse(ast, templateVisitors);
    };
}
