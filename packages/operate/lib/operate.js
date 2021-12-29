'use strict';

const {
    ExpressionStatement,
    toStatement,
    matchesPattern,
    isImportDeclaration,
    isExportDeclaration,
} = require('@babel/types');

const {getBinding, getBindingPath} = require('./get-binding');
const {extract} = require('./extract');
const {compute} = require('./compute');
const {findProperties} = require('./find-properties');

const {assign} = Object;

module.exports.getBinding = getBinding;
module.exports.getBindingPath = getBindingPath;
module.exports.extract = extract;
module.exports.compute = compute;
module.exports.replaceWith = replaceWith;
module.exports.findProperties = findProperties;

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
    if (path?.parentPath?.isExpressionStatement?.() && !path.parentPath.isProgram())
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

const isOneDeclaration = ({node}) => node.declarations.length === 1;

const getComments = (path) => {
    const {comments} = path.node;
    
    if (comments?.length)
        return comments;
    
    const {parentPath} = path;
    
    if (path.isVariableDeclarator() && isOneDeclaration(parentPath)) {
        return parentPath.node.comments;
    }
    
    return [];
};

module.exports.remove = (path) => {
    const comments = getComments(path);
    const nextPath = path.getNextSibling();
    const {block} = path.scope.getProgramParent();
    
    if (nextPath.node)
        nextPath.node.comments = comments;
    else
        block.comments = comments;
    
    path.remove();
};

module.exports.getPathAfterImports = (body) => {
    const n = body.length;
    let i = 0;
    
    while (i < n - 1 && isImportDeclaration(body[i]))
        ++i;
    
    return body[i];
};

module.exports.isESM = (path) => {
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    
    for (const node of programPath.node.body) {
        if (isImportDeclaration(node))
            return true;
        
        if (isExportDeclaration(node))
            return true;
    }
    
    return false;
};

