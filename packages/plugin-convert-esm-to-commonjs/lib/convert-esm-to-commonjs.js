'use strict';

module.exports.report = () => 'Commonjs should be used insted of ESM';

module.exports.fix = require('./fix');

module.exports.include = () => [
    'ExportNamedDeclaration',
    'ExportDefaultDeclaration',
    'ImportDeclaration',
];

