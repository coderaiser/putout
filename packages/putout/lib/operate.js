'use strict';

const {assign} = Object;

module.exports.replaceWith = (path, node) => {
    const {comments, loc} = path.node;
    
    path.replaceWith(node);
    
    assign(path.node, {
        comments,
        loc,
    });
};

module.exports.replaceWithMultiple = (path, nodes) => {
    const parentComments = path.parentPath.node.comments;
    const {comments} = path.node;
    const newPath = path.replaceWithMultiple(nodes);
    
    if (!newPath.length)
        return newPath;
    
    newPath[0].node.comments = comments || parentComments;
    
    return newPath;
};

module.exports.insertAfter = (path, node) => {
    const {comments} = path.node;
    
    path.insertAfter(node);
    path.node.comments = comments;
};

