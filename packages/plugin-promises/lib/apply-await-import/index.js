import {types, operator} from 'putout';

const {replaceWith} = operator;
const {
    isFunction,
    isVariableDeclarator,
    awaitExpression,
} = types;

export const report = () => `Use 'await' near 'import' call`;

export const match = () => ({
    'import(__a)'(vars, {parentPath}) {
        return isVariableDeclarator(parentPath);
    },
});

export const replace = () => ({
    'import(__a)'(vars, path) {
        const fnPath = path.findParent(isFunction);
        
        if (fnPath)
            fnPath.node.async = true;
        
        return replaceWith(path, awaitExpression(path.node));
    },
});
