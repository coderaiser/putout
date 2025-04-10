import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        'n/no-deprecated-api': 'off',
        'no-implicit-coercion': 'off',
        'no-extra-boolean-cast': 'off',
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
