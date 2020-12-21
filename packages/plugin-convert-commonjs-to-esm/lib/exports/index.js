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

module.exports.report = () => 'ESM should be used insted of Commonjs';

module.exports.exclude = () => [
    '__, __',
];

module.exports.replace = () => ({
    'module.exports = __a': 'export default __a',
    'module.exports.__a = __b': ({__b}, path) => {
        if (isIdentifier(__b))
            return addExportToBinding(__b.name, path);
        
        return 'export const __a = __b';
    },
});

function addExportToBinding(name, path) {
    const {scope} = path;
    const binding = scope.bindings[name];
    const exportNode = ExportNamedDeclaration(binding.path.node);
    
    replaceWith(binding.path, exportNode);
    
    return '';
}

