'use strict';

const {types} = require('putout');
const {isExpressionStatement} = types;

module.exports.report = () => 'Use object destructuring';

module.exports.match = () => ({
    '__a = __b.__a': (vars, {parentPath}) => isExpressionStatement(parentPath),
});

module.exports.replace = () => ({
    'const __a = __b.__a': 'const {__a} = __b',
    'let __a = __b.__a': 'let {__a} = __b',
    '__a = __b.__a': '({__a} = __b)',
});
