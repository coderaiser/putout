'use strict';

const {operator} = require('putout');
const {contains, traverse} = operator;

module.exports.report = () => 'Replacer should be used instead of Traverser (https://git.io/JqcMn)';

module.exports.match = () => ({
    'module.exports.traverse = (__args) => __a': ({__args}, path) => {
        const program = path.scope.getProgramParent().path;
        
        const withFix = contains(program, ['module.exports.fix = __a']);
        
        if (withFix)
            return false;
        
        if (check(path))
            return false;
        
        if (!__args.length)
            return true;
        
        const withPush = contains(__args[0], ['push']);
        
        if (withPush)
            return false;
        
        return !withPush;
    },
});

module.exports.replace = () => ({
    'module.exports.traverse = (__args) => __a': 'module.exports.replace = (__args) => __a',
});

function check(path) {
    let hasPushCall = false;
    let hasTraverseMethod = false;
    
    traverse(path, {
        'ObjectMethod|ObjectProperty': (path) => {
            const keyPath = path.get('key');
            
            if (!path.parentPath.isObjectExpression())
                return;
            
            if (!keyPath.isIdentifier())
                return;
            
            hasTraverseMethod = true;
            
            path.stop();
        },
        'push(__a)': (path) => {
            hasPushCall = true;
            path.stop();
        },
    });
    
    return hasPushCall || hasTraverseMethod;
}
