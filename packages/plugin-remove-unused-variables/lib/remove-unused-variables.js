'use strict';

const {operator} = require('putout');
const getVars = require('./get-vars');

const transform = require('./transform');
const getUnused = require('./get-unused');

const {
    replaceWith,
    compare,
    remove,
} = operator;

module.exports.report = ({name}) => `'${name}' is defined but never used`;

module.exports.fix = ({path}) => {
    if (compare(path, 'const __a = __b = __c'))
        return replaceWith(path.parentPath, path.node.init);
    
    if (isOneImport(path))
        return remove(path.parentPath);
    
    remove(path);
};

module.exports.find = (ast, {traverse}) => {
    const vars = getVars(ast, {
        setPath: true,
        traverse,
    });
    
    const transformed = transform(vars);
    
    return getUnused(transformed);
};

function isOneImport({parentPath}) {
    if (!parentPath.isImportDeclaration())
        return false;
    
    return parentPath.node.specifiers.length === 1;
}
