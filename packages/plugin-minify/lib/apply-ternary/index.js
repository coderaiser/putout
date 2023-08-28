import {types} from 'putout';

const {isExpression} = types;

export const report = () => `Use 'ternary' instead of 'if condition'`;

export const match = () => ({
    'if (__a) __b; else __c;': ({__b, __c}) => {
        if (!isExpression(__b))
            return false;
        
        return isExpression(__c);
    },
});

export const replace = () => ({
    'if (__a) __b; else __c;': '__a ? __b : __c',
});
