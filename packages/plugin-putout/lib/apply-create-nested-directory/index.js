'use strict';

const {types} = require('putout');
const {isStringLiteral} = types;

const NESTED = {
    createDirectory: 'createNestedDirectory',
    createNestedDirectory: 'createDirectory',
};

module.exports.report = (path) => {
    const {name} = path.node.callee;
    return `Use '${NESTED[name]}()' instead of '${name}()'`;
};

module.exports.match = () => ({
    'createDirectory(__a, __b)': ({__b}) => {
        if (!isStringLiteral(__b))
            return false;
        
        return __b.value.includes('/');
    },
    'createNestedDirectory(__a, __b)': ({__b}) => {
        if (!isStringLiteral(__b))
            return false;
        
        return !__b.value.includes('/');
    },
});

module.exports.replace = () => ({
    'createDirectory(__a, __b)': 'createNestedDirectory(__a, __b)',
    'createNestedDirectory(__a, __b)': 'createDirectory(__a, __b)',
});
