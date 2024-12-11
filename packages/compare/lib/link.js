'use strict';

const {types} = require('@putout/babel');
const {
    isIdentifier,
    isLiteral,
    isStringLiteral,
    isTemplateElement,
    isTSTypeReference,
    isJSXText,
} = types;

const parseName = (node) => {
    node = node[0] || node;
    const {name, value} = node;
    
    if (isIdentifier(node))
        return name;
    
    if (isLiteral(node))
        return value;
    
    if (isTemplateElement(node))
        return node.value.cooked;
    
    if (isTSTypeReference(node))
        return node.typeName.name;
    
    if (isJSXText(node))
        return node.value;
};

module.exports = ({add, value, nodeValue, templateStore}) => {
    const name = parseName(value);
    
    if (isStringLiteral(value) && !isStringLiteral(nodeValue))
        return false;
    
    if (!templateStore[name]) {
        templateStore[name] = nodeValue;
        return true;
    }
    
    if (isIdentifier(templateStore[name]) && isTSTypeReference(nodeValue))
        return true;
    
    add(templateStore[name], nodeValue, {
        plain: true,
    });
    
    return true;
};

module.exports._parseName = parseName;
