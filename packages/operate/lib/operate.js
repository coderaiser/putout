'use strict';

const {
    ExpressionStatement,
    toStatement,
    matchesPattern,
    isBlockStatement,
    isImportDeclaration,
    isExportDeclaration,
    isExpression,
    isStatement,
    BlockStatement,
} = require('@babel/types');

const {getBinding, getBindingPath} = require('./get-binding');
const {extract} = require('./extract');
const {compute} = require('./compute');
const {getExportDefault} = require('./get-export-default');
const {getProperty, getProperties} = require('./properties');

const {assign} = Object;

module.exports.getBinding = getBinding;
module.exports.getBindingPath = getBindingPath;
module.exports.extract = extract;
module.exports.compute = compute;
module.exports.replaceWith = replaceWith;
module.exports.getExportDefault = getExportDefault;

module.exports.getProperty = getProperty;
module.exports.getProperties = getProperties;

module.exports.toExpression = toExpression;
function toExpression(el) {
    const {type} = el;
    const ignore = [
        'ObjectProperty',
    ];
    
    if (ignore.includes(type))
        return el;
    
    if (isExpression(el))
        return ExpressionStatement(el);
    
    return toStatement(el);
}

function replaceWith(path, node) {
    if (path?.parentPath?.isExpressionStatement?.() && !path.parentPath.isProgram())
        path = path.parentPath;
    
    const {comments, loc} = path.node;
    const {currentPath} = maybeBody(path, node);
    
    currentPath.replaceWith(node);
    
    assign(currentPath.node, {
        comments,
        loc,
    });
    
    return currentPath;
}

module.exports.replaceWithMultiple = (path, nodes) => {
    const parentComments = path.parentPath.node.comments;
    const {comments} = path.node;
    
    const newNodes = nodes
        .filter(Boolean)
        .map(toExpression);
    
    const {currentPath} = maybeBody(path);
    const newPath = currentPath.replaceWithMultiple(newNodes);
    
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

const getPrevSibling = (path) => {
    if (!path.isVariableDeclarator())
        return path.getPrevSibling();
    
    return path.parentPath.getPrevSibling();
};

module.exports.remove = (path) => {
    const programBlock = path.scope.getProgramParent().block;
    const prev = getPrevSibling(path);
    
    if (path.scope.block === programBlock && !prev.node)
        programBlock.comments = getComments(path);
    
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

function maybeBody(path, node) {
    const {parentPath} = path;
    
    if (node && !isStatement(node) || isBlockStatement(node) || !parentPath?.isArrowFunctionExpression?.())
        return {
            currentPath: path,
        };
    
    parentPath.node.body = BlockStatement([ExpressionStatement(path.node)]);
    
    return {
        currentPath: parentPath.get('body.body.0'),
    };
}

