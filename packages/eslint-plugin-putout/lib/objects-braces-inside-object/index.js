'use strict';

const {isObjectExpression} = require('putout').types;

module.exports.category = 'object';
module.exports.report = () => 'Add new lines beetween braces';

module.exports.include = () => {
    return [
        'ObjectExpression',
    ];
};

module.exports.filter = ({node, text}) => {
    const {properties} = node;
    
    for (const {value} of properties) {
        if (!isObjectExpression(value))
            return false;
    }
    
    const isStart = /{(?!\n)/.test(text);
    const isEnd = /\n(?!})/.test(text);
    
    return isStart || isEnd;
};

module.exports.fix = ({text}) => {
    return text
        .replace(/{(?!\n)/, '{\n')
        .replace(/\n(?!})/, '\n}');
};

