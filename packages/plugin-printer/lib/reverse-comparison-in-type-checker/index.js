import {operator} from 'putout';

const CMP = {
    '<': '>=',
    '>': '<=',
    '<=': '>',
    '>=': '<',
};

const OPERATORS = Object.keys(CMP);

const {setLiteralValue} = operator;

export const report = () => `Reverse comparison`;

export const match = () => ({
    '["__a", "__b", __c]': ({__a, __b}) => {
        if (!OPERATORS.includes(__b.value))
            return false;
        
        return __a.value.endsWith('!');
    },
});

export const replace = () => ({
    '["__a", "__b", __c]': ({__a, __b}, path) => {
        setLiteralValue(__a, __a.value.slice(0, -5));
        setLiteralValue(__b, CMP[__b.value]);
        
        return path;
    },
});
