'use strict';

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep braces on the same line with brackets';

module.exports.include = () => {
    return [
        'ArrayExpression',
    ];
};

module.exports.filter = ({text}) => {
    const is = /^\[\n(\s+)?{/.test(text);
    
    return is;
};

module.exports.fix = ({text}) => {
    return text
        .replace('[\n', '[')
        .replace('\n]', ']')
        .replace(/},\n(\s+)?{/, '}, {');
};

