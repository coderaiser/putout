import {types, operator} from 'putout';

const {compare} = operator;

const {
    isNumericLiteral,
    isStringLiteral,
    isNullLiteral,
    isBooleanLiteral,
    isIdentifier,
    isBigIntLiteral,
    TSAnyKeyword,
    isTSUnionType,
    tsNumberKeyword,
    tsNullKeyword,
    tsStringKeyword,
    tsBooleanKeyword,
    tsBigIntKeyword,
    tsSymbolKeyword,
} = types;

export const report = () => 'Remove useless type when declaring constant with primitive value';

export const match = () => ({
    'const __a: __ = __b': checkType,
    'let __a: __ = __b': checkType,
});

export const replace = () => ({
    'const __a: __ = __b': removeType,
    'let __a: __ = __b': removeType,
});

function getType(node) {
    if (isNumericLiteral(node))
        return tsNumberKeyword();
    
    if (isNullLiteral(node))
        return tsNullKeyword();
    
    if (isStringLiteral(node))
        return tsStringKeyword();
    
    if (isBooleanLiteral(node))
        return tsBooleanKeyword();
    
    if (isBigIntLiteral(node))
        return tsBigIntKeyword();
    
    if (isIdentifier(node, {name: 'undefined'}))
        return tsNullKeyword();
    
    if (compare(node, 'Symbol()'))
        return tsSymbolKeyword();
    
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
    
    return type !== TSAnyKeyword;
};

const removeType = ({__a}, path) => {
    delete __a.typeAnnotation;
    return path;
};
