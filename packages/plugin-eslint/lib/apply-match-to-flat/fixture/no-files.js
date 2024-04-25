export default createESLintConfig([
    safeAlign,
    scriptsConfig,
    monoConfig, {
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
        },
        ignores: ['**/fixture'],
    },
]);
