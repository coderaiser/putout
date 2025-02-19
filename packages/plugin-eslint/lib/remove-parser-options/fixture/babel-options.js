module.exports = createESLintConfig([
    safeAlign, {
        files: ['*.md{js}'],
        languageOptions: {
            parserOptions: {
                babelOptions: {
                    sourceType: 'script',
                },
            },
        },
    },
]);
