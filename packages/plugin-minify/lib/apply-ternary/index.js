'use strict';

const {types} = require('putout');
const {isExpression} = types;

module.exports.report = () => `Use 'ternary' instead of 'if condition'`;

module.exports.match = () => ({
    'if (__a) __b; else __c;': ({__b, __c}) => {
        if (!isExpression(__b))
            return false;
        
        return isExpression(__c);
    },
});

module.exports.replace = () => ({
    'if (__a) __b; else __c;': '__a ? __b : __c',
});
