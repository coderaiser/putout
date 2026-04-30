export const report = () => `Use 'new URL()' instead of 'url.parse()'`;

export const replace = () => ({
    'url.parse(__a)': 'new URL(__a)',
});
