export const report = () => `Use 'spread' instead of 'Array.from()'`;
export const replace = () => ({
    'Array.from(__a)': '[...__a]',
});
