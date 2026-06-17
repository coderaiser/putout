import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        '@stylistic/quote-props': 'off',
        '@stylistic/quotes': 'off',
        '@stylistic/comma-dangle': 'off',
    },
};

export default defineConfig([safeAlign, matchToFlat(match)]);
