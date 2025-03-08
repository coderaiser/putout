import {matchToFlat} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        'putout/remove-duplicate-extensions': 'off',
    },
};

export default defineConfig([safeAlign, matchToFlat(match)]);
