import {traverse} from '@webassemblyjs/ast';

export const find = (ast, plugin, {push}) => {
    plugin.find(ast, {
        push,
        traverse,
    });
};
