'use strict';

const {maybeBody} = require('./maybe-body');
const {assign} = Object;

module.exports.replaceWith = (path, node) => {
    if (path?.parentPath?.isExpressionStatement() && !path.parentPath.isProgram())
        path = path.parentPath;
    
    const {comments, loc} = path.node;
    const {currentPath} = maybeBody(path, node);
    
    currentPath.replaceWith(node);
    
    assign(currentPath.node, {
        comments,
        loc,
    });
    
    return currentPath;
};
