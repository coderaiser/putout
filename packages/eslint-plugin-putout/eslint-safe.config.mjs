import {defineConfig} from 'eslint/config';
import {safeAlign} from './lib/index.mjs';

export default defineConfig([
    safeAlign, {
        rules: {
            'no-unreachable': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
]);
