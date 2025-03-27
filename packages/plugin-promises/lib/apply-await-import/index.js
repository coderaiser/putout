import {types, operator} from 'putout';

const {replaceWith} = operator;
const {
    isFunction,
    awaitExpression,
} = types;

export const report = () => `Use 'await' near 'import' call`;

export const match = () => ({
    'import(__a)'(vars, path) {
        if (!path.parentPath.isVariableDeclarator())
            return false;
        
        return !path.parentPath.isAwaitExpression();
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
