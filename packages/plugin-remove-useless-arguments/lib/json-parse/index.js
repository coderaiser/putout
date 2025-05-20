export const report = () => `Avoid useless arguments in 'JSON.parse()'`;

export const replace = () => ({
    'JSON.parse(__a, null, __b)': 'JSON.parse(__a)',
});
