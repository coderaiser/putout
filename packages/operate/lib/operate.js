'use strict';

const {types} = require('putout');
const {isIdentifier} = types;

const {assign} = Object;

module.exports.replaceWith = replaceWith;

function replaceWith(path, node) {
    const {comments, loc} = path.node;
    const newPath = path.replaceWith(node);
    
    assign(path.node, {
        comments,
        loc,
    });
    
    return newPath;
}

module.exports.replaceWithMultiple = (path, nodes) => {
    const parentComments = path.parentPath.node.comments;
    const {comments} = path.node;
    
    const newNodes = nodes
        .filter(Boolean);
    
    const newPath = path.replaceWithMultiple(newNodes);
    
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

module.exports.isModuleExports = (path) => {
    const {
        node = path,
    } = path;
    
    const {object, property} = node;
    
    const isModule = isIdentifier(object, {name: 'module'});
    const isExports = isIdentifier(property, {name: 'exports'});
    
    return isModule && isExports;
};

