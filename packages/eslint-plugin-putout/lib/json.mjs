import stylisticJs from '@stylistic/eslint-plugin-js';
import putout from './plugin.js';

export default [{
    name: 'putout: json',
    files: [
        '**/*.json',
        '**/*{json}',
    ],
    rules: {
        'no-undef': 'off',
        '@stylistic/js/quotes': [
            'error',
            'double',
        ],
        '@stylistic/js/quote-props': [
            'error',
            'always',
        ],
        '@stylistic/js/comma-dangle': [
            'error',
            'never',
        ],
        '@stylistic/js/comma-spacing': 'off',
        '@stylistic/js/function-paren-newline': 'off',
        '@stylistic/js/eol-last': [
            'error',
            'always',
        ],
        '@stylistic/js/no-multi-spaces': 'off',
    },
}, {
    name: 'putout: json: package.json',
    files: ['**/package.json'],
    rules: {
        '@stylistic/js/indent': [
            'error',
            2,
        ],
    },
}, {
    name: 'putout: json: ignore',
    files: ['**/*ignore{json}'],
    rules: {
        '@stylistic/js/comma-dangle': 'off',
    },
}, {
    name: 'putout: json: yaml',
    files: ['**/*.{yml,yaml}{json}'],
    plugins: {
        '@stylistic': stylisticJs,
        putout,
    },
    rules: {
        'putout/objects-braces-inside-array': 'off',
        '@stylistic/js/indent': 'off',
        'comma-spacing': 'off',
    },
}];
