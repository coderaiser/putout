'use strict';

const {operator, types} = require('putout');
const {
    ObjectPattern,
    BlockStatement,
    Identifier,
    ArrayPattern,
    ObjectExpression,
} = types;

const {replaceWith} = operator;
const noop = () => {};

module.exports.report = noop;

module.exports.include = () => [
    'Identifier',
    'StringLiteral',
];

module.exports.fix = (path, {options}) => {
    const {getVar} = options;
    const {node} = path;
    
    const {value, name} = node;
    
    if (path.isStringLiteral() && /^__[a-z]$/.test(value)) {
        path.node.value = getVar(name);
        return;
    }
    
    if (/^__identifier__[a-z]$/.test(name)) {
        path.node.name = getVar(name);
        return;
    }
    
    if (/^__[a-z]$/.test(name)) {
        path.node.name = getVar(name);
        return;
    }
    
    if (/__args/.test(name)) {
        path.node.name = getVar(name);
        return;
    }
    
    if (name === '__array') {
        if (path.parentPath.isCallExpression())
            return replaceWith(path, ArrayPattern([]));
        
        if (path.parentPath.isFunction())
            return replaceWith(path, ArrayPattern([]));
    }
    
    if (name === '__object')
        return objectify(path);
    
    if (name === '__body') {
        if (path.parentPath.isClassProperty()) {
            const key = Identifier(getVar());
            
            replaceWith(path, key);
            
            return;
        }
        
        replaceWith(path, BlockStatement([]));
    }
};

function objectify(path) {
    const {parentPath} = path;
    const isAssign = parentPath.isAssignmentExpression();
    const isVar = parentPath.isVariableDeclarator();
    
    if (path.parentPath.isExportDeclaration())
        return replaceWith(path, ObjectExpression([]));
    
    if (path.parentPath.isCallExpression())
        return replaceWith(path, ObjectExpression([]));
    
    if (isAssign && parentPath.get('right') === path)
        return replaceWith(path, ObjectExpression([]));
    
    if (isVar && parentPath.get('id') === path)
        return replaceWith(path, ObjectPattern([]));
}
