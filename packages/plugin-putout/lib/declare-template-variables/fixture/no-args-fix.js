export const match = () => ({
    'const __a = __b': ({__a}) => isIdentifier(__a),
});
