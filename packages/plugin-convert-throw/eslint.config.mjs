import {safeAlign} from 'eslint-plugin-putout';
import {createESLintConfig} from '@putout/eslint-flat';
import babel from '@babel/eslint-parser';

export default createESLintConfig([
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
