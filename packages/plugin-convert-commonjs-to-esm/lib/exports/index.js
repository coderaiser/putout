'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    isIdentifier,
    ExportNamedDeclaration,
} = types;

module.exports.report = () => `Use 'ESM' instead of 'CommonJS'`;

module.exports.exclude = () => [
    '__, __',
];

module.exports.replace = () => ({
    'module.exports = __a': 'export default __a',
    'module.exports.__a = __b': ({__a, __b}, path) => {
        if (isIdentifier(__b, {name: __a.name}))
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

