'use strict';

const maybeCompareString = (path) => path.node.operator.includes('==');

module.exports.report = () => `Use 'array.entries()' instead of 'Object.entries()'`;

module.exports.match = () => ({
    'for (const [__i, __a] of entries(__b))__c': ({__i}, path) => {
        const {name} = __i;
        
        if (name !== 'index' && name !== 'i')
            return false;
        
        const {referencePaths} = path.scope.bindings[name];
        
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
