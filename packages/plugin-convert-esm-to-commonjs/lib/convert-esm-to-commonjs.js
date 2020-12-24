'use strict';

const {template} = require('putout');

module.exports.report = () => 'Commonjs should be used insted of ESM';

module.exports.replace = () => ({
    'export default __a': 'module.exports = __a',
    'export class __a {}': 'module.exports.__a = class __a {}',
    'export function __a(__args) {}': replaceFn,
    'export async function __a(__args) {}': replaceFn,
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

function replaceFn({__a}, path) {
    const {name} = __a;
    const {declaration} = path.node;
    const node = template.ast.fresh(`module.exports.${name} = __x`);
    
    node.right = declaration;
    
    return node;
}
