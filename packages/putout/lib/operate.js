'use strict';

module.exports.replaceWith = (path, node) => {
    const {comments} = path.node;
    
    path.replaceWith(node);
    path.node.comments = comments;
};

module.exports.replaceWithMultiple = (path, nodes) => {
    const {comments} = path.parentPath.node;
    
    const newPath = path.replaceWithMultiple(nodes);
    newPath[0].node.comments = comments;
    
    return newPath;
};

module.exports.insertAfter = (path, node) => {
    const {comments} = path.node;
    
    path.insertAfter(node);
    path.node.comments = comments;
};

