'use strict';
'use stirct';

// preserve comments
module.exports.replaceWith = (path, node) => {
    const {comments} = path.node;
    path.replaceWith(node);
    
    path.node.comments = comments;
};

