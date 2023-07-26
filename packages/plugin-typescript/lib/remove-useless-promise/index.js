'use strict';

const {operator} = require('putout');
const {replaceWith, contains} = operator;

module.exports.report = () => `Avoid useless 'Promise' type`;

module.exports.match = () => ({
    'function __a(): Promise<__b> {}': (vars, path) => !contains(path, ['throw __', 'await __', 'for await (__ of __) __']),
});

module.exports.replace = () => ({
    'function __a(): Promise<__b> {}': ({__b}, path) => {
        replaceWith(path.get('returnType.typeAnnotation'), __b);
        
        return path;
    },
});
