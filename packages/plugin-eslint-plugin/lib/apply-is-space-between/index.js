export const report = () => `Use 'isSpaceBetween' instead of 'isSpaceBetweenTokens'`;

export const replace = () => ({
    'isSpaceBetweenTokens(__a, __b)': 'isSpaceBetween(__a, __b)',
});
