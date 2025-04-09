import {matchToFlat} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        'n/no-deprecated-api': 'off',
        'n/no-unsupported-features/node-builtins': 'off',
        'putout/no-unresolved': 'off',
    },
};

export default defineConfig([
    safeAlign, {
        rules: {
            'no-useless-return': 'off',
        },
    },
    matchToFlat(match),
]);
