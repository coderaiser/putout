'use strict';

const {maybeBody} = require('./maybe-body');
const {assign} = Object;

const parseNode = (a) => {
    a = extractMark(a);
    
    if (a.node)
        return a.node;
    
    return a;
};

module.exports.replaceWith = (path, node) => {
    node = parseNode(node);
    
    if (path?.parentPath?.isExpressionStatement() && !path.parentPath.isProgram()) {
        addMark(path, node);
        path = path.parentPath;
    }
    
    const {comments, loc} = path.node;
    const {currentPath} = maybeBody(path, node);
    
    currentPath.replaceWith(node);
    
    assign(currentPath.node, {
        comments,
        loc,
    });
    
    return currentPath;
};

function addMark(path, node) {
    path.__putout_replaced_with = node;
}

function extractMark(node) {
    if (node.__putout_replaced_with)
        return node.__putout_replaced_with;
    
    return node;
}
