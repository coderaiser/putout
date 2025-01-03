'use strict';

const {maybeBody} = require('./maybe-body');
const {toExpression} = require('./to-expression');
const {isSequenceExpression} = require('@putout/babel').types;

module.exports.replaceWithMultiple = (path, nodes) => {
    const parentComments = path.parentPath.node.comments;
    const {
        comments,
        leadingComments,
    } = path.node;
    
    const newNodes = nodes
        .filter(Boolean)
        .map(toExpression);
    
    removeDuplicateLeadingComments(newNodes);
    
    const {currentPath} = maybeBody(path);
    const newPath = currentPath.replaceWithMultiple(newNodes);
    
    if (!newPath.length)
        return newPath;
    
    if (!leadingComments && !isSequenceExpression(path))
        delete newPath[0].node.leadingComments;
    
    newPath[0].node.comments = comments || parentComments;
    
    return newPath;
};

function removeDuplicateLeadingComments(nodes) {
    for (const node1 of nodes) {
        for (const node2 of nodes) {
            if (node1 === node2)
                continue;
            
            if (node1.leadingComments === node2.leadingComments)
                delete node2.leadingComments;
        }
    }
}
