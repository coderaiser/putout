export const report = () => `Use 'includes()' instead of 'indexOf()'`;

export const replace = () => ({
    '~__a.indexOf(__b)': '__a.includes(__b)',
    '__a.indexOf(__b) === -1': '!__a.includes(__b)',
    '__a.indexOf(__b) !== -1': '__a.includes(__b)',
});
