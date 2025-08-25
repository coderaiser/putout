import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    'README.md{js}': {
        'no-var': 'off',
        'prefer-const': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
