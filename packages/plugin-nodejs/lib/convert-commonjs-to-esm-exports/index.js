'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;

const {
    isIdentifier,
    ExportNamedDeclaration,
} = types;

module.exports.report = () => `Use 'ESM' instead of 'CommonJS'`;

module.exports.exclude = () => ['__, __'];

module.exports.match = () => ({
    'module.exports.__a = __b': ({__a, __b}, path) => {
        const {name} = __a;
        
        if (isIdentifier(__b) && !path.scope.bindings[__b.name])
            return false;
        
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
    
    const exportNode = ExportNamedDeclaration(bindingPath.node);
    
    replaceWith(bindingPath, exportNode);
    
    return '';
}

function parseBindingPath(path) {
    if (path.isVariableDeclarator())
        return path.parentPath;
    
    return path;
}
