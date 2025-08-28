export const report = () => `Use 'Object.keys()' instead of 'Object.entries()'`;

export const replace = () => ({
    'for (const [__a] of Object.entries(__b)) __body': 'for (const __a of Object.keys(__b)) __body',
    'for (const [__a] of entries(__b)) __body': 'for (const __a of keys(__b)) __body',
});
