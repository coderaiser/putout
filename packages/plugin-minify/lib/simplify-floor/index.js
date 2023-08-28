export const report = () => `Use '~~' instead of 'Math.floor()'`;

export const replace = () => ({
    'Math.floor(__a)': '~~__a',
});
