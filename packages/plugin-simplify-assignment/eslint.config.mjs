import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        'no-unneeded-ternary': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
