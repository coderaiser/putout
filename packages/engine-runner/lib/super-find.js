import {
    traverse as babelTraverse,
    types,
} from '@putout/babel';
import {generate} from '@putout/engine-parser';
import template from './template/index.js';

const {merge} = babelTraverse.visitors;

export default function superFind({rule, find, ast, options, traverse = babelTraverse}) {
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
}

const createTraverse = ({rule, options, template, traverse}) => (ast, visitor) => {
    const templateVisitors = merge(template({
        rule,
        visitor,
        options,
    }));
    
    return traverse(ast, templateVisitors);
};
