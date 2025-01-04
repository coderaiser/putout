'use strict';

module.exports.report = () => `Use 'Arrow Function' instead of 'Function Declaration`;

module.exports.match = () => ({
    'function __a(__args) {return __b}': ({__a, __b}, path) => {
        const columnsCount = __b.loc.end.column - __b.loc.start.column;
        const linesCount = __b.loc.end.line - __b.loc.start.line;
        
        if (columnsCount > 30 && !linesCount)
            return false;
        
        const {name} = __a;
        const binding = path.parentPath.scope.bindings[name];
        
        if (path.parentPath.isExportNamedDeclaration())
            return binding.references === 1;
        
        return !binding.referenced;
    },
});

module.exports.replace = () => ({
    'function __a(__args) {return __b}': 'const __a = (__args) => __b',
});
