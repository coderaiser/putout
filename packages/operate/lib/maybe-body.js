'use strict';

const {types} = require('@putout/babel');
const {
    isStatement,
    isBlockStatement,
    BlockStatement,
    ExpressionStatement,
} = types;

module.exports.maybeBody = (path, node) => {
    const {parentPath} = path;
    
    if (node && !isStatement(node) || isBlockStatement(node) || !parentPath?.isArrowFunctionExpression?.())
        return {
            currentPath: path,
        };
    
    parentPath.node.body = BlockStatement([
        ExpressionStatement(path.node),
    ]);
    
    return {
        currentPath: parentPath.get('body.body.0'),
    };
};
