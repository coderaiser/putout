import stylistic from '@stylistic/eslint-plugin';
import * as putout from './plugin.mjs';

export default [{
    name: 'putout: json',
    files: [
        '**/*.json',
        '**/*{json}',
    ],
    rules: {
        'no-undef': 'off',
        '@stylistic/quotes': [
            'error',
            'double',
        ],
        '@stylistic/quote-props': [
            'error',
            'always',
        ],
        '@stylistic/comma-dangle': [
            'error',
            'never',
        ],
        '@stylistic/comma-spacing': 'off',
        '@stylistic/function-paren-newline': 'off',
        '@stylistic/eol-last': [
            'error',
            'always',
        ],
        '@stylistic/no-multi-spaces': 'off',
    },
}, {
    name: 'putout: json: package.json',
    files: ['**/package.json'],
    rules: {
        '@stylistic/indent': [
            'error',
            2,
        ],
    },
}, {
    name: 'putout: json: ignore',
    files: ['**/*ignore{json}'],
    rules: {
        '@stylistic/comma-dangle': 'off',
    },
}, {
    name: 'putout: json: yaml',
    files: ['**/*.{yml,yaml}{json}'],
    plugins: {
        '@stylistic': stylistic,
        putout,
    },
    rules: {
        'putout/objects-braces-inside-array': 'off',
        '@stylistic/indent': 'off',
        'comma-spacing': 'off',
    },
}, {
    name: 'putout: json: filesystem',
    files: ['**/.filesystem.json'],
    plugins: {
        '@stylistic': stylistic,
        putout,
    },
    rules: {
        'putout/objects-braces-inside-array': 'off',
    },
}];
