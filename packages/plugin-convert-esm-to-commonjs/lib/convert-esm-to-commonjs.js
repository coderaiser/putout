'use strict';

module.exports.report = () => 'Commonjs should be used insted of ESM';

module.exports.replace = () => ({
    'export default __a': 'module.exports = __a',
    'export class __a {}': 'module.exports.__a = class __a {}',
    'export function __a(__args) {}': 'module.exports.__a = function __a(__args) {}',
    'export const __a = __b': 'module.exports.__a = __b',
    
    'import "__a"': 'require("__a")',
    'import * as __a from "__b"': 'const __a = require("__b")',
    'import __a from "__b"': 'const __a = require("__b")',
    'import __imports from "__a"': ({__imports, __a}) => {
        let result = 'const {\n';
        
        for (const {imported, local} of __imports) {
            result += `${imported.name}: ${local.name},\n`;
        }
        
        result += `\n} = require(${__a.raw});`;
        
        return result;
    },

});

