'use strict';

const {types} = require('@putout/babel');
const {
    isStatement,
    isBlockStatement,
    blockStatement,
    expressionStatement,
} = types;

module.exports.maybeBody = (path, node) => {
    const {parentPath} = path;
    
    if (node && !isStatement(node) || isBlockStatement(node) || !parentPath?.isArrowFunctionExpression?.())
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
