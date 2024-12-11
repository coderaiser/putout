'use strict';

const {types} = require('@putout/babel');
const {
    isArrayExpression,
    isLiteral,
    isIdentifier,
    isMemberExpression,
    isTemplateElement,
    isRegExpLiteral,
    isClassMethod,
    isTemplateLiteral,
    isJSXText,
    isJSXAttribute,
    isJSXIdentifier,
    isTSTypeReference,
    isTSTypeParameter,
} = types;

module.exports.extract = extract;

function extract(node) {
    node = node.node || node;
    
    if (isIdentifier(node))
        return node.name;
    
    if (isJSXIdentifier(node))
        return node.name;
    
    if (isRegExpLiteral(node))
        return node.pattern;
    
    if (isTemplateLiteral(node))
        return extract(node.quasis[0]);
    
    if (isLiteral(node))
        return node.value;
    
    if (isTemplateElement(node))
        return node.value.raw;
    
    if (isMemberExpression(node))
        return `${extract(node.object)}.${extract(node.property)}`;
    
    if (isArrayExpression(node))
        return extractArrayExpression(node);
    
    if (isJSXText(node))
        return node.value;
    
    if (isJSXAttribute(node))
        return node.name.name;
    
    if (isClassMethod(node))
        return extract(node.key);
    
    if (isTSTypeReference(node))
        return extract(node.typeName);
    
    if (isTSTypeParameter(node))
        return extract(node.name);
    
    const nodeTypes = [
        'Literals',
        'Identifiers',
        'TemplateLiteral',
        'TemplateElement',
        'RegExpLiteral',
        'ArrayExpression',
        'MemberExpression',
        'JSXIdentifier',
        'JSXAttribute',
        'JSXText',
        'TSTypeParameter',
    ].join(', ');
    
    throw Error(`'operator.extract(node)' understands only ${nodeTypes} and TSTypeReference🤷, found: ${node.type}`);
}

function extractArrayExpression(node, collector = []) {
    for (const el of node.elements) {
        if (isArrayExpression(el)) {
            extractArrayExpression(el, collector);
            continue;
        }
        
        collector.push(extract(el));
    }
    
    return collector.join(',');
}
