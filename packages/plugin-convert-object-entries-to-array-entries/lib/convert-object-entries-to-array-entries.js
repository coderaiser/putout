'use strict';

module.exports.report = () => `Use 'array.entries()' instead of 'Object.entries()'`;

module.exports.match = () => ({
    'for (const [__i, __b] of entries(__c))__d': ({__i}, path) => {
        const {referencePaths} = path.scope.bindings[__i.name];
        
        for (const {parentPath} of referencePaths) {
            if (parentPath.isBinaryExpression() && !maybeCompareString(parentPath))
                return true;
            
            if (parentPath.isUnaryExpression())
                return true;
        }
        
        return false;
    },
});

module.exports.replace = () => ({
    'for (const [__i, __a] of entries(__b))__c': 'for (const [__i, __a] of __b.entries()) __c',
});

function maybeCompareString(path) {
    const {operator} = path.node;
    
    if (operator.includes('=='))
        return true;
    
    return false;
}

