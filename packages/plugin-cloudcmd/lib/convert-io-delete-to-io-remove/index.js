export const report = () => `Use 'IO.remove' instead of 'IO.delete'`;

export const replace = () => ({
    'IO.delete(__a)': 'IO.remove(__a)',
    'IO.delete(__a, __b)': 'IO.remove(__a, __b)',
});
