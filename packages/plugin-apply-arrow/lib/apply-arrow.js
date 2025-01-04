'use strict';

const {print} = require('putout');

module.exports.report = () => `Use 'Arrow Function' instead of 'Function Declaration`;

module.exports.match = () => ({
    'function __a(__args) {return __b}': ({__a, __b}, path) => {
        if (isToLong(__b))
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

function isToLong(__b) {
    let columnsCount = 0;
    let linesCount = 0;
    
    if (__b.loc) {
        columnsCount = __b.loc.end.column - __b.loc.start.column;
        linesCount = __b.loc.end.line - __b.loc.start.line;
    } else {
        const code = print(__b);
        const lines = code
            .split('\n')
            .filter(Boolean);
        
        const [first] = lines;
        
        linesCount = lines.length - 1;
        columnsCount = first.length;
    }
    
    return columnsCount > 30 && !linesCount;
}
