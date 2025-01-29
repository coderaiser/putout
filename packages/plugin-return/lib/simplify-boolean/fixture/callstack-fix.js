export const match = () => ({
    'const __a = __b': ({__a}) => {
        return isIdentifier(__a);
    },
});
