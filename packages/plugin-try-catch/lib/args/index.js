import {types} from 'putout';

const {
    isIdentifier,
    memberExpression,
} = types;

const checkIdentifier = ({__a}) => isIdentifier(__a);

const checkMemberExpression = ({__b}) => !isIdentifier(__b, {
    name: 'bind',
});

export const report = () => `Pass 'fn', then 'args' split by coma`;

export const match = () => ({
    'tryCatch(__a.__b(__args))': checkMemberExpression,
    'tryToCatch(__a.__b(__args))': checkMemberExpression,
    
    'tryCatch(__a(__args))': checkIdentifier,
    'tryToCatch(__a(__args))': checkIdentifier,
});

export const replace = () => ({
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
        memberExpression(__a, __b),
        ...__args,
    ];
    
    return path;
}
