'use strict';

const {types, template} = require('putout');
const {isImportDefaultSpecifier} = types;

module.exports.report = () => `Use 'CommonJS' instead of 'ESM'`;

module.exports.replace = () => ({
    'export default __a': 'module.exports = __a',
    'export class __a {}': 'module.exports.__a = class __a {}',
    'export function __a(__args) {}': replaceFn,
    'export async function __a(__args) {}': replaceFn,
    'export const __a = __b': 'module.exports.__a = __b',
    
    'import "__a"': 'require("__a")',
    'import * as __a from "__b"': 'const __a = require("__b")',
    'import __imports from "__a"': ({__imports, __a}) => {
        let assignment = '';
        let destructuring = 'const {\n';
        let hasSpecifiers = false;
        
        for (const currentImport of __imports) {
            const {imported, local} = currentImport;
            
            if (isImportDefaultSpecifier(currentImport)) {
                assignment = `const ${local.name} = require("__a")`;
                continue;
            }
            
            hasSpecifiers = true;
            destructuring += `${imported.name}: ${local.name},\n`;
        }
        
        destructuring += `\n} = require("${__a.value}");`;
        
        if (assignment && !hasSpecifiers)
            return assignment;
        
        if (!assignment && hasSpecifiers)
            return destructuring;
        
        return `{
            ${assignment};
            ${destructuring};
        }`;
    },
});

function replaceFn({__a}, path) {
    const {name} = __a;
    const {declaration} = path.node;
    const node = template.ast.fresh(`module.exports.${name} = __x`);
    
    node.right = declaration;
    
    return node;
}
