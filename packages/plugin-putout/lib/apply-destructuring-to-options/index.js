export const report = () => `Use '{options}' instead of 'options'`;

export const replace = () => ({
    'export const filter = (__a, options) => __b': 'export const filter = (__a, {options}) => __b',
});
