'use strict';

module.exports.report = () => `Use 'for' instead of 'for...of' with '.entries()' when change index`;

module.exports.match = () => ({
    'for (let [__a, __b] of __c.entries())__body': ({__a}, path) => {
        const binding = path.scope.bindings[__a.name];
        return binding.constantViolations.length;
    },
});

module.exports.replace = () => ({
    'for (let [__a, __b] of __c.entries())__body': (vars, path) => {
        const {n} = path.parentPath.scope.bindings;
        
        if (n)
            return 'for (let i = 0; i < tokens.length; i++) __body';
        
        return '{const n = __c.length; for (let i = 0; i < n; i++) __body}';
    },
});
