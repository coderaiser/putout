import {types} from 'putout';

const {
    isIdentifier,
    isMemberExpression,
} = types;

export const report = () => 'Expected ArrowFunction instead of Assignment';

export const match = () => ({
    'const __a = __b = __c': ({__b}, path) => {
        if (isIdentifier(__b) && path.scope.hasBinding(__b.name))
            return false;
        
        return !isMemberExpression(__b);
    },
});

export const replace = () => ({
    'const __a = __b = __c': 'const __a = __b => __c',
});
