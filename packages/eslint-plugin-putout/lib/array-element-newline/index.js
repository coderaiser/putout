'use strict';

const {types} = require('putout');
const {
    isMemberExpression,
    isVariableDeclarator,
} = types;

module.exports.category = 'array';
module.exports.report = () => 'Add newlines between array elements';

const regexp = /['\da-zA-Z]+, ['\da-zA-Z]/;

const isESTreeLiteral = (a) => a.type === 'Literal';

module.exports.filter = ({text, node}) => {
    if (isMemberExpression(node.parent))
        return false;
    
    const isAllPrimitives = node.elements
        .every(isESTreeLiteral);
    
    if (!isAllPrimitives )
        return false;
    
    if (!isVariableDeclarator(node.parent))
        return false;
    
    if (node.elements.length < 4)
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

