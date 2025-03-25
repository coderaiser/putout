export const report = () => `Remove 'createESLintConfig()' with one argument`;

export const replace = () => ({
    'export default createESLintConfig([__a])': 'export default __a',
});
