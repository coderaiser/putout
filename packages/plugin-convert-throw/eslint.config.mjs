import {safeAlign} from 'eslint-plugin-putout';
import babel from 'eslint-plugin-putout/babel';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    safeAlign, {
        files: ['*.md{js}'],
        rules: {
            'brace-style': 'off',
        },
        languageOptions: {
            parser: babel,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    plugins: [
                        '@babel/plugin-proposal-throw-expressions',
                    ],
                },
            },
        },
    },
]);
