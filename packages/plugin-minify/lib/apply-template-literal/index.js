export const report = () => `Use 'template literal' to stringify value`;
export const replace = () => ({
    'String(__a)': '`${__a}`',
    '__a.toString()': '`${__a}`',
});
