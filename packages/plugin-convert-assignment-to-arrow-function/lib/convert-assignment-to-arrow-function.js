'use strict';

const {types} = require('putout');
const {
    isIdentifier,
    isMemberExpression,
} = types;

module.exports.report = () => 'Expected ArrowFunction instead of Assignment';

module.exports.match = () => ({
    'const __a = __b = __c': ({__b}, path) => {
        if (isIdentifier(__b) && path.scope.hasBinding(__b.name))
            return false;
        
        return !isMemberExpression(__b);
    },
});

module.exports.replace = () => ({
    'const __a = __b = __c': 'const __a = __b => __c',
});
