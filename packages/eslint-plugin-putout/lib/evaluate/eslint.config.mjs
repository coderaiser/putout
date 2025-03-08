import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    safeAlign, {
        rules: {
            'putout/evaluate': 'off',
            'no-unused-labels': 'off',
        },
    },
]);
