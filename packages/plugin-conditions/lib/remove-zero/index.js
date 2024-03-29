'use strict';

const {types} = require('putout');
const {
    isBinaryExpression,
    isJSXExpressionContainer,
} = types;

const check = (vars, path) => {
    const {parentPath} = path;
    
    if (parentPath.find(isJSXExpressionContainer))
        return false;
    
    if (parentPath.isAssignmentExpression())
        return false;
    
    return !parentPath.isVariableDeclarator();
};

module.exports.report = () => 'Avoid zero in assertions';

module.exports.match = () => ({
    '__a !== 0': check,
    '__a != 0': check,
    '__a === 0': check,
    '__a == 0': check,
});

module.exports.replace = () => ({
    '__a !== 0': '__a',
    '__a != 0': '__a',
    '__a === 0': maybeParens,
    '__a == 0': maybeParens,
});

function maybeParens({__a}) {
    if (isBinaryExpression(__a))
        return '!(__a)';
    
    return '!__a';
}
