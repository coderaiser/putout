import {safeAlign} from 'eslint-plugin-putout';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

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
export default createESLintConfig([
    eslintPlugin.configs['flat/recommended'],
    safeAlign,
    matchToFlat(match),
]);
