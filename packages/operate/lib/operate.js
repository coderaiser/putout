'use strict';

const {
    ExpressionStatement,
    toStatement,
    matchesPattern,
} = require('@babel/types');

const {assign} = Object;

module.exports.replaceWith = replaceWith;

const compareTypes = (a) => (b) => a.includes(b);
module.exports.toExpression = toExpression;
function toExpression(el) {
    const {type} = el;
    const ignore = [
        'ObjectProperty',
    ];
    
    const expressions = [
        'Identifier',
        'Literal',
        'SequenceExpression',
        'CallExpression',
        'ObjectExpression',
    ];
    
    if (ignore.includes(type))
        return el;
    
    if (expressions.find(compareTypes(type)))
        return ExpressionStatement(el);
    
    return toStatement(el);
}

function replaceWith(path, node) {
    if (path.parentPath.isExpressionStatement() && !path.parentPath.isProgram())
        path = path.parentPath;
    
    const {comments, loc} = path.node;
    
    path.replaceWith(node);
    
    assign(path.node, {
        comments,
        loc,
    });
    
    return path;
}

module.exports.replaceWithMultiple = (path, nodes) => {
    const parentComments = path.parentPath.node.comments;
    const {comments} = path.node;
    
    const newNodes = nodes
        .filter(Boolean)
        .map(toExpression);
    
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
    return matchesPattern(path.node || path, 'module.exports');
};

const isBinding = (name) => (path) => path.scope.bindings[name];
module.exports.findBinding = (path, name) => {
    const referencePath = path.findParent(isBinding(name));
    
    if (!referencePath)
        return null;
    
    return referencePath.scope.bindings[name];
};
