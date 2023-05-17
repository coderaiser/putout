'use strict';

const {types} = require('putout');
const {isExpression} = types;

module.exports.report = () => `Use 'logical expressions' instead of 'if conditions'`;

const check = ({__b}) => isExpression(__b);

module.exports.match = () => ({
    'if(__a) {__b}': check,
    'if(__a) __b': check,
});

module.exports.replace = () => ({
    'if(__a) {__b}': '__a && __b',
    'if(__a) __b': '__a && __b',
});
