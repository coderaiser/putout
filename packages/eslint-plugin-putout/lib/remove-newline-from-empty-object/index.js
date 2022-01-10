'use strict';

const {types} = require('putout');
const {isArrayExpression} = types;

module.exports.category = 'object';
module.exports.report = () => 'Remove newline from empty object';

const regExp = /\n/;

module.exports.filter = ({text, node, getCommentsInside}) => {
    const comments = getCommentsInside(node);
    
    if (comments.length)
        return false;
    
    if (isArrayExpression(node.parent))
        return false;
    
    if (node.properties.length)
        return false;
    
    return regExp.test(text);
};

module.exports.fix = () => '{}';

module.exports.include = () => [
    'ObjectExpression',
];

