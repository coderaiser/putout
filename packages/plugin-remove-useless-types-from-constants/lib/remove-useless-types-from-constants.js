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
} = types;

const isPrimitiveType = (node) => getType(node) !== TSAnyKeyword;

module.exports.report = () => 'Remove useless type when declaring constant with primitive value';

module.exports.match = () => ({
    'const __a: __ = __b': ({__a, __b}) => {
        if (!__a.typeAnnotation)
            return false;
        
        return isPrimitiveType(__b);
    },
});

module.exports.replace = () => ({
    'const __a: __ = __c': ({__a}, path) => {
        delete __a.typeAnnotation;
        
        return path;
    },
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
