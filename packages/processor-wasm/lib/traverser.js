import {traverse as traverseWast} from '@webassemblyjs/ast';

export const traverse = (ast, plugin, {push}) => {
    const visitors = plugin.traverse({
        push,
    });
    
    traverseWast(ast, visitors);
};
