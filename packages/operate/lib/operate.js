'use strict';

const {types} = require('@putout/babel');

const {getBinding, getBindingPath} = require('./get-binding');
const {isSimple} = require('./is-simple');
const {extract} = require('./extract');
const {compute} = require('./compute');
const {remove} = require('./remove');
const {getExportDefault} = require('./get-export-default');
const {rename} = require('./rename');
const {renameProperty} = require('./rename-property');
const {setLiteralValue} = require('./set-literal-value');
const {getPathAfterRequires} = require('./get-path-after-requires');

const {
    getProperty,
    getProperties,
    traverseProperties,
} = require('./properties');

const {getLiteralRaw} = require('./get-literal-raw');

const {
    replaceWith,
    replaceWithMultiple,
    toExpression,
} = require('./replace-with');

const {
    ExpressionStatement,
    matchesPattern,
    isImportDeclaration,
    isExportDeclaration,
    isStatement,
} = types;

module.exports.getBinding = getBinding;
module.exports.getBindingPath = getBindingPath;
module.exports.getLiteralRaw = getLiteralRaw;
module.exports.extract = extract;
module.exports.compute = compute;
module.exports.replaceWith = replaceWith;
module.exports.getExportDefault = getExportDefault;
module.exports.toExpression = toExpression;
module.exports.isSimple = isSimple;
module.exports.rename = rename;
module.exports.renameProperty = renameProperty;
module.exports.setLiteralValue = setLiteralValue;

module.exports.getProperty = getProperty;
module.exports.getProperties = getProperties;
module.exports.traverseProperties = traverseProperties;

module.exports.replaceWithMultiple = replaceWithMultiple;

module.exports.insertBefore = (path, node) => {
    path.insertBefore(node);
};

module.exports.insertAfter = (path, node) => {
    const {comments} = path.node;
    
    if (path.node.trailingComments?.length && path.getNextSibling()?.node?.leadingComments)
        delete path.node.trailingComments;
    
    if (node.trailingComments)
        delete node.trailingComments;
    
    if (isStatement(path) && !isStatement(node))
        path.insertAfter(ExpressionStatement(node));
    else
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

module.exports.remove = remove;

module.exports.getPathAfterRequires = getPathAfterRequires;
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
