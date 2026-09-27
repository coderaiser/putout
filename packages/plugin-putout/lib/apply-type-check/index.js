import {types, operator} from 'putout';

const {
    isTemplateLiteral,
    isStringLiteral,
} = types;

const {extract} = operator;

export const report = () => `Use 'if' instead of ternary 🧹`;

export const match = () => ({
    '__a.type === __b': check,
    '__a.type !== __b': check,
});

export const replace = () => ({
    '__a.type === __b': ({__b}) => {
        const value = extract(__b);
        return `is${value}(__a)`;
    },
    '__a.type !== __b': ({__b}) => {
        const value = extract(__b);
        return `!is${value}(__a)`;
    },
});

function check({__b}) {
    if (!isStringLiteral(__b) && !isTemplateLiteral(__b))
        return false;
    
    const value = extract(__b);
    
    if (!value)
        return false;
    
    return types[`is${value}`];
}
