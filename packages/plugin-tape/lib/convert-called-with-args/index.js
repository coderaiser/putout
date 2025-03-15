'use strict';

const {types} = require('putout');
const {
    isIdentifier,
    isArrayExpression,
} = types;

module.exports.report = () => `Use an array as args to 'calledWith()'`;

module.exports.match = () => ({
    't.calledWith(__a, __b)': ({__b}) => {
        if (isIdentifier(__b))
            return false;
        
        return !isArrayExpression(__b);
    },
});

module.exports.replace = () => ({
    't.calledWith(__a, __b)': 't.calledWith(__a, [__b])',
    't.calledWith(__a, [...__b], __c)': 't.calledWith(__a, __b, __c)',
});
