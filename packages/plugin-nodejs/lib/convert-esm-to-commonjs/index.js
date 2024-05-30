'use strict';

const {types} = require('putout');
const {isImportDefaultSpecifier} = types;

const BODY = '{__body}';
const FN = `function __a(__args) ${BODY}`;
const GEN_FN = `function* __a(__args) ${BODY}`;
const ASYNC_FN = `async function __a(__args) ${BODY}`;
const CLASS = `class __a ${BODY}`;

module.exports.report = () => `Use 'CommonJS' instead of 'ESM'`;

module.exports.replace = () => ({
    'export default __a': 'module.exports = __a',
    [`export ${CLASS}`]: `module.exports.__a = ${CLASS}`,
    [`export ${FN}`]: `module.epxorts.__a = ${FN}`,
    [`export ${ASYNC_FN}`]: `module.epxorts.__a = ${ASYNC_FN}`,
    [`export ${GEN_FN}`]: `module.epxorts.__a = ${GEN_FN}`,
    'export const __a = __b': 'module.exports.__a = __b',
    'export {__exports}': ({__exports}) => {
        let result = 'module.exports = {\n';
        
        for (const {local} of __exports) {
            result += `${local.name},`;
        }
        
        result += '};';
        
        return result;
    },
    
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
