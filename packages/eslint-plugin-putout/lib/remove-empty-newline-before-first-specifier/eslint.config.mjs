import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.spec.js': {
        'putout/remove-empty-newline-before-first-specifier': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
