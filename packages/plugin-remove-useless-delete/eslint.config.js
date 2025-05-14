import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export default defineConfig([
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
