export const report = () => `Use operator '**' instead of 'Math.pow()'`;

export const replace = () => ({
    'Math.pow(__a, __b)': '__a ** __b',
    '__a * __a': '__a ** 2',
});
