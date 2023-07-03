'use strict';

const {types} = require('putout');
const {
    isIdentifier,
    MemberExpression,
} = types;

const checkIdentifier = ({__a}) => isIdentifier(__a);

const checkMemberExpression = ({__b}) => !isIdentifier(__b, {
    name: 'bind',
});

module.exports.report = () => `Pass 'fn', then 'args' split by coma`;

module.exports.match = () => ({
    'tryCatch(__a.__b(__args))': checkMemberExpression,
    'tryToCatch(__a.__b(__args))': checkMemberExpression,
    
    'tryCatch(__a(__args))': checkIdentifier,
    'tryToCatch(__a(__args))': checkIdentifier,
});

module.exports.replace = () => ({
    'tryCatch(__a.__b(__args))': convertMemberExpressionCallee,
    'tryToCatch(__a.__b(__args))': convertMemberExpressionCallee,
    
    'tryCatch(__a(__args))': convertIdentifierCallee,
    'tryToCatch(__a(__args))': convertIdentifierCallee,
});

function convertIdentifierCallee({__a, __args}, path) {
    path.node.arguments = [
        __a,
        ...__args,
    ];
    
    return path;
}

function convertMemberExpressionCallee({__a, __b, __args}, path) {
    path.node.arguments = [
        MemberExpression(__a, __b),
        ...__args,
    ];
    
    return path;
}
