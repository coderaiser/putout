'use strict';

const {types} = require('putout');
const {isExpressionStatement} = types;

const reg = /\)\n(\s+)?\n/;

module.exports.report = () => `Remove newline`;

module.exports.fix = ({text}) => {
    return text.replace(reg, ')\n');
};

module.exports.include = () => [
    'IfStatement',
];

module.exports.filter = ({node, text}) => {
    const {consequent} = node;
    
    if (!isExpressionStatement(consequent))
        return false;
    
    return reg.test(text);
};

