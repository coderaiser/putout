import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    safeAlign, {
        rules: {
            'no-useless-return': 'off',
            '@typescript-eslint/array-type': 'off',
            '@stylistic/no-extra-parens': 'off',
            '@typescript-eslint/prefer-namespace-keyword': 'off',
        },
    },
]);
