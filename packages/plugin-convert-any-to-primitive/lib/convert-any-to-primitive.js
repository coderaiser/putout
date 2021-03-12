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
    TSAnyKeyword,
    TSUndefinedKeyword,
    TSSymbolKeyword,
} = types;

const isPrimitiveType = (node) => getType(node) !== TSAnyKeyword;
const bigFirst = (a) => a[0].toUpperCase() + a.slice(1);

module.exports.report = (path) => {
    const {node} = path.get('declarations.0.init');
    const type = getType(node).toLowerCase();
    
    return `Type "${type}" should be used instead of "any"`;
};

module.exports.match = () => ({
    'const __a: any = __b': ({__b}) => {
        return isPrimitiveType(__b);
    },
});

module.exports.replace = () => ({
    'const __a: any = __b': ({__a, __b}, path) => {
        __a.typeAnnotation.typeAnnotation = getTypeAnnotation(__b);
        return path;
    },
});

function getTypeAnnotation(node) {
    if (isIdentifier(node, {name: 'undefined'}))
        return TSUndefinedKeyword();
    
    if (compare(node, 'Symbol()'))
        return TSSymbolKeyword();
    
    const type = getType(node);
    const method = `TS${bigFirst(type)}Keyword`;
    
    return types[method]();
}

function getType(node) {
    if (isNumericLiteral(node))
        return 'number';
    
    if (isNullLiteral(node))
        return 'null';
    
    if (isStringLiteral(node))
        return 'string';
    
    if (isBooleanLiteral(node))
        return 'boolean';
    
    if (isBigIntLiteral(node))
        return 'BigInt';
    
    if (isIdentifier(node, {name: 'undefined'}))
        return 'undefined';
    
    if (compare(node, 'Symbol()'))
        return 'symbol';
    
    return 'any';
}

