'use strict';

const {types} = require('putout');
const {isObjectExpression} = types;

module.exports.report = () => `Use 'traverse' instead of 'include'`;

const check = ({__a}) => {
    return isObjectExpression(__a.body);
};

module.exports.match = () => ({
    'const include = __a': check,
    'module.exports.include = __a': check,
});

module.exports.replace = () => ({
    'const include = __a': 'const traverse = __a',
    'module.exports.include = __a': 'module.exports.traverse = __a',
});
