import {types} from 'putout';

const {
    isLiteral,
    isObjectExpression,
} = types;

export const report = () => `Use 'transformWithOptions()' instead of 'transform()'`;

export const match = () => ({
    't.transform(__a, __b)': ({__b}) => {
        if (!isObjectExpression(__b))
            return false;
        
        if (!__b.properties.length)
            return false;
        
        const [first] = __b.properties;
        
        return isLiteral(first.value);
    },
});

export const replace = () => ({
    't.transform(__a, __b)': 't.transformWithOptions(__a, __b)',
});
