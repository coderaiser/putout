'use strict';

const {print, types} = require('putout');
const {
    isFunction,
    isProgram,
    isLogicalExpression,
    isBlockStatement,
    isObjectExpression,
} = types;

const isTopScope = (a) => isFunction(a) || isProgram(a);

module.exports.report = () => `Use 'Arrow Function' instead of 'Function Declaration`;

module.exports.match = ({options}) => ({
    'function __a(__args) {return __b}': ({__a, __b}, path) => {
        const {maxSize = 30} = options;
        
        if (isLogicalExpression(__b))
            return false;
        
        if (isToLong(__b, maxSize))
            return false;
        
        const [first] = path.node.body.body;
        const {leadingComments} = first;
        
        if (leadingComments)
            return false;
        
        const {name} = __a;
        const binding = path.parentPath.scope.bindings[name];
        
        if (!binding.referenced)
            return true;
        
        if (path.parentPath.isExportNamedDeclaration())
            return binding.references === 1;
        
        const [ref] = binding.referencePaths;
        const {uid} = ref.find(isTopScope).scope;
        
        return uid !== binding.scope.uid;
    },
});

module.exports.replace = () => ({
    'function __a(__args) {return __b}': 'const __a = (__args) => __b',
});

function isToLong(__b, maxSize) {
    let linesCount = 0;
    let columnsCount = 0;
    
    if (isObjectExpression(__b))
        return false;
    
    if (isBlockStatement(__b.body))
        return false;
    
    if (__b.loc) {
        linesCount = __b.loc.end.line - __b.loc.start.line;
        columnsCount = __b.loc.end.column - __b.loc.start.column;
    }
    
    if (!__b.loc || linesCount) {
        const code = print(__b);
        const lines = code
            .split('\n')
            .filter(Boolean);
        
        linesCount = lines.length - 1;
    }
    
    if (linesCount)
        return true;
    
    return columnsCount > maxSize;
}
