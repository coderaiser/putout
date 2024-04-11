export default [
    ...safeAlign, {
        languageOptions: {
            'parser': '@typescript-eslint/parser',
        },
        'rules': {
            '@typescript-eslint/explicit-module-boundary-types': 'error',
        },
    }, {
        'files': ['*.json'],
        'parser': 'jsonc-eslint-parser',
        'rules': {},
    }, {
        'files': [
            '*.ts',
            '*.tsx',
            '*.js',
            '*.jsx',
        ],
        'rules': {
            '@nx/enforce-module-boundaries': ['error', {
                'enforceBuildableLibDependency': true,
                'allow': [],
                'depConstraints': [{
                    'sourceTag': '*',
                    'onlyDependOnLibsWithTags': ['*'],
                }],
            }],
        },
    },
];
