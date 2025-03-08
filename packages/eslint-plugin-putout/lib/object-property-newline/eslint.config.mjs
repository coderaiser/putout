import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{ts}': {
        'putout/object-property-newline': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
