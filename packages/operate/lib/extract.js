'use strict';

const {
    isLiteral,
    isIdentifier,
    isTemplateElement,
    isRegExpLiteral,
    isClassMethod,
    isTemplateLiteral,
} = require('@babel/types');

module.exports.extract = extract;

function extract(node) {
    if (isIdentifier(node))
        return node.name;
    
    if (isRegExpLiteral(node))
        return node.pattern;
    
    if (isTemplateLiteral(node))
        return extract(node.quasis[0]);
    
    if (isLiteral(node))
        return node.value;
    
    if (isTemplateElement(node))
        return node.value.raw;
    
    if (isClassMethod(node))
        return extract(node.key);
    
    throw Error(`"operator.extract(node)" understands only Literals, Identifiers, TemplateLiteral, TemplateElement and RegExpLiteral  🤷, found: ${node.type}`);
}

