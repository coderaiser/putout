'use strict';

const {types} = require('putout');
const {
    isMemberExpression,
    isVariableDeclarator,
} = types;

module.exports.category = 'array';
module.exports.report = () => 'Add newlines between array elements';

const regexp = /['\da-zA-Z]+, ['\da-zA-Z]/;

const isSupportedNode = (a) => {
    if (a.type === 'Literal')
        return true;
    
    if (a.type === 'Identifier')
        return true;
    
    return false;
};

module.exports.filter = ({text, node}) => {
    if (isMemberExpression(node.parent))
        return false;
    
    const supported = node.elements
        .every(isSupportedNode);
    
    if (!supported)
        return false;
    
    if (!isVariableDeclarator(node.parent))
        return false;
    
    if (node.elements.length < 5)
        return false;
    
    if (regexp.test(text))
        return true;
    
    return false;
};

module.exports.fix = ({text}) => {
    return text
        .replace(/\[/g, '[\n')
        .replace(/\]/g, '\n]')
        .replace(/,/g, ',\n');
};

module.exports.include = () => [
    'ArrayExpression',
];

