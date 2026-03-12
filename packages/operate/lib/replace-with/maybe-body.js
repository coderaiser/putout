import {types} from '@putout/babel';

const {
    isArrowFunctionExpression,
    isStatement,
    isBlockStatement,
    blockStatement,
    expressionStatement,
} = types;

export const maybeBody = (path, node) => {
    const {parentPath} = path;
    
    if (node && !isStatement(node) || isBlockStatement(node) || !isArrowFunctionExpression(parentPath))
        return {
            currentPath: path,
        };
    
    parentPath.node.body = blockStatement([
        expressionStatement(path.node),
    ]);
    
    return {
        currentPath: parentPath.get('body.body.0'),
    };
};
