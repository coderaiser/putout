'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;

const {
    isIdentifier,
    ExportNamedDeclaration,
    isImportSpecifier,
    ExportSpecifier,
} = types;

module.exports.report = () => `Use 'ESM' instead of 'CommonJS'`;

module.exports.exclude = () => ['__, __'];

module.exports.match = () => ({
    'module.exports.__a = __b': ({__a, __b}, path) => {
        const {name} = __a;
        
        if (isIdentifier(__a) && /^import|export$/.test(__a.name))
            return false;
        
        if (isIdentifier(__b)) {
            const {name} = __b;
            const binding = path.scope.bindings[name];
            
            if (!binding)
                return false;
        }
        
        if (isIdentifier(__b, {name}))
            return true;
        
        return !path.scope.bindings[__a.name];
    },
});

module.exports.replace = () => ({
    'module.exports = __a': 'export default __a',
    'module.exports.__a = __b': ({__a, __b}, path) => {
        const {name} = __a;
        
        if (isIdentifier(__b, {name}))
            return addExportToBinding(__b.name, path);
        
        return 'export const __a = __b';
    },
});

function addExportToBinding(name, path) {
    const {scope} = path;
    const binding = scope.bindings[name];
    const bindingPath = parseBindingPath(binding.path);
    
    if (isImportSpecifier(bindingPath)) {
        const {imported} = bindingPath.node;
        
        return ExportNamedDeclaration(null, [ExportSpecifier(imported, imported)]);
    }
    
    const exportNode = ExportNamedDeclaration(bindingPath.node);
    
    replaceWith(bindingPath, exportNode);
    
    return '';
}

function parseBindingPath(path) {
    if (path.isVariableDeclarator())
        return path.parentPath;
    
    return path;
}
