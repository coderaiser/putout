export const report = () => `Use 'insertBefore(a, b)' instead of 'a.insertBefore(b)'`;

export const replace = () => ({
    '__a.insertBefore(__b)': 'insertBefore(__a, __b)',
});
