import {types} from 'putout';

const {
    isBinaryExpression,
    isJSXExpressionContainer,
} = types;

export const createAvoidInAssertions = (value) => ({
    report: createReport(value),
    match: createMatch(value),
    replace: createReplace(value),
});

const check = (vars, path) => {
    const {parentPath} = path;
    
    if (parentPath.find(isJSXExpressionContainer))
        return false;
    
    if (parentPath.isAssignmentExpression())
        return false;
    
    return !parentPath.isVariableDeclarator();
};

const createReport = (value) => () => `Avoid '${value}' in assertions`;

const createMatch = (value) => () => ({
    [`__a !== ${value}`]: check,
    [`__a != ${value}`]: check,
    [`__a === ${value}`]: check,
    [`__a == ${value}`]: check,
});

const createReplace = (value) => () => ({
    [`__a !== ${value}`]: '__a',
    [`__a != ${value}`]: '__a',
    [`__a === ${value}`]: maybeParens,
    [`__a == ${value}`]: maybeParens,
});

function maybeParens({__a}) {
    if (isBinaryExpression(__a))
        return '!(__a)';
    
    return '!__a';
}
