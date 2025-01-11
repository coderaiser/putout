'use strict';

const {maybeBody} = require('./maybe-body');
const {assign} = Object;

const parseNode = (a) => {
    if (a.node)
        return a.node;
    
    return a;
};

module.exports.replaceWith = (path, node) => {
    node = parseNode(node);
    
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
