'use strict';

const {
    isIdentifier,
    isLiteral,
    isStringLiteral,
    isTemplateElement,
} = require('@babel/types');

const parseName = (node) => {
    node = node[0] || node;
    const {name, value} = node;
    
    if (isIdentifier(node))
        return name;
    
    if (isLiteral(node))
        return value;
    
    if (isTemplateElement(node))
        return node.value.cooked;
};

module.exports = ({add, value, nodeValue, templateStore}) => {
    const name = parseName(value);
    
    if (isStringLiteral(value) && !isStringLiteral(nodeValue))
        return false;
    
    if (!templateStore[name]) {
        templateStore[name] = nodeValue;
        return true;
    }
    
    add(templateStore[name], nodeValue);
    
    return true;
};

