'use strict';

const {operator} = require('putout');
const {contains} = operator;

module.exports.report = () => 'Replacer should be used instead of Traverser (https://git.io/JqcMn)';

module.exports.match = () => ({
    'module.exports.traverse = (__args) => __a': ({__args}, path) => {
        const program = path.scope.getProgramParent().path;
        const withFix = contains(program, [
            'module.exports.fix = __a',
        ]);
        
        if (withFix)
            return false;
        
        if (!__args.length)
            return true;
        
        const withPush = contains(__args[0], [
            'push',
        ]);
        
        return !withPush;
    },
});

module.exports.replace = () => ({
    'module.exports.traverse = (__args) => __a': 'module.exports.replace = (__args) => __a',
});

