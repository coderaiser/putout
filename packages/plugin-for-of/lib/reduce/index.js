'use strict';

const {types} = require('putout');
const {
    isBlockStatement,
    isArrayExpression,
    isCallExpression,
} = types;

module.exports.report = () => `Use 'for...of' instead of '.reduce()'`;

module.exports.match = () => ({
    'const __a = __b.reduce((__c, __d) => __e)': ({__b, __e}) => {
        if (isArrayExpression(__b))
            return false;
        
        if (isCallExpression(__b))
            return false;
        
        return !isBlockStatement(__e);
    },
    'const __a = __b.reduceRight((__c, __d) => __e)': ({__b, __e}) => {
        if (isArrayExpression(__b))
            return false;
        
        return !isBlockStatement(__e);
    },
    'const __a = __b.reduce((__c, __d) => __e, __f)': ({__e}) => !isBlockStatement(__e),
});

module.exports.replace = () => ({
    'const __a = __b.reduce((__c, __d) => __e)': ({__a, __d}, path) => {
        path.__putout_for_of_reduce = true;
        rename(path, __d, __a);
        
        return `{
            let [__a] = __b;
            for (const __c of __b.slice(1)) {
                __a = __e;
            }
        }`;
    },
    'const __a = __b.reduceRight((__c, __d) => __e)': ({__a, __d}, path) => {
        path.__putout_for_of_reduce = true;
        rename(path, __d, __a);
        
        return `{
            let [__a] = __b;
            for (const __c of __b.slice(1)) {
                __a = __e;
            }
        }`;
    },
    'const __a = __b.reduce((__c, __d) => __e, __f)': (vars, path) => {
        path.__putout_for_of_reduce = true;
        return `{
            let __a = __f;
            for (const __d of __b) {
                __a = __e;
            }
        }`;
    },
});

function rename(path, from, to) {
    const fnScope = path.get('declarations.0.init.arguments.0').scope;
    
    fnScope.rename(from.name, to.name);
    
    delete path.scope.bindings[from.name];
}
