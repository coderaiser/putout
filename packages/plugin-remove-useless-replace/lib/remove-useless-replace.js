export const report = () => `Avoid useless 'replace()'`;

export const replace = () => ({
    '__a.replace(__b, __b)': '__a',
});
