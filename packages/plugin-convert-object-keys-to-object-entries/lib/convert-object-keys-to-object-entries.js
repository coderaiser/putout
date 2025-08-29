export const report = () => `Use 'Object.entries()' instead of 'Object.keys()'`;

export const replace = () => ({
    'for (const [__a, __b] of Object.keys(__c)) __body': 'for (const [__a, __b] of Object.entries(__c)) __body',
    'for (const [__a, __b] of keys(__c)) __body': 'for (const [__a, __b] of entries(__c)) __body',
});
