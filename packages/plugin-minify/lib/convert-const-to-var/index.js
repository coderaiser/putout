export const report = () => `Use 'var' instead of 'const'`;
export const replace = () => ({
    'const __a = __b': 'var __a = __b',
});
