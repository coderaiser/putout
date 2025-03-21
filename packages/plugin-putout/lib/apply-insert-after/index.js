export const report = () => `Use 'insertAfter(a, b)' instead of 'a.insertAfter(b)'`;

export const replace = () => ({
    '__a.insertAfter(__b)': 'insertAfter(__a, __b)',
});
