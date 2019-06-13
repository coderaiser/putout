'use strict';

module.exports.replaceWith = (path, node) => {
    const {comments} = path.node;
    
    path.replaceWith(node);
    path.node.comments = comments;
};

module.exports.insertAfter = (path, node) => {
    const {comments} = path.node;
    
    path.insertAfter(node);
    path.node.comments = comments;
};

