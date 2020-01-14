'use strict';

module.exports.report = () => 'Commonjs should be used insted of ESM';

module.exports.fix = require('./fix');

/*
module.exports.replace = () => ({
    'import "__a"': 'require("__a")',
    'import * as __a from "__b"': 'const __a = require("__b")',
    'import __a from "__b"': 'const __a = require("__b")',
    'import __object from "__b"': 'const __object = require("__b")',
    
    'export default __a': 'module.exports = __a',
    'export class __a {}': 'module.exports.__a = class __a {}',
    'export function __a {}': 'module.exports.__a = function __a {}',
    'export const __a = __b': 'module.exports.__a = __b',
});
*/

module.exports.include = () => [
    'ExportNamedDeclaration',
    'ExportDefaultDeclaration',
    'ImportDeclaration',
];

