'use strict';

const {
    isIdentifier,
    isLiteral,
    isStringLiteral,
} = require('@babel/types');

const parseName = (node) => {
    const {name, value} = node;
    
    if (isIdentifier(node))
        return name;
    
    if (isLiteral(node))
        return value;
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
