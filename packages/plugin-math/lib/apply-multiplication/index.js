export const report = () => `Use '*' instead of 'Math.imul()'`;

export const replace = () => ({
    'Math.imul(__a, __b)': '__a * __b',
});
