export default [js.configs.recommended, {
        languageOptions: {
            'parser': '@typescript-eslint/parser',
        },
        'rules': {
            '@typescript-eslint/explicit-module-boundary-types': 'error',
        },
        plugins: {
            ['@nx']: '@nx',
        },
    }];
