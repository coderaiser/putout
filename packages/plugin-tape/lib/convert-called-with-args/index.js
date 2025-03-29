import {types} from 'putout';

const {
    isIdentifier,
    isArrayExpression,
} = types;

export const report = () => `Use an array as args to 'calledWith()'`;

export const match = () => ({
    't.calledWith(__a, __b)': ({__b}) => {
        if (isIdentifier(__b))
            return false;
        
        return !isArrayExpression(__b);
    },
});

export const replace = () => ({
    't.calledWith(__a, __b)': 't.calledWith(__a, [__b])',
    't.calledWith(__a, [...__b], __c)': 't.calledWith(__a, __b, __c)',
});
