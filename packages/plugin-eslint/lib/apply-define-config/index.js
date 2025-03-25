export const report = () => `Use 'defineConfig' instead of 'createESLintConfig'`;

export const replace = () => ({
    'createESLintConfig(__args)': 'defineConfig(__args)',
});
