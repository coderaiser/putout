'use strict';

const {types, operator} = require('putout');
const {compare} = operator;
const {
    isNumericLiteral,
    isStringLiteral,
    isNullLiteral,
    isBooleanLiteral,
    isIdentifier,
    isBigIntLiteral,
    TSNumberKeyword,
    TSStringKeyword,
    TSNullKeyword,
    TSAnyKeyword,
    TSBooleanKeyword,
    TSBigIntKeyword,
    TSSymbolKeyword,
    isTSUnionType,
} = types;

module.exports.report = () => 'Remove useless type when declaring constant with primitive value';

module.exports.match = () => ({
    'const __a: __ = __b': checkType,
    'let __a: __ = __b': checkType,
});

module.exports.replace = () => ({
    'const __a: __ = __c': removeType,
    'let __a: __ = __c': removeType,
});

function getType(node) {
    if (isNumericLiteral(node))
        return TSNumberKeyword();
    
    if (isNullLiteral(node))
        return TSNullKeyword();
    
    if (isStringLiteral(node))
        return TSStringKeyword();
    
    if (isBooleanLiteral(node))
        return TSBooleanKeyword();
    
    if (isBigIntLiteral(node))
        return TSBigIntKeyword();
    
    if (isIdentifier(node, {name: 'undefined'}))
        return TSNullKeyword();
    
    if (compare(node, 'Symbol()'))
        return TSSymbolKeyword();
    
    return TSAnyKeyword;
}

const checkType = ({__a, __b}) => {
    if (!__a.typeAnnotation)
        return false;
    
    if (isTSUnionType(__a.typeAnnotation.typeAnnotation))
        return false;
    
    return isPrimitiveType(__b);
};

const isPrimitiveType = (node) => {
    const type = getType(node);
    
    if (type === TSAnyKeyword)
        return false;
    
    return true;
};

const removeType = ({__a}, path) => {
    delete __a.typeAnnotation;
    return path;
};

