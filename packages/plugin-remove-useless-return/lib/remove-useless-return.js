'use strict';

const {replaceWith} = require('putout').operator;

module.exports.report = () => 'Avoid useless "return"';

module.exports.include = () => [
    'ArrowFunctionExpression',
];

module.exports.fix = (path) => {
    const bodyPath = path.get('body');
    const returnPath = bodyPath.get('body.0');
    
    replaceWith(bodyPath, returnPath.node.argument);
};

module.exports.filter = (path) => {
    const bodyPath = path.get('body');
    
    if (!bodyPath.isBlockStatement())
        return false;
    
    const first = bodyPath.get('body.0');
    
    if (!first)
        return false;
    
    if (!first.isReturnStatement())
        return false;
    
    if (hasComments(first))
        return false;
    
    const argPath = first.get('argument');
    
    if (argPath.isCallExpression())
        return false;
    
    if (argPath.isNewExpression())
        return false;
    
    if (argPath.isAwaitExpression())
        return false;
    
    if (argPath.isTemplateLiteral())
        return false;
    
    if (argPath.isLogicalExpression())
        return false;
    
    return true;
};

function hasComments(path) {
    const {comments} = path.node;
    
    if (!comments)
        return false;
    
    return comments.length;
}
