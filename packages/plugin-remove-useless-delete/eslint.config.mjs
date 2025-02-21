import {createESLintConfig} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';

export default createESLintConfig([
    safeAlign, {
        files: ['*.md{js}'],
        languageOptions: {
            ecmaVersion: 3,
            sourceType: 'script',
            parserOptions: {
                babelOptions: {
                    sourceType: 'script',
                },
            },
        },
    },
]);
