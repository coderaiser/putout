'use strict';

const {types, operator} = require('putout');

const {
    isIdentifier,
    isCallExpression,
} = types;

const {compare} = operator;

module.exports.report = () => `Copy array with '.slice()'`;

module.exports.exclude = () => [
    '[...new Set(__a)]',
    'new Set([...__a])',
    '[...(__a ? __b : __c)]',
];

module.exports.match = () => ({
    '[...__a]': ({__a}, path) => {
        if (isCallExpression(__a))
            return false;
        
        if (isIdentifier(__a)) {
            const binding = path.scope.getBinding(__a.name);
            
            if (!binding)
                return false;
            
            if (compare(binding.path, 'const __ = new Set(__)'))
                return false;
        }
        
        return true;
    },
});

module.exports.replace = () => ({
    '[...__a]': '__a.slice()',
    '__a.map((a) => a)': '__a.slice()',
});
