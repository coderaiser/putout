'use strict';

const {traverse: babelTraverse, types} = require('@putout/babel');

const {generate} = require('@putout/engine-parser');
const {merge} = babelTraverse.visitors;

module.exports = function superFind({rule, find, ast, options, template}) {
    const pushItems = [];
    
    const push = (a) => {
        pushItems.push(a);
    };
    
    const returnItems = find(ast, {
        traverse: traverse({
            rule,
            options,
            template,
        }),
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

function traverse({rule, options, template}) {
    return (ast, visitor) => {
        const templateVisitors = merge(template({
            rule,
            visitor,
            options,
        }));
        
        return babelTraverse(ast, templateVisitors);
    };
}
