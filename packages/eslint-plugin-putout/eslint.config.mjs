import {safeAlign} from 'eslint-plugin-putout';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    'eslint-fixture/**/*.js': {
        'no-unreachable': 'off',
    },
    'eslint-fixture/**/*.*': {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
    },
    'eslint-fixture/**/*.md{js}': {
        'putout/add-newline-before-return': 'off',
    },
};
export default defineConfig([
    eslintPlugin.configs.recommended,
    safeAlign,
    matchToFlat(match),
]);
