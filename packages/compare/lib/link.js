'use strict';

const {types} = require('@putout/babel');
const {
    isIdentifier,
    isLiteral,
    isStringLiteral,
    isTemplateElement,
    isTSTypeReference,
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
};

module.exports = ({add, value, nodeValue, templateStore}) => {
    const name = parseName(value);
    
    if (isStringLiteral(value) && !isStringLiteral(nodeValue))
        return false;
    
    if (!templateStore[name]) {
        templateStore[name] = nodeValue;
        return true;
    }
    
    if (isTSTypeReference(templateStore[name]) && isIdentifier(nodeValue))
        return true;
    
    add(templateStore[name], nodeValue);
    
    return true;
};
