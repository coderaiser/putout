'use strict';

const {traverse: babelTraverse, types} = require('@putout/babel');

const {generate} = require('@putout/engine-parser');
const {merge} = babelTraverse.visitors;

module.exports = function superFind({rule, find, ast, options, template, traverse = babelTraverse}) {
    const pushItems = [];
    
    const push = (a) => {
        pushItems.push(a);
    };
    
    const returnItems = find(ast, {
        traverse: createTraverse({
            rule,
            options,
            template,
            traverse,
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

const createTraverse = ({rule, options, template, traverse}) => (ast, visitor) => {
    const templateVisitors = merge(template({
        rule,
        visitor,
        options,
    }));
    
    return traverse(ast, templateVisitors);
};
