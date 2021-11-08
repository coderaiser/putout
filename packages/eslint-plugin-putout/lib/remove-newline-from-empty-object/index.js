'use strict';

const {types} = require('putout');
const {isArrayExpression} = types;

module.exports.category = 'object';
module.exports.report = () => 'Remove newline from empty object';

const regExp = /\n/;

module.exports.filter = ({text, node}) => {
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

