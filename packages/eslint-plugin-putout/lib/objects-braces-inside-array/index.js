'use strict';

const {isObjectExpression} = require('putout').types;

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep braces on the same line with brackets';

module.exports.include = () => [
    'ArrayExpression',
];

const badStart = /^\[\n(\s+)?{/;
const badEndReg = /},?\n(\s+)?]/;
const badMiddle = /\},\n(s+)?\{/;

module.exports.filter = ({node, text}) => {
    const {elements} = node;
    
    for (const element of elements) {
        if (!isObjectExpression(element))
            return false;
    }
    
    const isStart = badStart.test(text);
    const isEnd = badEndReg.test(text);
    const isBadMiddle = badMiddle.test(text);
    
    return isStart || isEnd || isBadMiddle;
};

module.exports.fix = ({text}) => {
    return text
        .replace('[\n', '[')
        .replace(/\[\s+{/, '[{')
        .replace('\n]', ']')
        .replace(/},\n(\s+)?{/g, '}, {')
        .replace(badEndReg, '}]');
};

