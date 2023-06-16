'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => 'Remove empty export';

module.exports.fix = (path) => {
    remove(path);
};

module.exports.include = () => [
    'ExportNamedDeclaration',
];

module.exports.filter = (path) => {
    const {specifiers, declaration} = path.node;
    
    return !declaration && !specifiers.length;
};
