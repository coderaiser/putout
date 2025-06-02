import {types, operator} from 'putout';

const {compare} = operator;
const {
    isNumericLiteral,
    isStringLiteral,
    isNullLiteral,
    isBooleanLiteral,
    isIdentifier,
    isBigIntLiteral,
    tsAnyKeyword,
    tsUndefinedKeyword,
    tsSymbolKeyword,
} = types;

const isPrimitiveType = (node) => getType(node) !== tsAnyKeyword;

export const report = (path) => {
    const {node} = path.get('declarations.0.init');
    const type = getType(node).toLowerCase();
    
    return `Type "${type}" should be used instead of "any"`;
};

export const match = () => ({
    'const __a: any = __b': ({__b}) => isPrimitiveType(__b),
});

export const replace = () => ({
    'const __a: any = __b': ({__a, __b}, path) => {
        __a.typeAnnotation.typeAnnotation = getTypeAnnotation(__b);
        return path;
    },
});

function getTypeAnnotation(node) {
    if (isIdentifier(node, {name: 'undefined'}))
        return tsUndefinedKeyword();
    
    if (compare(node, 'Symbol()'))
        return tsSymbolKeyword();
    
    const type = getType(node);
    const method = `ts${type}Keyword`;
    
    return types[method]();
}

function getType(node) {
    if (isNumericLiteral(node))
        return 'Number';
    
    if (isNullLiteral(node))
        return 'Null';
    
    if (isStringLiteral(node))
        return 'String';
    
    if (isBooleanLiteral(node))
        return 'Boolean';
    
    if (isBigIntLiteral(node))
        return 'BigInt';
    
    if (isIdentifier(node, {name: 'undefined'}))
        return 'Undefined';
    
    if (compare(node, 'Symbol()'))
        return 'Symbol';
    
    return 'Any';
}
