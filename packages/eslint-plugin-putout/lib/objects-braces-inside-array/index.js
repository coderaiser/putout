'use strict';

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep braces on the same line with brackets';

module.exports.include = () => {
    return [
        'ArrayExpression',
    ];
};

const badEndReg = /},?\n(\s+)?]/;

module.exports.filter = ({text}) => {
    const isStart = /^\[\n(\s+)?{/.test(text);
    const isEnd = badEndReg.test(text);
    
    return isStart || isEnd;
};

module.exports.fix = ({text}) => {
    return text
        .replace('[\n', '[')
        .replace(/\[\s+{/, '[{')
        .replace('\n]', ']')
        .replace(/},\n(\s+)?{/, '}, {')
        .replace(badEndReg, '}]');
};

