import {defineConfig} from 'eslint/config';
import {safeAlign} from '#eslint-plugin-putout';

export default defineConfig([
    safeAlign, {
        rules: {
            'no-unreachable': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
]);
