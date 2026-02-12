export const report = () => `Use 'async function' instead of 'Promise.resolve()'`;

export const replace = () => ({
    '() => Promise.resolve(__a)': 'async () => __a',
});
