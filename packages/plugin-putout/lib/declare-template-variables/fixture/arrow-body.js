export const match = () => ({
    'const __a = __b': ({__b}) => isIdentifier(__a),
});

