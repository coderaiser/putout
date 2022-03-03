'use strict';

const {types} = require('putout');
const {
    isBlockStatement,
    isIfStatement,
    isExpressionStatement,
} = types;

const reg = /\)\n(\s+)?\n/;

module.exports.report = () => `Remove useless newline`;

module.exports.fix = ({text}) => {
    const result = text.replace(reg, ')\n');
    return result;
};

module.exports.include = () => [
    'IfStatement',
    'ForOfStatement',
    'ForStatement',
    'WhileStatement',
];

module.exports.filter = ({text, node}) => {
    if (isIf(text, node))
        return true;
    
    if (isBody(text, node))
        return true;
    
    return false;
};

function isIf(text, node) {
    if (!isIfStatement(node))
        return false;
    
    const {consequent, alternate} = node;
    
    if (!isExpressionStatement(alternate) && !isExpressionStatement(consequent))
        return false;
    
    return reg.test(text);
}

function isBody(text, node) {
    const {body} = node;
    
    if (isBlockStatement(body))
        return false;
    
    return reg.test(text);
}
