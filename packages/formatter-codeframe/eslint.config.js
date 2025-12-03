import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    safeAlign, {
        rules: {
            'n/no-unsupported-features/node-builtins': 'off',
        },
    },
]);
