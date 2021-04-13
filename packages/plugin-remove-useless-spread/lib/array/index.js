'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith, compare} = operator;
const {isSpreadElement} = types;

module.exports.report = () => `Useless spread should be avoided`;

module.exports.match = () => ({
    __array: ({}, path) => {
        const elements = path.get('elements');
        const elPath = elements.find(isSpreadElement);
        
        if (!elPath)
            return false;
        
        if (elements.length === 1)
            return compare(elPath.node.argument, '__a(__args)');
        
        return compare(elPath.node.argument, '__a.map(__b)');
    },
});

module.exports.replace = () => ({
    'for (const __a of [...__b]) __c': 'for (const __a of __b) __c',
    'Array.from([...__a])': 'Array.from(__a)',
    '__array': (vars, path) => {
        const elements = path.get('elements');
        const elPath = elements.find(isSpreadElement);
        
        if (elements.length === 1)
            replaceWith(path, elPath.node.argument);
        
        if (elements.length > 1)
            replaceWith(elPath, elPath.node.argument);
        
        return path;
    },
});

