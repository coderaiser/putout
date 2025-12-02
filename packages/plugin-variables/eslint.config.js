import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';
import {matchToFlat} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'prefer-const': 'off',
    },
};

export default defineConfig([safeAlign, matchToFlat(match)]);
